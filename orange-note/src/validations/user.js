const yup = require("./config");

export const signIn = yup.object().shape({
  username: yup.string().required("Usuário é um campo obrigatório"),
  password: yup.string().required("Senha é um campo obrigatório").min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const signUp = yup.object().shape({
  name: yup.string().required("Nome é um campo obrigatório"),
  username: yup.string().required("Usuário é um campo obrigatório").max(50),
  password: yup.string().required("Senha é um campo obrigatório").min(6, "A senha deve ter no mínimo 6 caracteres."),
  email: yup.string().email("E-mail inválido").required("E-mail é um campo obrigatório"),
});
