import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useModals } from "../../contexts/modalsContext";
import { Ocurrency as OcurrencyType } from "../../interfaces";
import { useCookies } from "react-cookie";
import { useAuth } from "../../contexts/authContext";
import { api } from "../../services/api";

import { Field } from "../../components/Form/Field";
import { SideBar } from "../../components/SideBar";
import { FinishedModalOcurrency } from "../../components/Modals/FinishedOcurrencyModal";

import { Container, Divider, Content } from "./styles";

import localizationImage from "../../assets/localization.png";

export function Ocurrency() {
  const { user } = useAuth();
  const { id } = useParams();

  const { setModalFinishedOcurrencyIsOpen } = useModals();

  const [techinician, setTechinician] = useState("");
  const [resolution, setResolution] = useState("");
  const [ ocurrency, setOcurreny] = useState({} as OcurrencyType);

  useEffect(() => {
    api.get(`/ocorrencias/${user.id}`)
      .then(response => setOcurreny(response.data));
  }, []);

  return (
    <Container>
      <SideBar />

      <Content>
        <header>
          <small>Detalhes do chamado</small>
          <strong>{ocurrency.titulo}</strong>
          <p>Chamado aberto em 09 de janeiro de 2021 as 15:30</p>
          <Divider>
            <span />
            <div className={id === "1" ? "concluded" : "pendent"}>
              <p>{ocurrency.status?.toLowerCase()}</p>
            </div>
          </Divider>
        </header>
        <main>
          <Field label="Solicitante" value="Maria Gonçalvez" />
          <Field
            label="Título"
            value={ocurrency.titulo}
          />
          <Field
            label="Descrição"
            value={ocurrency.descricao}
          />
          <Field label="Resolutividade" value={ocurrency.resolucao} />
          <Field label="Técnico" value={techinician} />
          <div className="locale">
            <img src={localizationImage} alt="Localização do Gerente" />
            <div>
              <Field label="Endereço" value="Ana Luíza Braga, 1881" />
              <button>
                <p>Localização</p>
              </button>
            </div>
          </div>
        </main>
        {user.perfil === "TECNICO" &&
          ( ocurrency.status === "PENDENTE" ? (
            <button onClick={() => setTechinician("Damaso")} className="action">
              Prestar Suporte
            </button>
          ) : (
            !resolution && (
              <button
                onClick={() => setModalFinishedOcurrencyIsOpen(true)}
                className="action"
              >
                Finalizar Chamado
              </button>
            )
          ))}
      </Content>
      <FinishedModalOcurrency setResolution={setResolution} />
    </Container>
  );
}
