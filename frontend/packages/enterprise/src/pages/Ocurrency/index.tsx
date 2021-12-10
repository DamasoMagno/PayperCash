import { Field } from "../../components/Field";
import { useModals } from '../../contexts/modalsContext';
import { FinishedModalOcurrency } from "../../components/Modals/FinishedOcurrencyModal";

import { Container, Buttons, Divider} from "./styles";

import localizationImage from "../../assets/localization.png";
import { useState } from "react";

export function Ocurrency(){
  const { onSetModalFinishedOcurrencyIsOpen } = useModals();

  const [ techinician, setTechinician ] = useState("");
  const [ resolution, setResolution ] = useState("");

  return (
    <Container>
      <small>Detalhes do chamado</small>
      <strong>Notebook na sala de gerencias não está ligando</strong>
      <p>Chamado aberto em 09 de janeiro de 2021 as 15:30</p>

      <Divider>
        <span />
        <div className={resolution ? "concluded" :  "pendent"}>
          <p>{ resolution ? "concluido" : "pendente" }</p>
        </div>
      </Divider>

      <Field label="Solicitante" value="Maria Gonçalvez"/>
      <Field 
        label="Titulo" 
        value="Monitor não  estava amostrando o display  ligado"
      />
      <Field 
        label="Descrição" 
        value="Hoje de manhã, cheguei ao posto e notei que o monitor da sala de impressão não estava sando sinal de funcionamento.        "
      />
      <Field label="Resolutividade" value={ resolution ?? "" }/>
      <Field label="Técnico" value={ techinician ?? "" } />  
      <div className="locale">
        <img src={ localizationImage } alt="Localização do Gerente" />
        <div>
          <Field label="Endereço" value="Ana Luíza Braga, 1881"/>
          <button>
            <p>Localização</p>
          </button>
        </div>
      </div>

      <Buttons>
        <button onClick={() => setTechinician("Damaso")}>Atender</button>
        <button onClick={() => onSetModalFinishedOcurrencyIsOpen(true)}>Concluir Chamado</button>
      </Buttons>

    <FinishedModalOcurrency 
      setResolution={setResolution}  
    />
    </Container>
  );
}