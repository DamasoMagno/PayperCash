import { useModals } from "../../../contexts/modalsContext";
import { MdHome, MdPlace, MdMail } from "react-icons/md";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/authContext";
import { api } from "../../../services/api";
import { User } from "../../../interfaces";
import { throwToastError } from "../../../utils/toastify";

import { Input } from "../../Form/Input";

import { Container } from "./styles";


export function UserProfileModal() {
  const { user, logoutUser } = useAuth();
  const { modalEnterpriseIsOpen, setModalEnterpriseIsOpen } = useModals();

  const { register, handleSubmit } = useForm();

  async function handleUpdateUser(data: User) {
    const newData = {
      nome: data.nome.trim() !== user.nome.trim() ? data.nome : null,
      email: data.email.trim() !== user.email.trim() ? data.email : null,
      address: data.endereco?.trim() !== user.endereco ? data.endereco : null,
    };

    try {
      await api.put(`/empresas`, { ...newData });
    } catch (error) {
      throwToastError(error, logoutUser);
    }
  }

  return (
    <ReactModal
      isOpen={modalEnterpriseIsOpen}
      onRequestClose={() => setModalEnterpriseIsOpen(false)}
      className="modalContent "
      overlayClassName="modalOverlay"
    >
      <Container onSubmit={handleSubmit(handleUpdateUser)}>
        <h2>Informações Pessoais</h2>
        <Input
          icon={MdHome}
          placeholder="Paypercash Desenvolvimento"
          register={() => register("nome")}
          defaultValue={user.nome}
        />
        <Input
          icon={MdMail}
          placeholder="paypercash@gmail.com"
          register={() => register("email")}
          defaultValue={user.email}
        />
        <Input
          icon={MdPlace}
          placeholder="Inocêncio Braga, 708"
          register={() => register("endereco")}
          defaultValue={user.endereco}
        />

        <div className="buttons">
          <button onClick={() => setModalEnterpriseIsOpen(false)} type="button">
            Fechar
          </button>
          <button className="edit">Editar</button>
        </div>
      </Container>
    </ReactModal>
  );
}
