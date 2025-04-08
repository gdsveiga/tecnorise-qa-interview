import React, { useState } from "react";
import ProductList, { Product } from "./components/list";
import ProductForm from "./components/form";
import { useProducts } from "./context/products-context";

const App: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: Omit<Product, "id">) => {
    if (editingProduct) {
      updateProduct(editingProduct.id!, data);
    } else {
      addProduct(data);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    if (editingProduct?.id === id) {
      setEditingProduct(null);
    }
  };

  return (
    <div className="max-w-3xl p-5 mx-auto my-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-center text-2xl">Lista de Produtos</h1>
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer"
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        >
          Adicionar Produto
        </button>
      </div>

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-center mb-4">
              {editingProduct ? "Editar Produto" : "Cadastrar Produto"}
            </h2>
            <ProductForm
              defaultValues={editingProduct || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
