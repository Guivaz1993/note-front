import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { get } from "../../services/functions";
import { clearAll, getItem } from "../../utils/Storage";

export default function Header() {
  const navigate = useNavigate();
  const token = getItem("token");
  const [user, setUser] = useState([]);

  function logOff() {
    clearAll();

    navigate("/");
  }

  async function loadUser() {
    try {
      const { data, status } = await get("/userdata", token);
      if (status !== 200) {
        return toast.error(data);
      }
      return setUser(data);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    if (!token) {
      logOff();
    }
    loadUser();
  }, []);

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
        <span className="HeaderName">{user.name}</span>
        <button type="button" onClick={() => logOff()} className="LogoffBtn">Sair</button>
      </div>
    </header>
  );
}
