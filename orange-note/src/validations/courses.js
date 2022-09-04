const yup = require("../validations copy/config");

const newCourseSchema = yup.object().shape({
  course: yup.string().trim().required(),
  description: yup.string().trim().required(),
  link: yup.string().url("Esse link está correto? tente novamente por favor. Não esqueça do 'http://'").required(),
});

const updateCourseSchema = yup.object().shape({
  course: yup.string().trim(),
  description: yup.string().trim(),
  link: yup.string().url("Esse link está correto? tente novamente por favor. Não esqueça do 'http://'"),
  done: yup.boolean(),
});

module.exports = {
  newCourseSchema,
  updateCourseSchema,
};
