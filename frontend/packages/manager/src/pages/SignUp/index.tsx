import { Link } from "react-router-dom";
import {  MdArrowLeft, MdMail, MdHome, MdPlace, MdContactPhone, MdLock, MdPhone } from "react-icons/md";

import { Container, Background, Form } from "./styles";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  contato: string;
}

export function SignUp(){
  const { register, handleSubmit } = useForm<Inputs>();

  const [ step, setStep ] = useState(1);

  function IsHere(){
    console.log(register);
  }

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
                  register={() => register("nome")}
                  placeholder="Unidade"
                />
                <Input 
                  icon={MdMail} 
                  register={() => register("email")}
                  placeholder="Email"
                />
                <Input 
                  icon={MdLock} 
                  register={() => register("senha")}
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
                  register={() => register("endereco")}
                  placeholder="Endereço"
                />
                <Input 
                  icon={MdPhone}
                  register={() => register("contato")}
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