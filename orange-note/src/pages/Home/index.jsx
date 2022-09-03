/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie,
} from "recharts";

import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";
import { get } from "../../services/functions";
import { getItem } from "../../utils/Storage";

import "./style.css";

function Home() {
  const navigate = useNavigate();
  const [infos, setInfos] = useState([]);
  const [pieChart, setPieChart] = useState([]);
  const [total, setTotal] = useState();
  const [done, setDone] = useState();

  const token = getItem("token");

  async function loadInfos() {
    let countTotal = 0;
    let countDone = 0;
    let textos = 0;
    let videos = 0;
    let cursos = 0;
    let outros = 0;

    const { data, status } = await get("userTopics", token);
    if (status !== 200) {
      return toast.error(data);
    }

    data.forEach((iten) => {
      iten.name = `${iten.study} - ${iten.topic}`;
      iten.conteudos = Number(iten.textos) + Number(iten.videos) + Number(iten.cursos);
      iten.finalizados = Number(iten.textos_finalizados) + Number(iten.videos_finalizadas) + Number(iten.cursos_finalizados);
      countTotal += iten.conteudos;
      countDone += iten.finalizados;
      textos += Number(iten.textos);
      videos += Number(iten.videos);
      cursos += Number(iten.cursos);
      outros += Number(iten.outros);
    });
    setTotal(countTotal);
    setDone(countDone);
    setPieChart([{
      name: "textos",
      valor: textos,
    },
    {
      name: "videos",
      valor: videos,
    },
    {
      name: "cursos",
      valor: cursos,
    },
    ]);

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
              Gráfico de barras
              {/* <BarGraphic data={infos} /> */}
              <ResponsiveContainer
                width="100%"
                height={400}
                className="graph"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={infos}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="conteudos" fill="var(--colour-graph1)" />
                  <Bar dataKey="finalizados" fill="var(--colour-graph2)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="GraphCard">
            <div className="HeaderCard">
              Que tipo de conteúdo você consome mais?
            </div>
            <div className="BodyCard">
              Gráfico de pizza
              <ResponsiveContainer width="100%" height={400}>
                <PieChart width="100%" height="100%">
                  <Pie
                    dataKey="valor"
                    isAnimationActive={false}
                    data={pieChart}
                    // cx="50%"
                    // cy="50%"
                    outerRadius={80}
                    fill="var(--colour-graph1)"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>
      </section>
    </>
  );
}

export default Home;
