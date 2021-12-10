import ReactModal from "react-modal";
import { useModals } from "../../../contexts/modalsContext";
import { Input } from "../../Forms/Input";
import { MdPlace, MdMail, MdHome, MdPhone } from "react-icons/md";
import { useForm } from "react-hook-form";

import { Container } from "./styles";

import localizationImage from "../../../assets/localization.png";

export function OcurrencyManagerProfile() {
  const { modalOcurrencyManagerIsOpen, onSetModalOcurrencyManagerIsOpen } = useModals();
  const { register } = useForm();

  return (
    <ReactModal 
      isOpen={modalOcurrencyManagerIsOpen}
      onRequestClose={() => onSetModalOcurrencyManagerIsOpen(false)}
      className="modalContent "
      overlayClassName="modalOverlay"
    >
      <Container>
        <img src={localizationImage} alt="Localização do usuario" />
        <Input 
          icon={ MdHome } 
          value="Unidade Madalenas" 
          register={() => register("name")}
        />
        <Input 
          icon={ MdMail } 
          value="madalenas@gmail.com" 
          register={() => register("name")}
        />
        <Input 
          icon={ MdPlace } 
          value="Ana Luiza Braga, 1881" 
          register={() => register("name")}
        />
        <Input 
          icon={ MdPhone } 
          value="(88) 9 97018688" 
          register={() => register("name")}
        />

        <div className="contact">
          <button type="button">Whatsapp</button>
          <button type="button">E-mail</button>
        </div>
      </Container>
    </ReactModal>
  );
};

