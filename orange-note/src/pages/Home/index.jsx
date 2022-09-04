/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell,
} from "recharts";
import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";
import { get } from "../../services/functions";
import { getItem } from "../../utils/Storage";

import "./style.css";

function Home() {
  const navigate = useNavigate();
  const [pieChart, setPieChart] = useState([{ name: "textos", valor: 10 }]);
  const [barChart, setBarChart] = useState([{ name: "Nome", Cadastrados: 10, Feitos: 5 }]);
  const [total, setTotal] = useState();
  const [done, setDone] = useState();
  const [course, setCourse] = useState();

  const token = getItem("token");
  const Colors = ["var(--colour-graph1)", "var(--colour-graph2)", "var(--colour-orange)"];

  async function loadInfos() {
    let countTotal = 0;
    let countDone = 0;
    let textos = 0;
    let videos = 0;
    let cursos = 0;
    try {
      const { data, status } = await get("/usertopics", token);
      if (status !== 200) {
        return toast.error(data);
      }

      const localBarChart = [];

      data.forEach((iten) => {
        countTotal += iten.contents;
        countDone += iten.done;
        textos += Number(iten.textos);
        videos += Number(iten.videos);
        cursos += Number(iten.cursos);
        localBarChart.push({ name: iten.name, Cadastrados: iten.contents, Feitos: iten.done });
      });
      setTotal(countTotal);
      setDone(countDone);
      setPieChart([{
        name: "Textos",
        valor: textos,
      },
      {
        name: "Vídeos",
        valor: videos,
      },
      {
        name: "Cursos",
        valor: cursos,
      },
      ]);
      return setBarChart(localBarChart);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  async function loadLastLesson() {
    try {
      const { data, status } = await get("/lastcourse", token);
      if (status !== 200) {
        return toast.error(data);
      }
      return setCourse(data);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    if (!token) {
      toast.info("sem token");
      navigate("/");
    }
    loadInfos();
    loadLastLesson();
  }, []);

  return (
    <>
      <Header
        isActive="home"
      />
      <section className="HomePage">
        <section className="MainInfos">
          <article className="Card">
            <div className="HeaderCard">
              O último curso que você assistiu aula
            </div>
            <div className="BodyCard">
              {course
                ? (
                  <button type="button" onClick={() => navigate(`/course/${course.id}`)}>
                    {course.course}
                  </button>
                ) : "Nenhum curso com aula"}
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
              <ResponsiveContainer
                width="100%"
                height={400}
                className="graph"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={barChart}
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
                  <Bar dataKey="Cadastrados" fill="var(--colour-graph1)" />
                  <Bar dataKey="Feitos" fill="var(--colour-graph2)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="GraphCard">
            <div className="HeaderCard">
              Que tipo de conteúdo você consome mais?
            </div>
            <div className="BodyCard">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart width="100%" height="100%">
                  <Pie
                    data={pieChart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {
                      pieChart.map((iten, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={Colors[index]}
                        >
                          <span>
                            {iten.name}
                          </span>
                        </Cell>
                      ))
                    }
                  </Pie>
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
