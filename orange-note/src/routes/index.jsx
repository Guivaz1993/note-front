import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";

function index() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}

export default index;
