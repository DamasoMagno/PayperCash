import { api } from "../../services/api";
import { useCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdMail,MdPlace, MdArrowBack, MdLogout, MdPeople } from "react-icons/md";
import { useAuth } from "../../contexts/authContext";

import { throwToastError, throwToastSucess } from "../../utils/toastifyMessages";

import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";

import { Container } from "./styles";

type User = {
  id: number;
  email: string;
  nome: string;
  senha: string;
  endereco?: string;
  perfil: "EMPRESA" | "TECNICO";
};

export function Account() {
  const { logoutUser, user } = useAuth();

  const { register, handleSubmit } = useForm<User>();

  async function handleUpdateUserData(data: any){
    try {
      await api.put("/gerentes", {...data})
      throwToastSucess("Atualização feita com sucesso");
    } catch (error) {
      throwToastError(error, logoutUser);
    }
  }

  return (
    <>
      <Header />

      <Container onSubmit={handleSubmit(handleUpdateUserData)}>
        <div className="buttons">
          <Link to="/ocurrencies">
            <MdArrowBack size={24} color="#333"/>
          </Link>
          <button className="logout" onClick={logoutUser}>
            <MdLogout size={24} color="#333" />
          </button>
        </div>

        <h2>Perfil</h2>
        <Input
          icon={MdPeople}
          register={() => register("nome")}
          defaultValue={user?.nome ?? "Damaso Magno"}
        />
        <Input
          icon={MdPlace}
          register={() => register("endereco")}
          defaultValue={user?.endereco ?? "Madalenas"}
        />
        <Input
          icon={MdMail}
          register={() => register("email")}
          defaultValue={user?.email ?? "damasomlima@gmail.com"}
        />
        <button className="confirmChanges ">
          Confirmar Alterações
        </button>
      </Container>
    </>
  );
}
