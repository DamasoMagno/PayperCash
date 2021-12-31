import ReactModal from "react-modal";

import { Container } from "./styles"; 

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
        <h2>Cadastrar Tecnico</h2>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Senha" />
        <div>
          <button type="button" onClick={onRequestClose}>Cancelar</button>
          <button type="submit"className="create">Cadastrar</button>
        </div>
      </Container>
    </ReactModal>
  );
}
