/* eslint-disable no-unused-vars */
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, patch, post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";
import { newLessonSchema, updateLessonSchema } from "../../../validations/lessons";

import "../styles.css";
import "./style.css";

export default function ModalLesson({
  openModal, setOpenModal, course, currentLesson,
}) {
  const token = getItem("token");
  const [form, setForm] = useState({
    lesson: "",
    done: false,
  });
  const handleClose = () => {
    setOpenModal(false);
  };

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function loadInfos() {
    try {
      const { data, status } = await get(`/lesson/${currentLesson}`, token);
      if (status !== 200) {
        return toast.error(data);
      }
      return setForm({
        lesson: data.lesson,
        done: data.done === true ? "true" : "false",
      });
    } catch (error) {
      return toast.error(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (currentLesson !== "new") {
        await updateLessonSchema.validate(form);

        const response = await patch(
          `/lessons/${currentLesson}`,
          {
            ...form,
            course_id: course,
          },
          token,
        );
        if (response.status !== 200) {
          return toast.error(response.data.message);
        }

        toast.success("Atualização feita com sucesso.");
      } else {
        await newLessonSchema.validate(form);

        const { data, status } = await post(
          "/lessons",
          {
            ...form,
            course_id: course,
          },
          token,
        );

        if (status !== 201) {
          return toast.error(data.message);
        }

        toast.success("Cadastro realizado com sucesso.");
      }
      return setTimeout(() => setOpenModal(false), 1000);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    if (currentLesson !== "new") {
      loadInfos();
    }
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
            {currentLesson === "new" ? "Adicione a sua nova aula" : "Atualize a sua aula"}
          </h2>
          <div className="ModalFormContainer">
            <label htmlFor="lesson" className="InputsLabel">
              <p className="ModalLabelText">
                Nome da aula
              </p>
              <input
                type="text"
                id="lesson"
                value={form.lesson}
                onChange={handleFormValue}
                name="lesson"
                className="ModalInput"
              />
            </label>
          </div>
          <div className="ModalFormContainer">
            <section htmlFor="done" className="InputsLabel">
              <p className="ModalLabelText">
                Já conclui?
              </p>
              <div className="ModalContainerRadioBtn">
                <label
                  htmlFor="Finalizado"
                  className="ModalRadioBtnOptions"
                  id="done"
                >
                  <input
                    type="radio"
                    id="done"
                    value
                    onChange={handleFormValue}
                    name="done"
                    checked={form.done === "true" && "defaultChecked"}
                    className="ModalRadioBtnOptions"
                  />
                  Finalizado
                </label>
                <label
                  htmlFor="Finalizado"
                  className="ModalRadioBtnOptions"
                  id="done"
                >
                  <input
                    type="radio"
                    id="done"
                    value={false}
                    onChange={handleFormValue}
                    name="done"
                    checked={form.done !== "true" && "defaultChecked"}
                    className="ModalRadioBtnOptions"
                  />
                  Não finalizado
                </label>
              </div>
            </section>
          </div>
          <div className="ModalBtnContainer">
            <button type="submit" className="ModalBtn ModalBtnConfirm">
              {currentLesson === "new" ? "Adicionar" : "Atualizar"}
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
