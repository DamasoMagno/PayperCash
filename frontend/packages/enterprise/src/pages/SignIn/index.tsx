import { FiMail, FiLock  } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Container, Background, Form } from "./styles";

import signUpImage from "../../assets/signUp.png";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";

export function SignIn(){
  const { register } = useForm();

  return (
    <div>
      <Container>
        <Form>
          <form>
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