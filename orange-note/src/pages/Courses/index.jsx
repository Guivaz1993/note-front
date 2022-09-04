import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import LessonsTable from "../../components/Tables/Lessons";
import { getItem } from "../../utils/Storage";
import { get } from "../../services/functions";
import ModalCourse from "../../components/Modal/Course";
import ModalLesson from "../../components/Modal/Lesson";

function Courses() {
  const { id } = useParams();
  const [course, setCourse] = useState({
    id: 1,
    course: "nome",
    description: "Descrição",
    link: "https://link.com",
    done: false,
    last_change: "2022-09-03T12:35:34.019Z",
    user_id: 1,
    topic_id: 1,
    usertopics_id: 1,
  });
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(id);
  const [openLessonModal, setOpenLessonModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState("new");

  const token = getItem("token");

  async function loadData() {
    try {
      const { data, status } = await get(`/course/${id}`, token);
      if (status !== 200) {
        return toast.error(data);
      }
      return setCourse(data);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  const handleOpenCourse = () => {
    setCurrentCourse(id);

    setOpenCourseModal(true);
  };

  const handleOpenLesson = ({ lessonId }) => {
    if (lessonId) {
      setCurrentLesson(lessonId);
    } else {
      setCurrentLesson("new");
    }

    setOpenLessonModal(true);
  };

  useEffect(() => {
    loadData();
  }, [openCourseModal]);

  return (
    <div>
      <Header />
      <div className="CoursePage">
        <div className="Flex">
          <section className="CourseInfosContainer">
            <h1 className="CourseTitle">{course.course}</h1>
            <p className="CourseTextBase CourseText">{course.description}</p>
            <span
              className={course.done
                ? "CourseTextBase CourseDone"
                : "CourseTextBase CourseNotDone"}
            >
              {course.done ? "Concluído" : "Em aberto"}
            </span>
            <a href={course.link} className="CourseTextBase CourseLink">{course.link}</a>
          </section>
          <div className="CourseBtnSection">
            <button type="button" className="CourseBtn CourseEditCourse" onClick={handleOpenCourse}>
              Editar Curso
            </button>
            <button type="button" className="CourseBtn CourseEditCourse" onClick={handleOpenLesson}>
              Adicionar Aula
            </button>
          </div>
        </div>
        <LessonsTable
          id={id}
          handleOpenLesson={handleOpenLesson}
          openLessonModal={openLessonModal}
        />
      </div>
      {openCourseModal && (
        <ModalCourse
          openModal={openCourseModal}
          setOpenModal={setOpenCourseModal}
          topicId={course.topic_id}
          userTopicsId={id}
          currentCourse={currentCourse}
        />
      )}
      {openLessonModal && (
        <ModalLesson
          openModal={openLessonModal}
          setOpenModal={setOpenLessonModal}
          course={id}
          currentLesson={currentLesson}
        />
      )}
    </div>
  );
}

export default Courses;
