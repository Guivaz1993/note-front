/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";
import { get } from "../../services/functions";
import { getItem } from "../../utils/Storage";
import "./style.css";

function Home() {
  const navigate = useNavigate();
  const [infos, setInfos] = useState([]);
  const [total, setTotal] = useState();
  const [done, setDone] = useState();

  const token = getItem("token");

  function countInfos() {

  }

  async function loadInfos() {
    let countTotal = 0;
    let countDone = 0;

    const { data, status } = await get("userTopics", token);
    if (status !== 200) {
      return toast.error(data);
    }

    data.forEach((iten) => {
      countTotal += Number(iten.textos) + Number(iten.videos) + Number(iten.cursos);
      countDone += Number(iten.textos_finalizados) + Number(iten.videos_finalizadas) + Number(iten.cursos_finalizados);
    });
    setTotal(countTotal);
    setDone(countDone);

    return setInfos(data);
  }

  useEffect(() => {
    if (!token) {
      toast.info("sem token");
      navigate("/");
    }
    loadInfos();
  }, []);
  return (
    <>
      <Header
        isActive="home"
      />
      <section className="HomePage">
        <h1>
          Dashboard
        </h1>
        <section className="MainInfos">
          <article className="Card">
            <div className="HeaderCard">
              Última aula alterada
            </div>
            <div className="BodyCard">
              Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
              Card 1 card 1 Card 1 card 1 Card 1 card 1
            </div>
          </article>
          <article className="Card">
            <div className="HeaderCard">
              Quantidade de conteúdos
            </div>
            <div className="BodyCard">
              {`Você tem ${total} conteúdos cadastrados`}
            </div>
          </article>
          <article className="Card">
            <div className="HeaderCard">
              Evolução
            </div>
            <div className="BodyCard">
              <p>
                Você já completou
                {" "}
                {((done / total) * 100).toFixed(2)}
                {" "}
                % dos seus conteúdos cadastrados
              </p>
              <ProgressBar progress={(done / total) * 100} />
            </div>
          </article>
        </section>
        <section className="GraphInfos">
          <article className="GraphCard">
            <div className="HeaderCard">
              O que você tem estudado mais?
            </div>
            <div className="BodyCard">
              Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
              Card 1 card 1 Card 1 card 1 Card 1 card 1
            </div>
          </article>
          <article className="GraphCard">
            <div className="HeaderCard">
              Que tipo de conteúdo você consome mais?
            </div>
            <div className="BodyCard">
              Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
              Card 1 card 1 Card 1 card 1 Card 1 card 1
            </div>
          </article>
        </section>
      </section>
    </>
  );
}

export default Home;
