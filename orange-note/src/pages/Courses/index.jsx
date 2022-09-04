import "./style.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import LessonsTable from "../../components/Tables/Lessons";

function Courses() {
  const { id } = useParams();

  useEffect(() => {
  }, []);
  return (
    <div>
      <Header />
      <div className="StudyDetailPage">
        <h1>Curso</h1>
        <p>Descrição Descrição</p>
        <span>Finalizado?</span>
        <a href="www.link.com">Link</a>
        <button type="button">
          Editar Curso
        </button>
        <LessonsTable id={id} />
      </div>
    </div>
  );
}

export default Courses;
