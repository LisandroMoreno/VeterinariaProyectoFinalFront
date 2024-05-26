import * as yup from "yup";

const formSchema = yup.object({
  user: yup
    .string()
    .required("Completa el campo vacio")
    .email("Formato email. Por ej: usuario@gmail.com"),
  userName: yup
    .string()
    .required("Completa el campo")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
  pass: yup
    .string()
    .required("Completa el campo vacio")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
  rpass: yup
    .string()
    .required("Completa el campo vacio")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
});

export default formSchema;