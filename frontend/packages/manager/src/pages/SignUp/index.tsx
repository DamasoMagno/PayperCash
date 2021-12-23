import { Link } from "react-router-dom";
import {  MdArrowLeft, MdMail, MdHome, MdPlace, MdContactPhone, MdLock, MdPhone } from "react-icons/md";

import { Container, Background, Form } from "./styles";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
}

export function SignUp(){
  const { register, handleSubmit } = useForm<Inputs>();

  const [ step, setStep ] = useState(1);

  async function signUpUser(data: any){
    console.log(data);

    const response = await api.post("/manager/1");
    console.log(response);
  }

  return (
    <div>
      <Container>
        <Background />    
        <Form>
          <form onSubmit={handleSubmit(signUpUser)}>
            <h2>Cadastrar</h2>
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
                <Input 
                  icon={MdPlace} 
                  register={() => register("endereco")}
                  placeholder="Endereço"
                />
                <Button title="Cadastrar"/>
          </form>

          <Link to="/signIn">
            <MdArrowLeft color="#FFF"/> Fazer Login
          </Link>
        </Form>
      </Container>
    </div>
  );
}