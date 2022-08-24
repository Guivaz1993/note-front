import Header from "../../components/Header";
import StudiesTable from "../../components/Tables/Studies";
import "./style.css";

function Studies() {
  return (
    <>
      <Header />
      <div className="StudiesPage">
        <h1>
          Organizador
        </h1>
        <StudiesTable />
      </div>
    </>
  );
}

export default Studies;
