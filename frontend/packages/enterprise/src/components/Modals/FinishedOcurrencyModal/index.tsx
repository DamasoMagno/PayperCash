import { useModals } from "../../../contexts/modalsContext";
import ReactModal from "react-modal";

import { Container } from './styles';
import { useState } from "react";

interface FinishedModalOcurrencyProps {
  setResolution: (text: string) => void;
}

export function FinishedModalOcurrency({ setResolution }: FinishedModalOcurrencyProps) {
  const [ content, setContent ] = useState("");
  const { modalFinishedOcurrencyIsOpen, onSetModalFinishedOcurrencyIsOpen } = useModals();

  return (
    <ReactModal 
      isOpen={modalFinishedOcurrencyIsOpen}
      onRequestClose={() => onSetModalFinishedOcurrencyIsOpen(false)}  
      className="modalContent "
      overlayClassName="modalOverlay"
    >
      <Container>
      <h1>Finalizar Ocorrência</h1>
      <div>
        <label htmlFor="">Resolutividade</label>
        <textarea onChange={e => setContent(e.target.value)}/>
      </div>
      <div className="buttons">
        <button>Editar</button>
        <button style={{ background: "#333" }} 
          onClick={() => {
            setResolution(content),
            onSetModalFinishedOcurrencyIsOpen(false)
          }} 
        >Concluir</button>
      </div>  
      </Container>
    </ReactModal>
  );
};

