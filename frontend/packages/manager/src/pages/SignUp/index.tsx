import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdArrowLeft, MdMail, MdHome, MdPlace, MdLock } from "react-icons/md";
import { api } from "../../services/api";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form } from "./styles";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

export function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  async function handleSignUp(data: Inputs) {
    try {
      const response = await api.post("/manager", data);
      localStorage.setItem("@Id", JSON.stringify(response.data.id));
      console.log(response);
      navigate("/ocurrencies");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  return (
    <div>
      <Container>
        <Background />
        <Form>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <h2>Cadastrar</h2>
            <Input
              icon={MdHome}
              register={() => register("nome")}
              placeholder="Unidade"
            />
            <Input
              icon={MdMail}
              register={() => register("email")}
              placeholder="Email"
            />
            <Input
              icon={MdLock}
              register={() => register("senha")}
              placeholder="Senha"
              isPassword
            />
            <Input
              icon={MdPlace}
              register={() => register("endereco")}
              placeholder="Endereço"
            />
            <Button title="Cadastrar" />
          </form>

          <Link to="/">
            <MdArrowLeft color="#FFF" /> Fazer Login
          </Link>
        </Form>
      </Container>
    </div>
  );
}
