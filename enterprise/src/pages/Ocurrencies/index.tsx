import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link, useParams } from "react-router-dom";

import { Filters } from "../../components/Filters";
import { SideBar } from "../../components/SideBar";

import { Container, Period, Ocurrency, Content } from "./styles";

import scheduleImage from "../../assets/schedule.svg";
import showOcurrencyImage from "../../assets/showOcurrency.png";

export function Ocurrencies() {
  const { status } = useParams();

  const [ ocurrencies, setOcurrencies ] = useState([]);

  useEffect(() => {
    api.get("/enterprises/1")
      .then(response => setOcurrencies(response.data.ocorrencias));
  }, []);

  const filterByResolucaoConcluida = ocurrencies.filter((ocurrency: any) => {
    return ocurrency.resolucao !== null;
  });

  const ocorrenciasPendentes = ocurrencies.filter((ocurrency: any) => {
    return ocurrency.resolucao === null;
  })

  return (
    <Container>
      <SideBar />

      <Content>
        <Filters />
        <main>
          <Period>
            <h3>Hoje</h3>
            {status === "finished" ? (
              filterByResolucaoConcluida.map( (ocurrencias: any) => (
                <Ocurrency key={ocurrencias.id}>
                <div className="scheduleCall">
                  <img src={scheduleImage} alt="Horário da chamada" />
                  <span>8:30</span>
                </div>
                <Link className="title" to={`/ocurrency/${ocurrencias.id}`}>
                  <p>{ocurrencias.titulo}</p>
                  <img src={showOcurrencyImage} alt="Ir para a ocorrência" />
                </Link>
              </Ocurrency>
              ))
            ) : (
              ocorrenciasPendentes.map((ocorrencias: any) => (
                <Ocurrency key={ocorrencias.id}>
                <div className="scheduleCall">
                  <img src={scheduleImage} alt="Horário da chamada" />
                  <span>12:30</span>
                </div>
                <Link className="title" to={`/ocurrency/${ocorrencias.id}`}>
                  <p>{ocorrencias.titulo}</p>
                  <img src={showOcurrencyImage} alt="Ir para a ocorrência" />
                </Link>
              </Ocurrency>
              ))
            )}
          </Period>
        </main>
      </Content>
    </Container>
  );
}
