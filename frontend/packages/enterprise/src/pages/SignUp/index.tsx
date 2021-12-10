import { Link } from "react-router-dom";
import {  MdArrowLeft, MdMail, MdHome, MdPlace, MdContactPhone, MdLock, MdPhone } from "react-icons/md";

import { Container, Background, Form } from "./styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";

type Inputs = {
  name: string;
  email: string;
  password: string;
  address: string;
  contact: string;
}

export function SignUp(){
  const { register } = useForm<Inputs>();

  const [ step, setStep ] = useState(1);

  return (
    <div>
      <Container>
        <Background />    
        <Form>
          <form>
            <h2>Cadastrar</h2>
            { step === 1 ? (
              <>
                <Input 
                  icon={MdHome}
                  register={() => register("name")}
                  placeholder="Unidade"
                />
                <Input 
                  icon={MdMail} 
                  register={() => register("email")}
                  placeholder="Email"
                />
                <Input 
                  icon={MdLock} 
                  register={() => register("password")}
                  placeholder="Senha"
                  isPassword
                />
                <Button 
                  title="Próximo" 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault()
                    setStep(2)
                  }}
                />
              </>
            ) : (
              <>
                <Input 
                  icon={MdPlace} 
                  register={() => register("address")}
                  placeholder="Endereço"
                />
                <Input 
                  icon={MdPhone}
                  register={() => register("contact")}
                  placeholder="Contato"
                />
                <Button 
                  title="Passo Anterior" 
                  onClick={() => setStep(1)} 
                  type="button"
                />
                <Button title="Cadastrar"/>
              </>
            )}
          </form>

          <Link to="/signIn">
            <MdArrowLeft color="#FFF"/> Fazer Login
          </Link>
        </Form>
      </Container>
    </div>
  );
}