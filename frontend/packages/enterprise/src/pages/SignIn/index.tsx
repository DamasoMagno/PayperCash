import { FormEvent } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Form/Input";

import { Container, Background, Form, TypeAccount, Content } from "./styles";
import { Link } from "react-router-dom";

export function SignIn() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <Container>
        <Form>
          <Content onSubmit={(e: FormEvent) => {
            e.preventDefault();
            location.href="/ocurrencies/pendents";
          }}>
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
            <TypeAccount>
              <button type="button" onClick={() => {}}>
                Técnico
              </button>
              <button type="button" onClick={() => {}}>
                Empresa
              </button>
            </TypeAccount>
          </Content>
          <Link to="/signUp">
            ir
          </Link>
        </Form>
        <Background />
      </Container>
    </div>
  );
}
