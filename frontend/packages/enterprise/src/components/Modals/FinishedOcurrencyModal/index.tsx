import { useState } from "react";
import { useModals } from "../../../contexts/globalContexts";
import ReactModal from "react-modal";

import { Container, Buttons, Resolution } from "./styles";

interface FinishedModalOcurrencyProps {
  setResolution: (text: string) => void;
}

export function FinishedModalOcurrency({
  setResolution,
}: FinishedModalOcurrencyProps) {
  const [content, setContent] = useState("");
  const { modalFinishedOcurrencyIsOpen, setModalFinishedOcurrencyIsOpen } =
    useModals();

  function handleFinishOcurrency() {
    if (!content) return;

    setResolution(content);
    setModalFinishedOcurrencyIsOpen(false);
  }

  return (
    <ReactModal
      isOpen={modalFinishedOcurrencyIsOpen}
      onRequestClose={() => setModalFinishedOcurrencyIsOpen(false)}
      className="modalContent "
      overlayClassName="modalOverlay"
    >
      <Container>
        <h2>Finalizar Ocorrência</h2>
        <Resolution>
          <textarea onChange={(e) => setContent(e.target.value)} />
          <label>Resolutividade</label>
        </Resolution>

        <Buttons>
          <button
            type="button"
            onClick={() => setModalFinishedOcurrencyIsOpen(false)}
          >
            Cancelar
          </button>
          <button
            onClick={handleFinishOcurrency}
            type="button"
            className="finish"
          >
            Concluir
          </button>
        </Buttons>
      </Container>
    </ReactModal>
  );
}
