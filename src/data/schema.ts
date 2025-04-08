import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string(),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .positive("Preço deve ser maior que zero")
    .required("Preço é obrigatório"),
  category: yup.string().required("Categoria é obrigatória"),
  available: yup.boolean(),
});
