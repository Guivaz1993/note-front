/* eslint-disable max-len */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import StudiesTable from "../../components/Tables/Studies";
import { getItem } from "../../utils/Storage";
import "./style.css";

function Studies() {
  const token = getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.info("Por favor faça login novamente.");
      navigate("/");
    }
  }, []);
  return (
    <>
      <Header detail={false} />
      <div className="StudiesPage">
        <h1 className="StudiesTitle">
          Meus estudos
        </h1>
        <p className="StudiesText">
          Acompanhe, adicione, conclua seus estudos.
          Utilize nossa plataforma e veja seus temas de estudos agrupando as aulas, vídeos, textos, livros e tudo mais que você tenha utilizado neles e ache relevante ter um acesso rápido.
        </p>
        <StudiesTable />
      </div>
    </>
  );
}

export default Studies;
