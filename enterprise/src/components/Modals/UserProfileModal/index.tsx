import { useContext } from "react";
import { useModals } from "../../../contexts/globalContexts";
import { MdHome, MdPlace, MdMail, MdLock } from "react-icons/md";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";

import { Container } from "./styles";
import { Input } from "../../Form/Input";

export function UserProfileModal() {
  const { modalEnterpriseIsOpen, setModalEnterpriseIsOpen } = useModals();
  const { register, watch } = useForm();

  console.log(watch("name"));

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
        />
        <Input
          icon={MdMail}
          placeholder="paypercash@gmail.com"
          readOnly
          register={() => register("email")}
        />
        <Input
          icon={MdPlace}
          placeholder="Inocêncio Braga, 708"
          register={() => register("address")}
        />
        <Input
          icon={MdLock}
          placeholder="123132"
          register={() => register("password")}
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
