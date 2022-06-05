import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"
  />
);

const validationSchema = yup.object({
  name: yup.string().required("Digite seu nome"),
  username: yup.string().required("Digite seu nome de usuário"),
  email: yup.string().required("Digite seu e-mail").email("E-mail inválido"),
  password: yup.string().required("Digite sua senha"),
});

export function Signup({ signInUser }) {
  const formik = useFormik({
    onSubmit: async (values) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/signup`,
        {
          name: values.name,
          email: values.email,
          username: values.username,
          password: values.password,
        }
      );

      signInUser(response.data);
    },
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="h-full flex flex-col justify-center p-12 space-y-6">
      <h1 className="text-3xl">Crie sua conta</h1>

      <form action="" className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="space-y-2">
          <Input
            name="name"
            type="text"
            placeholder="Nome"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            name="username"
            type="username"
            placeholder="Nome de Usuário"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            name="email"
            type="text"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      <span className="text-sm text-silver text-center">
        Já tem conta?{" "}
        <a href="/login" className="text-birdBlue">
          Acesse.
        </a>
      </span>
    </div>
  );
}
