/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import ModalStudy from "../../components/Modal/Study";
import ModalStudyTopic from "../../components/Modal/StudyTopic";
import ModalTopic from "../../components/Modal/Topic";
import StudiesTable from "../../components/Tables/Studies";
import { getItem } from "../../utils/Storage";
import "./style.css";

function Studies() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalNewTopic, setOpenModalNewTopic] = useState(false);
  const [openModalTopic, setOpenModalTopic] = useState(false);
  const token = getItem("token");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    console.log("novo plano de estudos");
    setOpenModal(true);
  };

  const handleClickOpenTopic = () => {
    setOpenModalTopic(true);
  };

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
        <div className="StudiesBtnCreate">
          <button
            type="button"
            onClick={handleClickOpen}
            className="OpenModalBtn"
          >
            Criar um novo plano de estudo
          </button>
          <button
            type="button"
            onClick={handleClickOpenTopic}
            className="OpenModalBtn"
          >
            Adicionar novo tópico ao plano de estudo
          </button>
        </div>
        <StudiesTable openModal={openModalTopic} />
        {openModal
          && (
            <ModalStudy
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          )}
        {openModalTopic
          && (
            <ModalStudyTopic
              openModal={openModalTopic}
              setOpenModal={setOpenModalTopic}
              setOpenModalTopic={setOpenModalNewTopic}
            />
          )}
        {
          openModalNewTopic
          && (
            <ModalTopic
              openModal={openModalNewTopic}
              setOpenModal={setOpenModalNewTopic}
            />
          )
        }
      </div>
    </>
  );
}

export default Studies;
