import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { MdArrowRight } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies  } from "react-cookie";
import { api } from "../../services/api";
import * as yup from "yup";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { Container, Background, Form, TypeAccount, InputsForm, Type } from "./styles";
import { showError } from "../../utils/showError";
import { yupResolver } from "@hookform/resolvers/yup";

type UserLogin = {
  email: string;
  senha: string;
}

const schemaValidator = yup.object({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  senha: yup.string().required("Senha obrigatória").min(6, "Minimo 6 caracteres"),
}).required();

export function SignIn() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>({
    resolver: yupResolver(schemaValidator)
  });

  const [ , setCookie, ] = useCookies(["token"]);
  const [ loading, setLoading ] = useState(false);

  const [ accountSelecioned, setAccountSelecioned ] = useState(() => {
    const typeAccount = JSON.parse(localStorage.getItem("@type") as string);
    return typeAccount ? typeAccount : "tecnicos";
  });

  async function handleSignUser(data: UserLogin){
    try {
      setLoading(true);
      const response = await api.post(`/${accountSelecioned}/login`, {...data});
      setCookie("token", response.data, undefined);
      setLoading(false);
      navigate("/ocurrencies/pendents");
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  }

  function setTypeAccount(type: string){
    setAccountSelecioned(type);
    localStorage.setItem("@type", JSON.stringify(type));
  }

  return (
    <div>
      <Container>
        <Form>
          <InputsForm
            onSubmit={handleSubmit(handleSignUser)}
          >
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
            <TypeAccount>
              <Type
                type="button"
                selecioned={accountSelecioned === "tecnicos"}
                onClick={() => setTypeAccount("tecnicos")}
              >
                Técnico
              </Type>
              <Type
                type="button"
                selecioned={accountSelecioned === "empresas"}
                onClick={() => setTypeAccount("empresas")}
              >
                Empresa
              </Type>
            </TypeAccount>
            <Button title="Login" isLoading={loading}/>
          </InputsForm>

          {accountSelecioned === "empresas" && (
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
