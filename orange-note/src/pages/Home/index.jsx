import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";
import "./style.css";

function Home() {
  return (
    <>
      <Header />
      <section className="HomePage">
        <h1>
          Dashboard
        </h1>
        <section className="MainInfos">
          <article className="Card">
            <div className="HeaderCard">
              Card 1
            </div>
            <div className="BodyCard">

              Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
              Card 1 card 1 Card 1 card 1 Card 1 card 1
            </div>
          </article>
          <article className="Card">
            <div className="HeaderCard">
              Card 2
            </div>
            <div className="BodyCard">
              Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
              Card 1 card 1 Card 1 card 1 Card 1 card 1
            </div>
          </article>
          <article className="Card">
            <div className="HeaderCard">
              Card 3
            </div>
            <div className="BodyCard">
              <p>
                Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
                Card 1 card 1 Card 1 card 1 Card 1 card 1
              </p>
              <ProgressBar progress={50} />
            </div>
          </article>
        </section>
        <section className="GraphInfos">
          <article className="GraphCard">
            <div className="HeaderCard">
              Card 1
            </div>
            <div className="BodyCard">

              Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
              Card 1 card 1 Card 1 card 1 Card 1 card 1
            </div>
          </article>
          <article className="GraphCard">
            <div className="HeaderCard">
              Card 2
            </div>
            <div className="BodyCard">
              Card 1 card 1 Card 1 card 1 Card 1 card 1 Card 1 card 1
              Card 1 card 1 Card 1 card 1 Card 1 card 1
            </div>
          </article>
        </section>
      </section>
    </>
  );
}

export default Home;
