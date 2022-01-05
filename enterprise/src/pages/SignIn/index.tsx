import { FormEvent, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { MdArrowRight, MdArrowRightAlt } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { Container, Background, Form, TypeAccount, InputsForm, Type } from "./styles";

export function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [accountSelecioned, setAccountSelecioned] = useState("Tecnico");

  async function handleSignUser(data: any){
    console.log(data);
  }

  return (
    <div>
      <Container>
        <Form>
          <InputsForm
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              navigate("/ocurrencies/pendents")
            }}
          >
            <h2>Entrar</h2>

            <Input
              icon={FiMail}
              required
              type="email"
              register={() => register("email")}
              placeholder="Email"
            />
            <Input
              icon={FiLock}
              required
              register={() => register("password")}
              isPassword
              placeholder="Senha"
            />
            <TypeAccount>
              <Type
                type="button"
                
                selecioned={accountSelecioned === "Tecnico"}
                onClick={() => setAccountSelecioned("Tecnico")}
              >
                Técnico
              </Type>
              <Type
                type="button"
                selecioned={accountSelecioned === "Empresa"}
                onClick={() => setAccountSelecioned("Empresa")}
              >
                Empresa
              </Type>
            </TypeAccount>
            <Button title="Login"/>
          </InputsForm>

          {accountSelecioned === "Empresa" && (
            <Link to="/signUp">
              <MdArrowRight color="#FFF" size={24}/>
              Criar Conta
            </Link>
          )}
        </Form>
        <Background />
      </Container>
    </div>
  );
}
