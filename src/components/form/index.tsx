import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from "../list";

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .positive("Preço deve ser positivo")
    .required("Preço é obrigatório"),
  description: yup.string().optional(),
});

type ProductFormProps = {
  defaultValues?: Product;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
      ? { ...defaultValues }
      : {
          name: "",
          price: 0,
          description: "",
        },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Nome</label>
        <input
          {...register("name")}
          className="w-full border rounded p-2"
          placeholder="Digite o nome do produto"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Preço</label>
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="w-full border rounded p-2"
          placeholder="0.00"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label>Descrição</label>
        <textarea
          {...register("description")}
          className="w-full border rounded p-2 resize-none"
          placeholder="Descreva o produto"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black rounded px-4 py-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
