/* eslint-disable no-unused-vars */
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";
import { newStudySchema } from "../../../validations/infos";

import "../styles.css";
import "./style.css";

export default function ModalStudy({ openModal, setOpenModal }) {
  const token = getItem("token");
  const [form, setForm] = useState({
    study: "",

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
      await newStudySchema.validate(form);

      const { data, status } = await post("/studies", form, token);

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
        <form onSubmit={handleSubmit} className=" ModalForm">
          <h2 className="ModalTitle">
            Crie o seu novo plano de estudos
          </h2>
          <div className="ModalFormContainer">
            <label htmlFor="study" className="ModalLabel">
              <p className="ModalLabelText">
                Plano de Estudos
              </p>
              <input
                type="text"
                id="study"
                value={form.study}
                onChange={handleFormValue}
                name="study"
                className="ModalInput"
              />
            </label>
          </div>
          <div className="ModalBtnContainer">
            <button type="submit" className="ModalBtn ModalBtnConfirm">
              Criar plano de estudos
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
