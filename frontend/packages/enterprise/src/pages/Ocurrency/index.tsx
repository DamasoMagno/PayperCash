import { useState } from "react";
import { useParams } from "react-router-dom";
import { useModals } from "../../contexts/globalContexts";

import { Field } from "../../components/Form/Field";
import { SideBar } from "../../components/SideBar";
import { FinishedModalOcurrency } from "../../components/Modals/FinishedOcurrencyModal";

import { Container, Divider, Content } from "./styles";

import localizationImage from "../../assets/localization.png";
import { Button } from "../../components/Form/Button";

export function Ocurrency() {
  const { id } = useParams();

  const { setModalFinishedOcurrencyIsOpen } = useModals();

  const [techinician, setTechinician] = useState("");
  const [resolution, setResolution] = useState("");

  return (
    <Container>
      <SideBar />

      <Content>
        <header>
          <small>Detalhes do chamado</small>
          <strong>Notebook na sala de gerencias não está ligando</strong>
          <p>Chamado aberto em 09 de janeiro de 2021 as 15:30</p>
          <Divider>
            <span />
            <div className={id === "1" ? "concluded" : "pendent"}>
              <p>{id === "1" ? "concluido" : "pendente"}</p>
            </div>
          </Divider>
        </header>
        <main>
          <Field label="Solicitante" value="Maria Gonçalvez" />
          <Field
            label="Título"
            value="Monitor não  estava amostrando o display  ligado"
          />
          <Field
            label="Descrição"
            value="Hoje de manhã, cheguei ao posto e notei que o monitor da sala de impressão não estava sando sinal de funcionamento."
          />
          <Field label="Resolutividade" value={resolution} />
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
          {!techinician ? (
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
          )}
      </Content>
      <FinishedModalOcurrency setResolution={setResolution} />
    </Container>
  );
}
