import "./style.css";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import Header from "../../components/Header";

// import useUser from "../../hooks/useUser";

function Courses() {
  // const { currentStudy } = useUser();
  // const { id } = useParams();

  useEffect(() => {
  }, []);
  return (
    <div>
      <Header />
      <div className="StudyDetailPage">
        <h1>Aulas</h1>

      </div>
    </div>
  );
}

export default Courses;
