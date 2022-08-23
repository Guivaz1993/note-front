import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const active = {
    textDecoration: "underline",
    color: "var(--colour-orange)",
  };

  return (
    <header>
      <h1>Logo</h1>
      <div className="LinksContainer">
        <NavLink
          to="/home"
          style={({ isActive }) => (isActive ? active : undefined)}
          className="LinkHeader"
        >
          Home
        </NavLink>
        <NavLink
          to="/studies"
          style={({ isActive }) => (isActive ? active : undefined)}
          className="LinkHeader"
        >
          Meus estudos
        </NavLink>
      </div>
      <div className="HeaderUser">
        <span className="HeaderName">Nome do Usuário </span>
        <button type="button" onClick={() => navigate("/")} className="LogoffBtn">Sair</button>
      </div>
    </header>
  );
}
