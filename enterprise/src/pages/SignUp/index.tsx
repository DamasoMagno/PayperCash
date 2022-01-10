import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowLeft, MdMail, MdHome, MdPlace, MdLock } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";

import { showError } from "../../utils/showError";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form, InputsForm } from "./styles";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

export type Error = {
  response: {
    data: string;
    status: number;
  };
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schemaValidator),
  });

  const [loading, setLoading] = useState(false);

  async function handleSignUp(data: Inputs) {
    try {
      setLoading(true);
      await api.post("/empresas", data);
      setLoading(false);
      navigate("/ocurrencies/pendents");
    } catch (error) {
      setLoading(false);
      showError(error);
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
            register={() => register("nome")}
            placeholder="Empresa"
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
          <Button title="Cadastrar" isLoading={loading} />
        </InputsForm>

        <Link to="/">
          <MdArrowLeft color="#FFF" /> Fazer Login
        </Link>
      </Form>
    </Container>
  );
}
