/* eslint-disable max-len */
import { useState } from "react";
import Header from "../../components/Header";
import StudiesTable from "../../components/Tables/Studies";
import "./style.css";

function createData(id, area, topic, total, done) {
  return {
    id, area, topic, total, done,
  };
}

const rowsDefault = [
  createData(1, "Front End", "JavaScript", 10, 8),
  createData(2, "Front End", "React", 5, 4),
  createData(3, "Back end", "JavaScript", 6, 1),
  createData(4, "UX/UI", "UX Research", 8, 2),
  createData(5, "Mobile", "React Native", 2, 2),
];

function Studies() {
  const [rows, setRows] = useState(rowsDefault);
  return (
    <>
      <Header />
      <div className="StudiesPage">
        <h1 className="StudiesTitle">
          Meus estudos
        </h1>
        <p className="StudiesText">
          Acompanhe, adicione, conclua seus estudos.
          Utilize nossa plataforma e veja seus temas de estudos agrupando as aulas, vídeos, textos, livros e tudo mais que você tenha utilizado neles e ache relevante ter um acesso rápido.
        </p>
        <StudiesTable
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
}

export default Studies;
