import { useEffect, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { throwToastError } from "../../utils/toastifyMessages";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { Container, Background, Content, Form } from "./styles";

type UserLogin = {
  email: string;
  senha: string;
};

const schemaValidator = yup
  .object({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    senha: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Minimo 6 caracteres"),
  })
  .required();

export function SignIn() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserLogin>({
    resolver: yupResolver(schemaValidator),
  });

  const [cookie, setCookie] = useCookies(["token"]);
  
  async function handleSignUser(data: UserLogin) {
    try {
      const response = await api.post(`/gerentes/login`, {...data});
      setCookie("token", response.data, undefined);
      navigate("/ocurrencies");
    } catch (error) {
      throwToastError(error);
    }
  }

  return (
    <div>
      <Container>
        <Content>
          <Form onSubmit={handleSubmit(handleSignUser)}>
            <h2>Entrar</h2>
            <Input
              icon={FiMail}
              register={() => register("email")}
              placeholder="Email"
              error={errors.email}
            />
            <Input
              icon={FiLock}
              register={() => register("senha")}
              isPassword
              placeholder="Senha"
              error={errors.senha}
            />
            <Button title="Login" isLoading={isSubmitting} />
          </Form>
          <Link to="/signUp">
            <MdOutlineArrowForwardIos color="var(--secondary-color)" size={16} />
            Criar Conta
          </Link>
        </Content>
        <Background />
      </Container>
    </div>
  );
}
