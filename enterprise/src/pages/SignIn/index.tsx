import { FiMail, FiLock } from "react-icons/fi";
import { MdArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { throwToastError } from "../../utils/toastify";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { Container,Background, Content, TypeAccount, Form, Type, Navigation } from "./styles";
import { useAuth } from "../../contexts/authContext";

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
  const { accountSelecioned, setAccountSelecioned } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserLogin>({
    resolver: yupResolver(schemaValidator),
  });

  const [, setCookie] = useCookies(["token"]);

  async function handleSignUser(data: UserLogin) {
    try {
      const response = await api.post(`/${accountSelecioned}/login`, {...data,});
      setCookie("token", response.data, undefined);
      navigate("/ocurrencies/pendents");
    } catch (error) {
      throwToastError(error);
    }
  }

  function setTypeAccount(type: string) {
    setAccountSelecioned(type);
    localStorage.setItem("@type", JSON.stringify(type));
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
            <Button title="Login" isLoading={isSubmitting} />
          </Form>
          <Navigation to="/signUp" active={accountSelecioned === "empresas"}>
            <MdArrowRight color="#FFF" size={24} />
            Criar Conta
          </Navigation>
        </Content>
        <Background />
      </Container>
    </div>
  );
}
