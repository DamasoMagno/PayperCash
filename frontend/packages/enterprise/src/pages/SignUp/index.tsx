import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdArrowLeft, MdMail, MdHome, MdPlace, MdLock } from "react-icons/md";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form, InputsForm } from "./styles";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

export function SignUp() {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <Container>
      <Background />
      <Form>
        <InputsForm onSubmit={(e: FormEvent) => {
          e.preventDefault(); 
          location.href="/ocurrencies/pendents"
        }}>
          <h2>Cadastrar</h2>
          <Input
            icon={MdHome}
            required
            register={() => register("nome")}
            placeholder="Unidade"
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
