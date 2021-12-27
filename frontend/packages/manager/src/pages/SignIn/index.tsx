import { FormEvent } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

import { Container, Background, Form } from "./styles";

import signUpImage from "../../assets/signUp.png";

export function SignIn() {
  const navigate = useNavigate();

  const { register } = useForm();

  return (
    <div>
      <Container>
        <Form>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              navigate("/ocurrencies");
            }}
          >
            <h2>Entrar</h2>
            <Input
              icon={FiMail}
              register={() => register("email")}
              placeholder="Email"
            />
            <Input
              icon={FiLock}
              register={() => register("password")}
              isPassword
              placeholder="Senha"
            />
            <Button title="Login" />
          </form>

          <Link to="signUp">
            <img src={signUpImage} alt="Criar Conta" />
            Criar Conta
          </Link>
        </Form>
        <Background />
      </Container>
    </div>
  );
}
