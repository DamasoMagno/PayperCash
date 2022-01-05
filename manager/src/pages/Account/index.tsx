import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdMail, MdPlace, MdArrowBack, MdLogout, MdPeople } from "react-icons/md";

import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";

import { Container, Buttons } from "./styles";

import localization from "../../assets/localeMap.png";

type User = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

export function Account() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<User>();
  const [ cookies,, removeCookies ] = useCookies(["token"]);
  const [ user, setUser ] = useState<User>({} as User);

  useEffect(() => { 
    api.get<User>(`gerente`, { headers: { token: cookies.token } })
      .then((response) => setUser(response.data))
      .catch((error) => {
        removeCookies("token");
        navigate("/");
      });
  }, []);

  function updateUserData(data: User){
    console.log(data);
  }

  function logoutAccount(){
    removeCookies("token");
    navigate("/");
  }

  return (
    <>
      <Header>
        <Buttons>
          <Link to="/ocurrencies">
            <MdArrowBack size={24} />
          </Link>
          <button className="logout" onClick={logoutAccount}>
            <MdLogout size={24} color="#FFF" />
          </button>
        </Buttons>
      </Header>

      <Container onSubmit={handleSubmit(updateUserData)}>
        <div className="locale">
          <img src={localization} alt="React Leaflet" />
        </div>
          <Input
            icon={MdPeople}
            register={() => register("nome")}
            defaultValue={user.nome}
          />
          <Input
            icon={MdPlace}
            register={() => register("endereco")}
            defaultValue={user.endereco}
          />
          <Input
            icon={MdMail}
            register={() => register("email")}
            defaultValue={user.email}
          />

        <button className="confirmChanges " type="submit">
          Confirmar Alterações
        </button>
      </Container>
    </>
  );
}
