import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Rotas from "../routes/index";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" style={{ fontSize: "1.6rem" }} />
      <Rotas />
    </div>
  );
}

export default App;
