import React from "react";

export type Product = {
  id?: string;
  name: string;
  description?: string;
  price: number;
};

type ProductListProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  products = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-10">
      <h3 className="text-center text-xl">Produtos Cadastrados</h3>
      {products.length === 0 ? (
        <p className="text-center mt-5">Nenhum produto cadastrado.</p>
      ) : (
        <ul className="mt-5 p-0 list-none">
          {products.map((product) => (
            <li
              className="flex justify-between items-start bg-white mb-3 p-4 rounded-lg shadow-sm border border-gray-200"
              key={product.id}
            >
              <div>
                <strong>{product.name}</strong> — R$ {product.price.toFixed(2)}{" "}
                <br />
                {product.description && (
                  <p style={{ marginTop: 4 }}>{product.description}</p>
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="bg-green-600 text-white rounded px-4 py-2 cursor-pointer"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white rounded px-4 py-2 cursor-pointer"
                  onClick={() => onDelete(product.id!)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
