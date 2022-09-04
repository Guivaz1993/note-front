/* eslint-disable no-unused-vars */
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, patch, post } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";
import { newArticleSchema, updateArticleSchema } from "../../../validations/article";

import "../styles.css";
import "./style.css";

export default function ModalArticle({
  openModal, setOpenModal, topicId, userTopicsId, currentArticle,
}) {
  const token = getItem("token");
  const [form, setForm] = useState({
    article: "",
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
      const { data, status } = await get(`/article/detail/${currentArticle}`, token);
      if (status !== 200) {
        return toast.error(data);
      }
      return setForm({
        article: data.article,
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
      if (currentArticle !== "new") {
        await updateArticleSchema.validate(form);

        const response = await patch(
          `/article/${currentArticle}`,
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
        await newArticleSchema.validate(form);

        const { data, status } = await post(
          "/article",
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
    if (currentArticle !== "new") {
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
            {currentArticle === "new" ? "Adicione o seu novo texto" : "Atualize o seu texto"}
          </h2>
          <div className="ModalFormContainer">
            <label htmlFor="article" className="InputsLabel">
              <p className="ModalLabelText">
                Nome do texto
              </p>
              <input
                type="text"
                id="article"
                value={form.article}
                onChange={handleFormValue}
                name="article"
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
              {currentArticle === "new" ? "Adicionar" : "Atualizar"}
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
