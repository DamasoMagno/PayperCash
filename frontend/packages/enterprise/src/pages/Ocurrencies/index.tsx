import { Link, useParams } from "react-router-dom";

import { Filters } from "../../components/Filters";
import { SideBar } from "../../components/SideBar";

import { Container, Period, Ocurrency, Content } from "./styles";

import scheduleImage from "../../assets/schedule.svg";
import showOcurrencyImage from "../../assets/showOcurrency.png";

export function Ocurrencies() {
  const { status } = useParams();

  return (
    <Container>
      <SideBar />

      <Content>
        <Filters />
        <main>
          <Period>
            <h3>Hoje</h3>
            {status !== "finished" ? (
              <Ocurrency>
                <div className="scheduleCall">
                  <img src={scheduleImage} alt="Horário da chamada" />
                  <span>8:30</span>
                </div>
                <Link className="title" to="/ocurrency/0">
                  <p>O servidor da sala gerencias está inativado</p>
                  <img src={showOcurrencyImage} alt="Ir para a ocorrência" />
                </Link>
              </Ocurrency>
            ) : (
              <Ocurrency>
                <div className="scheduleCall">
                  <img src={scheduleImage} alt="Horário da chamada" />
                  <span>12:30</span>
                </div>
                <Link className="title" to={`/ocurrency/1`}>
                  <p>Notebook nãoe stá ligando</p>
                  <img src={showOcurrencyImage} alt="Ir para a ocorrência" />
                </Link>
              </Ocurrency>
            )}
          </Period>
        </main>
      </Content>
    </Container>
  );
}
