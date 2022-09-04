const yup = require("../validations copy/config");

const newVideoSchema = yup.object().shape({
  video: yup.string().trim().required(),
  description: yup.string().trim().required(),
  link: yup.string().url("Esse link está correto? tente novamente por favor. Não esqueça do 'http://'").required(),
});

const updateVideoSchema = yup.object().shape({
  video: yup.string().trim(),
  description: yup.string().trim(),
  link: yup.string().url("Esse link está correto? tente novamente por favor. Não esqueça do 'http://'"),
  done: yup.boolean(),
});

module.exports = {
  newVideoSchema,
  updateVideoSchema,
};
