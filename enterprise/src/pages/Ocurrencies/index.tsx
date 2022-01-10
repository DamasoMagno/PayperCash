import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

import { formatOcurrencies } from "../../utils/formatOcurrencies";

import { Filters } from "../../components/Filters";
import { SideBar } from "../../components/SideBar";

import { Container, Period, Ocurrency, Content } from "./styles";

import scheduleImage from "../../assets/schedule.svg";
import showOcurrencyImage from "../../assets/showOcurrency.png";
import { useCookies } from "react-cookie";
import { Ocurrency as OcurrencyType } from "../../interfaces";

type OcurrencyFormated = Pick<OcurrencyType, "id" | "dataCriacao" | "titulo">;

export function Ocurrencies() {
  const navigate = useNavigate();
  const { status } = useParams();

  const [ ocurrencies, setOcurrencies ] = useState<OcurrencyFormated[]>([]);
  const [ cookie, setCooke, removeCookie ] = useCookies(["token"]);

  useEffect(() => {
    api.get("/empresas", {  headers: { token: cookie.token }})
      .then(response => {
        const ocurrenciesFormatted = response.data.ocorrencias 
              .map((ocorrencia: OcurrencyType) => formatOcurrencies(ocorrencia));
        setOcurrencies(ocurrenciesFormatted);
      }).catch(() => {
        navigate("/");
        removeCookie("token");
      });
  }, []);

  const filterByResolucaoConcluida = ocurrencies.filter((ocurrency: any) => {
    return ocurrency.status === "CONCLUIDO";
  });

  const ocorrenciasPendentes = ocurrencies.filter((ocurrency: any) => {
    return ocurrency.status === "PEDENTE";
  });

  return (
    <Container>
      <SideBar />

      <Content>
        <Filters />
        <main>
          <Period>
            <h3>Hoje</h3>
            {status === "finished" ? (
              filterByResolucaoConcluida.map( (ocurrencias: OcurrencyFormated) => (
                <Ocurrency key={ocurrencias.id}>
                <div className="scheduleCall">
                  <img src={scheduleImage} alt="Horário da chamada" />
                  <span>{ocurrencias.dataCriacao}</span>
                </div>
                <Link className="title" to={`/ocurrency/${ocurrencias.id}`}>
                  <p>{ocurrencias.titulo}</p>
                  <img src={showOcurrencyImage} alt="Ir para a ocorrência" />
                </Link>
              </Ocurrency>
              ))
            ) : (
              ocorrenciasPendentes.map((ocorrencias: OcurrencyFormated) => (
                <Ocurrency key={ocorrencias.id}>
                <div className="scheduleCall">
                  <img src={scheduleImage} alt="Horário da chamada" />
                  <span>{ocorrencias.dataCriacao}</span>
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
