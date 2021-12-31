import ReactModal from "react-modal";
import { useModals } from "../../../contexts/globalContexts";
import { Input } from "../../Form/Input";
import { MdPlace, MdMail, MdHome, MdPhone } from "react-icons/md";
import { useForm } from "react-hook-form";

import { Container } from "./styles";

import localizationImage from "../../../assets/localization.png";

export function OcurrencyManagerProfile() {
  const { modalOcurrencyManagerIsOpen, setModalOcurrencyManagerIsOpen } =
    useModals();
  const { register } = useForm();

  return (
    <ReactModal
      isOpen={modalOcurrencyManagerIsOpen}
      onRequestClose={() => setModalOcurrencyManagerIsOpen(false)}
      className="modalContent "
      overlayClassName="modalOverlay"
    >
      <Container>
        <img src={localizationImage} alt="Localização do usuario" />
        <Input
          icon={MdHome}
          value="Unidade Madalenas"
          readOnly
          register={() => register("name")}
        />
        <Input
          icon={MdMail}
          value="madalenas@gmail.com"
          readOnly
          register={() => register("name")}
        />
        <Input
          icon={MdPlace}
          value="Ana Luiza Braga, 1881"
          readOnly
          register={() => register("name")}
        />
        <Input
          icon={MdPhone}
          value="(88) 9 97018688"
          readOnly
          register={() => register("name")}
        />

        <div className="contact">
          <button
            type="button"
            onClick={() => setModalOcurrencyManagerIsOpen(false)}
          >
            Fechar
          </button>
          <button type="button" className="whatsapp">Whatsapp</button>
        </div>
      </Container>
    </ReactModal>
  );
}
