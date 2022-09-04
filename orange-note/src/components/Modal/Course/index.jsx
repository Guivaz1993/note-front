/* eslint-disable no-unused-vars */
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, patch, post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";
import { newCourseSchema, updateCourseSchema } from "../../../validations/courses";

import "../styles.css";
import "./style.css";

export default function ModalCourse({
  openModal, setOpenModal, topicId, userTopicsId, currentCourse,
}) {
  const token = getItem("token");
  const [form, setForm] = useState({
    course: "",
    description: "",
    link: "",
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
      const { data, status } = await get(`/course/${currentCourse}`, token);
      if (status !== 200) {
        return toast.error(data);
      }
      return setForm({
        course: data.course,
        description: data.description,
        link: data.link,
        done: data.done === true ? "true" : "false",
      });
    } catch (error) {
      return toast.error(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (currentCourse !== "new") {
        await updateCourseSchema.validate(form);

        const response = await patch(
          `/course/${currentCourse}`,
          {
            ...form,
            usertopics_id: userTopicsId,
          },
          token,
        );
        if (response.status !== 200) {
          return toast.error(response.data.message);
        }

        toast.success("Atualização feita com sucesso.");
      } else {
        await newCourseSchema.validate(form);

        const { data, status } = await post(
          "/course",
          {
            ...form,
            topic_id: topicId,
            usertopics_id: userTopicsId,
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
    if (currentCourse !== "new") {
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
            {currentCourse === "new" ? "Adicione o seu novo curso" : "Atualize o seu curso"}
          </h2>
          <div className="ModalFormContainer">
            <label htmlFor="course" className="InputsLabel">
              <p className="ModalLabelText">
                Nome do curso
              </p>
              <input
                type="text"
                id="course"
                value={form.course}
                onChange={handleFormValue}
                name="course"
                className="ModalInput"
              />
            </label>
          </div>
          <div className="ModalFormContainer">
            <label htmlFor="description" className="InputsLabel">
              <p className="ModalLabelText">
                Descrição
              </p>
              <textarea
                type="text"
                id="description"
                value={form.description}
                onChange={handleFormValue}
                name="description"
                className="ModalInput"
              />
            </label>
          </div>
          <div className="ModalFormContainer">
            <label htmlFor="link" className="InputsLabel">
              <p className="ModalLabelText">
                Link
              </p>
              <input
                type="text"
                id="link"
                value={form.link}
                onChange={handleFormValue}
                name="link"
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
              {currentCourse === "new" ? "Adicionar" : "Atualizar"}
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
