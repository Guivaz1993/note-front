/* eslint-disable no-unused-vars */
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";

import "../styles.css";
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
        <form onSubmit={handleSubmit} className="ModalForm">
          <h2 className="ModalTitle">
            Crie o seu novo tópico
          </h2>
          <div className="ModalFormContainer">
            <label htmlFor="study" className="ModalLabel">
              <p className="ModalLabelText">
                Plano de Estudos               Tópico
              </p>
              <input
                type="text"
                id="study"
                value={form.topic}
                onChange={handleFormValue}
                name="topic"
                className="ModalInput"
              />
            </label>
          </div>
          <div className="ModalBtnContainer">
            <button type="submit" className="ModalBtn ModalBtnConfirm">
              Criar tópico
            </button>
            <button
              type="button"
              className="ModalBtn ModalBtnCancel"
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
