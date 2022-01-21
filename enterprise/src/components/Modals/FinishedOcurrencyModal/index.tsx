import { useState } from "react";
import { useModals } from "../../../contexts/modalsContext";
import ReactModal from "react-modal";

import { Container, Buttons, Resolution } from "./styles";
import { api } from "../../../services/api";
import { useParams } from "react-router-dom";
import { throwToastError } from "../../../utils/toastify";

interface FinishedModalOcurrencyProps {
  setResolution: (text: string) => void;
}

export function FinishedModalOcurrency({ setResolution }: FinishedModalOcurrencyProps) {
  const { id } = useParams();

  const [ content, setContent ] = useState("");
  const { modalFinishedOcurrencyIsOpen, setModalFinishedOcurrencyIsOpen } = useModals();

  async function handleFinishOcurrency() {
    if (!content) return;

    try {
      const response = await api.put(`/ocorrencias/finalizar/${id}`, { resolucao: content });
      setResolution(response.data);
      setModalFinishedOcurrencyIsOpen(false);
    } catch (error) {
      throwToastError(error);
    }
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
