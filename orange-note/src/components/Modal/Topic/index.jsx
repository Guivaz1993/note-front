/* eslint-disable no-unused-vars */
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";

import "./style.css";

export default function ModalTopic({ openModal, setOpenModal }) {
  const token = getItem("token");
  const [form, setForm] = useState({
    topic: "",
  });
  const handleClose = () => {
    setOpenModal(false);
  };

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(form);

      const { data, status } = await post("/topics", form, token);

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
  }, []);

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        scroll="paper"
      >
        <form onSubmit={handleSubmit} className="ModalStudyForm">
          <h2 className="ModalStudyTitle">
            Crie o seu novo tópico
          </h2>
          <div className="ModalStudyContainer">
            <label htmlFor="study" className="InputsLabel">
              Tópico
              <input
                type="text"
                id="study"
                value={form.topic}
                onChange={handleFormValue}
                name="topic"
                className="Inputs"
              />
            </label>
          </div>
          <div className="BtnSectionStudy">
            <button type="submit" className="StudyBtn StudyCreateBtn">
              Criar tópico
            </button>
            <button
              type="button"
              className="StudyBtn StudyCancelBtn"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
