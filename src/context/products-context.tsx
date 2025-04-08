import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../components/list";

type ProductInput = Omit<Product, "id">;

type ProductsContextType = {
  products: Product[];
  addProduct: (data: ProductInput) => void;
  updateProduct: (id: string, data: ProductInput) => void;
  deleteProduct: (id: string) => void;
};

const ProductsContext = createContext({} as ProductsContextType);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (data: ProductInput) => {
    const newProduct = { ...data, id: uuidv4() };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, data: ProductInput) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
