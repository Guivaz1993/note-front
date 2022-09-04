/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, patch, post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";
import { newVideoSchema, updateVideoSchema } from "../../../validations/videos";

import "../styles.css";
import "./style.css";

export default function ModalVideo({
  openModal, setOpenModal, topicId, userTopicsId, currentVideo,
}) {
  const token = getItem("token");
  const [form, setForm] = useState({
    video: "",
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
      const { data, status } = await get(`/video/detail/${currentVideo}`, token);
      if (status !== 200) {
        return toast.error(data);
      }
      return setForm({
        video: data.video,
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
      if (currentVideo !== "new") {
        await updateVideoSchema.validate(form);

        const response = await patch(
          `/videos/${currentVideo}`,
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
        await newVideoSchema.validate(form);

        const { data, status } = await post(
          "/videos",
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
    if (currentVideo !== "new") {
      loadInfos(loadInfos);
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
            {currentVideo === "new"
              ? "Cadastre o seu novo vídeo"
              : "Atualize o seu novo vídeo"}
          </h2>
          <div className="ModalFormContainer">
            <label htmlFor="video" className="InputsLabel">
              <p className="ModalLabelText">
                Nome do vídeo
              </p>
              <input
                type="text"
                id="video"
                value={form.video}
                onChange={handleFormValue}
                name="video"
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
                Já concluiu?
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
              {currentVideo === "new" ? "Adicionar" : "Atualizar"}
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
