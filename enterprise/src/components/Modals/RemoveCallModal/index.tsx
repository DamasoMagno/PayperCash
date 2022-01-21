import { useModals } from "../../../contexts/modalsContext";
import ReactModal from "react-modal";
import { FiAlertTriangle } from "react-icons/fi";

import { Container } from "./styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { throwToastError } from "../../../utils/toastify";
import { useCookies } from "react-cookie";
import { useAuth } from "../../../contexts/authContext";


export function RemoveCallModal() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const {  logoutUser } = useAuth();
  const navigate = useNavigate();

  const url = pathname.split("/")[1] === "category" ? "categorias" : "tecnicos";

  const { modalRemoveDataIsOpen, setModalRemoveDataIsOpen } = useModals();

  async function removeCategory() {
    try {
      await api.delete(`/${url}/${id}`);
      setModalRemoveDataIsOpen(false);
      navigate(-1);
    } catch (error) {
      throwToastError(error, logoutUser);
    }
  }

  return (
    <ReactModal
      isOpen={modalRemoveDataIsOpen}
      onRequestClose={() => setModalRemoveDataIsOpen(false)}
      overlayClassName="removeCallModalOverlay"
      className="removeCallModalContent"
    >
      <Container>
        <div className="alertMessage">
          <FiAlertTriangle color="red"/>
          <h3>AVISO</h3>
        </div>
        <p>Esta ação removerá este dado permanentemente do sistema</p>
        <div className="buttons">
          <button onClick={() => setModalRemoveDataIsOpen(false)}>Cancelar</button>
          <button onClick={removeCategory} className="remove" type="button">Remover</button>
        </div>
      </Container>
    </ReactModal>
  );
}
