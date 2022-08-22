import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleFormValue(e) {
    if (e.nativeEvent.data === " ") {
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    toast.success("Seja bem-vindo ao Orange Notes.");
    setTimeout(() => navigate("/home"), 1000);
  }

  return (
    <div className="SignIn">
      <section className="SignInText" />
      <section className="SignInForm">
        <form onSubmit={handleSubmit}>
          <span className="SignInFormText">
            Olá, faça o seu login aqui.
            Ainda não tem conta?
            {" "}
            <button type="button" className="NewUserBtn" onClick={() => navigate("/signup")}>Clique aqui!</button>
          </span>
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
          <button type="submit" className="LoginBtn">Login</button>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
