const yup = require("./config");

const signUpSchema = yup.object().shape({
  name: yup.string().trim().required().max(50),
  username: yup.string().trim().required().max(50),
  email: yup.string().trim().email().required()
    .max(50),
  password: yup.string().trim().required(),
});

const loginSchema = yup.object().shape({
  username: yup.string().trim().required().max(50),
  password: yup.string().trim().required(),
});

module.exports = {
  signUpSchema,
  loginSchema,
};
