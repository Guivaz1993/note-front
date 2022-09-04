const yup = require("../validations copy/config");

const newStudySchema = yup.object().shape({
  study: yup.string().required(),
});

const newTopicSchema = yup.object().shape({
  topic: yup.string().required(),
});

const newStudyTopicSchema = yup.object().shape({
  study_id: yup.number().required(),
  topic_id: yup.number().required(),
});

module.exports = {
  newTopicSchema,
  newStudySchema,
  newStudyTopicSchema,
};
