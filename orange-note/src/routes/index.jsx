import {
  Routes, Route, Outlet, Navigate,
} from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Studies from "../pages/Studies";
import StudyDetail from "../pages/StudyDetail";
import Courses from "../pages/Courses";
import { getItem } from "../utils/Storage";

function ProtectedRoutes({ redirectTo }) {
  const isAuth = getItem("token");
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

function index() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoutes redirectTo="/login" />}>
        <Route path="/home" element={<Home />} />
        <Route path="/studies" element={<Studies />} />
        <Route path="/studydetail/:id/:topicId" element={<StudyDetail />} />
        <Route path="/course/:id" element={<Courses />} />
      </Route>
    </Routes>
  );
}

export default index;
