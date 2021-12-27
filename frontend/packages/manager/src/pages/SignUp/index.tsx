import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  MdArrowLeft,
  MdMail,
  MdHome,
  MdPlace,
  MdContactPhone,
  MdLock,
  MdPhone,
} from "react-icons/md";

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

  return (
    <div>
      <Container>
        <Background />
        <Form>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              navigate("/ocurrencies");
            }}
          >
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
