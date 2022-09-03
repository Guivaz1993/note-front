import "./style.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import ArticlesTable from "../../components/Tables/Articles";
import VideosTable from "../../components/Tables/Videos";
import CoursesTable from "../../components/Tables/Courses";
// import useUser from "../../hooks/useUser";

function StudyDetail() {
  const { id, topicId } = useParams();

  useEffect(() => {
    console.log(topicId);
  }, []);
  return (
    <div>
      <Header />
      <div className="StudyDetailPage">
        <h1>Textos</h1>
        <button type="button">
          Adicionar novo texto
        </button>
        <ArticlesTable id={id} />
        <h1>Videos</h1>
        <VideosTable id={id} />
        <h1>Cursos</h1>
        <CoursesTable id={id} />
      </div>
    </div>
  );
}

export default StudyDetail;
