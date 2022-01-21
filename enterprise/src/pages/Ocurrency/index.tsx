import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useModals } from "../../contexts/modalsContext";
import { Ocurrency as OcurrencyType, User } from "../../interfaces";
import { MdOutlinePlace, MdPlace } from "react-icons/md";
import { useAuth } from "../../contexts/authContext";
import { api } from "../../services/api";

import { Field } from "../../components/Form/Field";
import { SideBar } from "../../components/SideBar";
import { FinishedModalOcurrency } from "../../components/Modals/FinishedOcurrencyModal";

import { Container, Divider, Content } from "./styles";
import { useCookies } from "react-cookie";
import { throwToastError } from "../../utils/toastify";

export function Ocurrency() {
  const { user, logoutUser } = useAuth();
  const { id } = useParams();

  const { setModalFinishedOcurrencyIsOpen } = useModals();

  const [resolution, setResolution] = useState("");
  const [ technician, setTechnician ] = useState("");
  const [ocurrency, setOcurreny] = useState({} as OcurrencyType);
  const [cookies] = useCookies(["token"]);

  const months = [
    "Janeiro",
    "Fervereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  useEffect(() => {
    api
      .get(`/ocorrencias/${id}`)
      .then((response) => setOcurreny(response.data))
      .catch((error) => console.log(error.response));
  }, []);

  const formatData = () => {
    const formattedData =
      new Date(ocurrency.dataCriacao).getDate() +
      " de " +
      months[new Date(ocurrency.dataCriacao).getMonth()] +
      " de " +
      new Date(ocurrency.dataCriacao).getFullYear();

    return formattedData;
  };

  async function handleTOcurrency() {
    try {
      const response = await api.put(`/ocorrencias/direcionar/${id}`);
      setTechnician(response.data.tecnico);
    } catch (error) {
      throwToastError(error, logoutUser);
    }
  }

  return (
    <Container>
      <SideBar />

      <Content>
        <header>
          <small>Detalhes do chamado</small>
          <strong>{ocurrency.titulo}</strong>
          <p>Chamado aberto em {formatData()}</p>
          <Divider>
            <span />
            <div
              className={
                ocurrency.status === "CONCLUIDO" ? "concluded" : "pendent"
              }
            >
              <p>{ocurrency.status}</p>
            </div>
          </Divider>
        </header>
        <main>
          <Field label="Solicitante" value={ocurrency.gerente} />
          <Field label="Título" value={ocurrency.titulo} />
          <Field label="Descrição" value={ocurrency.descricao} />
          <Field
            label="Resolutividade"
            value={ocurrency.resolucao ?? resolution}
          />
          <Field label="Técnico" value={ocurrency.tecnico ?? technician} />
          <div className="locale">
            <Field label="Endereço" value={ocurrency.endereco} />
            <a href="#">
              <MdOutlinePlace color="#FFF" size={18} />
              <p>Localização</p>
            </a>
          </div>
          {(user.perfil === "TECNICO") &&
            (!ocurrency.tecnico ? (
              <button className="action" onClick={handleTOcurrency}>
                Direcionar Chamado
              </button>
            ) : (
              !ocurrency.resolucao && (
                <button
                  className="action"
                  onClick={() => setModalFinishedOcurrencyIsOpen(true)}
                >
                  Finalizar Ocorrencia
                </button>
              )
            ))}
        </main>
      </Content>
      <FinishedModalOcurrency setResolution={setResolution} />
    </Container>
  );
}
