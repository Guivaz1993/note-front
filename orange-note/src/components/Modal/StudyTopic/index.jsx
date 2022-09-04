import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";
import { newStudyTopicSchema } from "../../../validations/infos";

import "../styles.css";
import "./style.css";

export default function ModalStudyTopic({ openModal, setOpenModal, setOpenModalTopic }) {
  const token = getItem("token");
  const [studies, setStudies] = useState([]);
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({
    study_id: "",
    topic_id: "",

  });
  const handleClose = () => {
    setOpenModal(false);
  };

  async function loadStudies() {
    try {
      const { data, status } = await get("/studies", token);

      if (status !== 200) {
        return toast.error(data);
      }

      return setStudies(data);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  async function loadTopics() {
    try {
      const { data, status } = await get("/topics", token);

      if (status !== 200) {
        return toast.error(data);
      }

      return setTopics(data);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleNewTopic() {
    handleClose();
    setOpenModalTopic(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await newStudyTopicSchema.validate(form);

      const { data, status } = await post("/usertopics", form, token);

      if (status !== 201) {
        return toast.error(data.message);
      }

      toast.success("Cadastro realizado com sucesso.");

      return setTimeout(() => setOpenModal(false), 1000);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    loadStudies();
    loadTopics();
  }, []);

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        scroll="paper"
      >
        <form onSubmit={handleSubmit} className="ModalForm">
          <h2 className="ModalTitle">
            Adicione um novo tópico para o seu plano de estudos
          </h2>
          <div className="ModalFormContainer">
            <label htmlFor="study" className="ModalLabel">
              <p className="ModalLabelText">
                Plano de Estudos
              </p>
              <select
                type="text"
                id="study"
                value={form.study}
                onChange={handleFormValue}
                name="study_id"
                className="ModalInput"
              >
                <option value={null}>Selecione o seu plano de estudos</option>
                {
                  studies.map((study) => (
                    <option key={study.id} value={study.id}>{study.study}</option>
                  ))
                }
              </select>
            </label>
          </div>
          <div className="ModalFormContainer">
            <label htmlFor="topic" className="ModalLabel">
              <p className="ModalLabelText">
                Tópicos
              </p>
              <select
                type=""
                id="topic"
                value={form.topic}
                onChange={handleFormValue}
                name="topic_id"
                className="ModalInput"
              >
                <option value={null}>Selecione o seu tópico</option>
                {
                  topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>{topic.topic}</option>
                  ))
                }
              </select>
            </label>
            <button
              type="button"
              className="ModalBtn ModalBtnConfirm BtnNewTopic"
              onClick={handleNewTopic}
            >
              Precisa criar um novo tópico?
            </button>
          </div>
          <div className="ModalBtnContainer">
            <button type="submit" className="ModalBtn ModalBtnConfirm">
              Adicionar Tópico
            </button>
            <button type="button" className="ModalBtn ModalBtnCancel" onClick={() => setOpenModal(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
