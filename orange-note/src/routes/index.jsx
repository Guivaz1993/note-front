import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Studies from "../pages/Studies";
import StudyDetail from "../pages/StudyDetail";

function index() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/studies" element={<Studies />} />
      <Route path="/studydetail/:id/:topicId" element={<StudyDetail />} />
    </Routes>
  );
}

export default index;
