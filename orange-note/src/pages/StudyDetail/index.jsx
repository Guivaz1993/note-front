import "./style.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import ArticlesTable from "../../components/Tables/Articles";
import VideosTable from "../../components/Tables/Videos";
// import useUser from "../../hooks/useUser";

function StudyDetail() {
  // const { currentStudy } = useUser();
  const { id } = useParams();

  useEffect(() => {
  }, []);
  return (
    <div>
      <Header />
      <div className="StudyDetailPage">
        <h1>Textos</h1>
        <ArticlesTable id={id} />
        <h1>Videos</h1>
        <VideosTable id={id} />
      </div>
    </div>
  );
}

export default StudyDetail;
