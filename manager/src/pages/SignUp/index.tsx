import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdArrowLeft, MdMail, MdHome, MdLock } from "react-icons/md";
import { api } from "../../services/api";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { throwToast } from "../../utils/Toastify";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form } from "./styles";

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
  }
};

const schema = yup.object({
  nome: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  senha: yup.string().required("Senha obrigatória").min(6, "Minimo de 6 caracteres aeitos"),
  endereco: yup.string().required("Endereco obrigatório") 
}).required();

export function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  async function handleSignUp(data: Inputs) {
    try {
      await api.post("/gerente", { ...data });
      navigate("/");
    } catch (error) {
      const signError = error as Error;
      switch(signError.response.status){
        case 400:
          throwToast({
            message: signError.response.data,
            type: "error",
          });
        break;
        case 404:
          throwToast({
            message: signError.response.data,
            type: "error",
          });
        break;
        default:
          console.log("Nenhum desses erros selsecionado");
      }
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
              register={() =>
                register("nome", { required: "Unidade obrigatória" })
              }
              placeholder="Unidade"
              error={errors.nome}
            />
            <Input
              icon={MdMail}
              register={() =>register("email")}
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
              icon={MdLock}
              register={() =>
                register("endereco", { required: "Endereco obrigatorio" })
              }
              placeholder="Endereco"
              error={errors.endereco}
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
