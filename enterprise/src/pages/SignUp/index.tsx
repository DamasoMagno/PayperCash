import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowLeft, MdMail, MdHome, MdPlace, MdLock } from "react-icons/md";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form, InputsForm } from "./styles";
import { api } from "../../services/api";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

export function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  async function handleSignUp(data: Inputs){
    try {
      const response = await api.post("/enterprises", data);
      console.log(response);
      navigate("/ocurrencies/pendents");
    } catch (error) {
      if(error instanceof Error)
        console.log(error);
    }
  }

  return (
    <Container>
      <Background />
      <Form>
        <InputsForm onSubmit={handleSubmit(handleSignUp)}>
          <h2>Cadastrar</h2>
          <Input
            icon={MdHome}
            required
            register={() => register("nome")}
            placeholder="Empresa"
          />
          <Input
            icon={MdMail}
            required
            type="email"
            register={() => register("email")}
            placeholder="Email"
          />
          <Input
            icon={MdLock}
            required
            register={() => register("senha")}
            placeholder="Senha"
            isPassword
          />
          <Input
            icon={MdPlace}
            required
            register={() => register("endereco")}
            placeholder="Endereço"
          />
          <Button title="Cadastrar" />
        </InputsForm>

        <Link to="/">
          <MdArrowLeft color="#FFF" /> Fazer Login
        </Link>
      </Form>
    </Container>
  );
}
