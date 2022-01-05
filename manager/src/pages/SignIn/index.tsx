import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useCookies } from "react-cookie";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { throwToast } from "../../utils/Toastify";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form } from "./styles";

import signUpImage from "../../assets/signUp.png";

type User = {
  email: string;
  senha: string;
};

export type Error = {
  response: {
    data: string;
    status: number;
  }
};

const schema = yup.object({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  senha: yup.string().required("Senha obrigatória").min(6, "Minimo de 6 caracteres aeitos")
}).required();

export function SignIn() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(schema)
  });
  const [ , setCookies, ] = useCookies(["token"]);

  async function handleSignUser(data: User) {
    try {
      const response = await api.post("/gerente/login", { ...data });
      setCookies("token", response.data, undefined);
      navigate("/ocurrencies");
    } catch (error) {
      const signError = error as Error;
      switch(signError.response.status){
        case 404:
          throwToast({
            message: signError.response.data,
            type: "error",
          });
        break;
        default:
          console.log("Nenhum desses erros");
      }
    }
  }

  return (
    <div>
      <Container>
        <Form>
          <form onSubmit={handleSubmit(handleSignUser)}>
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
              error={errors.senha}

              placeholder="Senha"
            />

            <Button title="Login" />
          </form>

          <Link to="/signUp">
            <img src={signUpImage} alt="Criar Conta" />
            Criar Conta
          </Link>
        </Form>
        <Background />
      </Container>
    </div>
  );
}
