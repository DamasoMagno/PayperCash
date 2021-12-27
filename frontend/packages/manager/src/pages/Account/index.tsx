import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  MdMail,
  MdPlace,
  MdHome,
  MdContactPhone,
  MdArrowBack,
  MdLogout,
  MdPeople,
} from "react-icons/md";

import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";

import { Container, Buttons } from "./styles";

import localization from "../../assets/localeMap.png";

type User = {
  unity: string;
  name: string;
  email: string;
  address: string;
  contact: string;
};

export function UserProfile() {
  const { register } = useForm<User>();

  return (
    <>
      <Header>
        <Buttons>
          <Link to="/ocurrencies">
            <MdArrowBack size={24} />
          </Link>
          <Link to="/">
            <MdLogout size={24} color="#FFF" />
          </Link>
        </Buttons>
      </Header>

      <Container>
        <div className="locale">
          <img src={localization} alt="React Leaflet" />
        </div>

        <Input
          icon={MdHome}
          value="Unidade Madalenas"
          register={() => register("unity")}
        />
        <Input
          icon={MdPeople}
          value="Damaso Magno"
          register={() => register("name")}
        />
        <Input
          icon={MdPlace}
          value="Ana Luiza Braga, 1881"
          register={() => register("address")}
        />
        <Input
          icon={MdMail}
          value="damasomlima@gmail.com"
          register={() => register("email")}
        />
        <Input
          icon={MdContactPhone}
          value="(88) 9 9601-8788"
          register={() => register("contact")}
        />

        <button className="confirmChanges " type="submit">
          Confirmar Alterações
        </button>
      </Container>
    </>
  );
}
