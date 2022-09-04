import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import ArticlesTable from "../../components/Tables/Articles";
import VideosTable from "../../components/Tables/Videos";
import CoursesTable from "../../components/Tables/Courses";
import ModalArticle from "../../components/Modal/Article";

function StudyDetail() {
  const { id, topicId } = useParams();
  const [openArticleModal, setOpenArticleModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState("new");
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const handleOpenArticle = ({ idArticle }) => {
    if (idArticle) {
      setCurrentArticle(idArticle);
    } else {
      setCurrentArticle("new");
    }

    setOpenArticleModal(true);
  };

  const handleOpenVideo = (idVideo) => {
    if (idVideo) {
      setCurrentVideo(idVideo);
    } else {
      setCurrentVideo(null);
    }

    setOpenVideoModal(true);
  };

  const handleOpenCourse = (idCourse) => {
    if (idCourse) {
      setCurrentCourse(idCourse);
    } else {
      setCurrentCourse(null);
    }

    setOpenCourseModal(true);
  };

  useEffect(() => {
  }, []);
  return (
    <div>
      <Header />
      <div className="StudyDetailPage">
        <h2 className="DetailText DetailTitle">Textos</h2>
        <div className="DetailContainerText">
          <p className="DetailText DetailInfo">Aqui estão seu textos cadastrados para esse tópico.</p>
          <button type="button" className="DetailBtn" onClick={handleOpenArticle}>
            Adicionar novo texto
          </button>
        </div>
        <ArticlesTable
          id={id}
          handleOpenArticle={handleOpenArticle}
          openArticleModal={openArticleModal}
        />
        <h2 className="DetailText DetailTitle">Videos</h2>
        <div className="DetailContainerText">
          <p className="DetailText DetailInfo">Aqui estão seu vídeos cadastrados para esse tópico.</p>
          <button type="button" className="DetailBtn" onClick={handleOpenVideo}>
            Adicionar novo vídeo
          </button>
        </div>
        <VideosTable id={id} />
        <h2 className="DetailText DetailTitle">Cursos</h2>
        <div className="DetailContainerText">
          <p className="DetailText DetailInfo">Aqui estão seu cursos cadastrados para esse tópico.</p>
          <button type="button" className="DetailBtn" onClick={handleOpenCourse}>
            Adicionar novo curso
          </button>
        </div>
        <CoursesTable id={id} />
      </div>
      {openArticleModal && (
        <ModalArticle
          openModal={openArticleModal}
          setOpenModal={setOpenArticleModal}
          topicId={topicId}
          userTopicsId={id}
          currentArticle={currentArticle}
        />
      )}
      {openVideoModal && (
        <ModalArticle
          openModal={openVideoModal}
          setOpenModal={setOpenVideoModal}
          topicId={topicId}
          userTopicsId={id}
          currentVideo={currentVideo}
        />
      )}
      {openCourseModal && (
        <ModalArticle
          openModal={openCourseModal}
          setOpenModal={setOpenCourseModal}
          topicId={topicId}
          userTopicsId={id}
          currentCourse={currentCourse}
        />
      )}
    </div>
  );
}

export default StudyDetail;
