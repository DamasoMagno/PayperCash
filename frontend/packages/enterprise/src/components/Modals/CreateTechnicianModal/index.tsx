import ReactModal from "react-modal";

import { Container } from "./styles";

import { Button } from "primereact/button";

type TechnicianModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function CreateTechnicianModal({
  isOpen,
  onRequestClose,
}: TechnicianModalProps) {
  return (
    <ReactModal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="modalOverlay"
      className="modalContent"
    >
      <Container>
        <h1>Cadastrar Tecnico</h1>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Senha" />
        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
