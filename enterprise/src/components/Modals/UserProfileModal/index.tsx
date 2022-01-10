import { useModals } from "../../../contexts/modalsContext";
import { MdHome, MdPlace, MdMail, MdLock } from "react-icons/md";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";

import { Container } from "./styles";
import { Input } from "../../Form/Input";
import { useAuth } from "../../../contexts/authContext";

export function UserProfileModal() {
  const { user } = useAuth();
  const { modalEnterpriseIsOpen, setModalEnterpriseIsOpen } = useModals();

  const { register, watch } = useForm();

  return (
    <ReactModal
      isOpen={modalEnterpriseIsOpen}
      onRequestClose={() => setModalEnterpriseIsOpen(false)}
      className="modalContent "
      overlayClassName="modalOverlay"
    >
      <Container>
        <h1>Informações Pessoais</h1>

        <Input
          icon={MdHome}
          placeholder="Paypercash Desenvolvimento"
          register={() => register("name")}
          defaultValue={user.nome}
        />
        <Input
          icon={MdMail}
          placeholder="paypercash@gmail.com"
          readOnly
          register={() => register("email")}
          defaultValue={user.email}
        />
        <Input
          icon={MdPlace}
          placeholder="Inocêncio Braga, 708"
          register={() => register("address")}
          defaultValue={user.endereco}
        />
        <Input
          icon={MdLock}
          placeholder="123132"
          register={() => register("password")}
          defaultValue={user.senha}
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
