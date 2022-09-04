const yup = require("../validations copy/config");

const newLessonSchema = yup.object().shape({
  lesson: yup.string().trim().required(),
  done: yup.boolean(),
});

const updateLessonSchema = yup.object().shape({
  lesson: yup.string().trim(),
  done: yup.boolean(),
});

module.exports = {
  newLessonSchema,
  updateLessonSchema,
};
