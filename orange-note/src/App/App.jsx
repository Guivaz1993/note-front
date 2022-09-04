import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Rotas from "../routes/index";
import { UserProvider } from "../contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <ToastContainer theme="colored" style={{ fontSize: "1.6rem" }} />
        <Rotas />
      </div>
    </UserProvider>
  );
}

export default App;
