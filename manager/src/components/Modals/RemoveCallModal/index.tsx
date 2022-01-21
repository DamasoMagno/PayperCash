import { useModal } from "../../../contexts/modalContext";
import { useAuth } from "../../../contexts/authContext";
import ReactModal from "react-modal";
import { FiAlertTriangle } from "react-icons/fi";

import { api } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { throwToastError } from "../../../utils/toastifyMessages";

import { Container } from "./styles";

export function RemoveCallModal() {
  const { id } = useParams();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const { modalRemoveCall, setModalRemoveCall } = useModal();

  async function handleConfirmRemove(){
    try {
      await api.delete(`/ocorrencias/${id}`);
      setModalRemoveCall(false);
      navigate("/ocurrencies");
    } catch (error) {
      console.log(error.request)
      throwToastError(error, logoutUser);
    }
  }

  return (
    <ReactModal
      isOpen={modalRemoveCall}
      onRequestClose={() => setModalRemoveCall(false)}
      overlayClassName="removeCallModalOverlay"
      className="removeCallModalContent"
    >
      <Container>
        <div className="alertMessage">
          <FiAlertTriangle color="red" />
          <h3>AVISO</h3>
        </div>
        <p>Esta ação removerá este chamado permanentemente do sistema</p>
        <div className="buttons">
          <button onClick={() => setModalRemoveCall(false)}>Cancelar</button>
          <button onClick={handleConfirmRemove} className="remove" type="button">
            Remover
          </button>
        </div>
      </Container>
    </ReactModal>
  );
}
