const yup = require("./config");

const newArticleSchema = yup.object().shape({
  article: yup.string().trim().required(),
  description: yup.string().trim().required(),
  link: yup.string().url("Esse link está correto? tente novamente por favor. Não esqueça do 'http://'").required(),
});

const updateArticleSchema = yup.object().shape({
  article: yup.string().trim(),
  description: yup.string().trim(),
  link: yup.string().url("Esse link está correto? tente novamente por favor. Não esqueça do 'http://'"),
  done: yup.boolean(),
});

module.exports = {
  newArticleSchema,
  updateArticleSchema,
};
