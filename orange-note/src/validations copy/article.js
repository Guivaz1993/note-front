const yup = require("./config");

const newArticleSchema = yup.object().shape({
  article: yup.string().trim().required(),
  description: yup.string().trim().required(),
  link: yup.string().url("Esse link está correto? tente novamente por favor").required(),
  topic_id: yup.number().required(),
  usertopics_id: yup.number().required(),
});

const updateArticleSchema = yup.object().shape({
  article: yup.string().trim(),
  description: yup.string().trim(),
  link: yup.string().url("Esse link está correto? tente novamente por favor"),
  done: yup.boolean(),
  usertopics_id: yup.number().required(),
});

module.exports = {
  newArticleSchema,
  updateArticleSchema,
};
