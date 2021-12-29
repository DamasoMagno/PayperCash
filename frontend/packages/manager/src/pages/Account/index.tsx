import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  MdMail,
  MdPlace,
  MdContactPhone,
  MdArrowBack,
  MdLogout,
  MdPeople,
} from "react-icons/md";

import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";

import { Container, Buttons } from "./styles";

import localization from "../../assets/localeMap.png";
import { api } from "../../services/api";
import { useContext } from "react";
import { authContext } from "../../hooks/useOcurrencies";

type User = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

export function UserProfile() {
  const { user } = useContext(authContext);
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
            icon={MdPeople}
            value={user.nome}
            register={() => register("nome")}
          />
          <Input
            icon={MdPlace}
            value={user.endereco}
            register={() => register("endereco")}
          />
          <Input
            icon={MdMail}
            value={user.email}
            register={() => register("email")}
          />
          <Input
            icon={MdContactPhone}
            value={user.senha}
            register={() => register("senha")}
          />

        <button className="confirmChanges " type="submit">
          Confirmar Alterações
        </button>
      </Container>
    </>
  );
}
