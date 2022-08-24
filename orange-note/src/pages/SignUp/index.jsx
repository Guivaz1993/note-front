import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../../validations/user";
import "./style.css";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleFormValue(e) {
    if (e.target.name !== "name" && e.nativeEvent.data === " ") {
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const error = await signUp.validate(form).catch((err) => err.errors);

    if (error !== form) {
      return toast.error(error[0]);
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Senhas não coincidem");
    }

    toast.success("Cadastro realizado com sucesso.");

    return setTimeout(() => navigate("/"), 1000);
  }
  return (
    <div className="SignUp">
      <section className="SignUpText" />
      <section className="SignUpForm">
        <form onSubmit={handleSubmit}>
          <span className="SignUpFormText">
            Realize seu cadastro aqui. Já tem conta?
            {" "}
            <button type="button" className="HasUserBtn" onClick={() => navigate("/signin")}>Clique aqui!</button>
          </span>
          <div className="UsernameInput">
            <label htmlFor="name" className="InputsLabel">
              Nome
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleFormValue}
                name="name"
                className="Inputs"
              />
            </label>
          </div>
          <div className="UsernameInput">
            <label htmlFor="username" className="InputsLabel">
              Usuário
              <input
                type="text"
                id="username"
                value={form.username}
                onChange={handleFormValue}
                name="username"
                className="Inputs"
              />
            </label>
          </div>
          <div className="UsernameInput">
            <label htmlFor="email" className="InputsLabel">
              E-mail
              <input
                type="text"
                id="email"
                value={form.email}
                onChange={handleFormValue}
                name="email"
                className="Inputs"
              />
            </label>
          </div>
          <div className="PasswordInput">
            <label htmlFor="password" className="InputsLabel">
              Senha
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleFormValue}
                name="password"
                className="Inputs"
              />
            </label>
          </div>
          <div className="PasswordInput">
            <label htmlFor="confirmPassword" className="InputsLabel">
              Confirmação de Senha
              <input
                type="password"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleFormValue}
                name="confirmPassword"
                className="Inputs"
              />
            </label>
          </div>
          <button type="submit" className="SignUpBtn">Criar Usuário</button>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
