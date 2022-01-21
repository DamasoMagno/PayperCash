import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdMail, MdHome, MdPlace, MdLock, MdLogin } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { throwToastError } from "../../utils/toastifyMessages";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form, Content } from "./styles";
import { api } from "../../services/api";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

const schemaValidator = yup
  .object({
    nome: yup.string().required("Nome obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    senha: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Minimo 6 caracteres"),
    endereco: yup.string().required("Endereço obrigatório"),
  })
  .required();

export function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
    resolver: yupResolver(schemaValidator),
  });

  async function handleSignUp(data: Inputs) {
    try {
      await api.post("/gerentes", {...data});
      navigate("/");
    } catch (error) {
      throwToastError(error);
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <Form onSubmit={handleSubmit(handleSignUp)}>
          <h2>Cadastrar</h2>
          <Input
            icon={MdHome}
            register={() => register("nome")}
            placeholder="Nome"
            error={errors.nome}
          />
          <Input
            icon={MdMail}
            type="email"
            register={() => register("email")}
            placeholder="Email"
            error={errors.email}
          />
          <Input
            icon={MdLock}
            register={() => register("senha")}
            placeholder="Senha"
            isPassword
            error={errors.senha}
          />
          <Input
            icon={MdPlace}
            register={() => register("endereco")}
            placeholder="Endereço"
            error={errors.endereco}
          />
          <Button title="Cadastrar" isLoading={isSubmitting} />
        </Form>
        <Link to="/">
          <FiLogIn color="var(--secondary-color)"/>Entrar
        </Link>
      </Content>
    </Container>
  );
}
