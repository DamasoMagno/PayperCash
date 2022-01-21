import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { MdArrowForwardIos } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import { Ocurrency as OcurrencyType } from "../../interfaces";

import { formatOcurrencies } from "../../utils/formatOcurrencies";

import { SideBar } from "../../components/SideBar";
import { useAuth } from "../../contexts/authContext";
import { InputSearch } from "../../components/Form/InputSearch";

import { Container, Period, Ocurrency, Content } from "./styles";

type OcurrencyFormated = Pick<OcurrencyType, "id" | "dataCriacao" | "titulo" | "tecnico">;

export function Ocurrencies() {
  const { pathname } = useLocation();
  const { status } = useParams();
  const { logoutUser, user } = useAuth();

  const [ocurrencies, setOcurrencies] = useState<OcurrencyFormated[]>([]);

  useEffect(() => {
    api
      .get(`/ocorrencias`)
      .then((response) => {
        const ocurrenciesFormatted = response.data.map(
          (ocorrencia: OcurrencyType) => formatOcurrencies(ocorrencia)
        );
        setOcurrencies(ocurrenciesFormatted);
      })
      .catch(logoutUser);
  }, [pathname]);

  const ocurrenciesFinished = ocurrencies.filter((ocurrency: any) => {
    return ocurrency.status === "CONLUIDO";
  });

  const ocurrenciesPendents = ocurrencies.filter((ocurrency: any) => {
    return ocurrency.status === "PEDENTE";
  });



  return (
    <Container>
      <SideBar />

      <Content>
        <InputSearch title="Procurar ocorrencia" />

        <main>
          <Period>
            <h3>Janeiro - 2021</h3>
            {status === "finished" ? (
              ocurrenciesFinished.map((ocurrency) => (
                <Ocurrency key={ocurrency.id}>
                  <div className="scheduleCall">
                    <FiClock color="#333" size={16} />
                    <span>{ocurrency.dataCriacao.padEnd(5, "0")}</span>
                  </div>
                  <Link className="title" to={`/ocurrency/${ocurrency.id}`}>
                    <p>{ocurrency.titulo}</p>
                    <MdArrowForwardIos color="#333" size={18} />
                  </Link>
                </Ocurrency>
              ))
            ) : (
              ocurrenciesPendents.map((ocurrency) => (
                <Ocurrency 
                  key={ocurrency.id} 
                  otherTechncian={ocurrency.tecnico !== user.nome}
                >
                  <div className="scheduleCall">
                    <FiClock color="#333" size={16} />
                    <span>{ocurrency.dataCriacao.padEnd(4, "0")}</span>
                  </div>
                  <Link className="title" to={`/ocurrency/${ocurrency.id}`}>
                    <p>{ocurrency.titulo}</p>
                    <MdArrowForwardIos color="#333" size={18} />
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
