import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Router } from "react-router-dom";
import {  MdArrowLeft, MdMail, MdHome, MdPlace, MdLock, MdPhone } from "react-icons/md";

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";

import { Container, Background, Form } from "./styles";
import { api } from "../../services/api";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
}

export function SignUp(){
  const { register, handleSubmit } = useForm<Inputs>();

  async function handleSubmitUser(data: any){

    const enterprise = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      endereco: data.endereco,
      data_criacao: new Date()
    }

    try {
      const response = await api.post("/enterprises", enterprise);
      location.href = "/dashboard"
    } catch (error) {
      console.log(error);
      
    }
  }

  const [ step, setStep ] = useState(1);

  return (
    <div>
      <Container>
        <Background />    
        <Form>
          <form onSubmit={handleSubmit(handleSubmitUser)}>
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
            <Button title="Cadastrar" />
          </form>

          <Link to="/">
            <MdArrowLeft color="#FFF"/> Fazer Login
          </Link>
        </Form>
      </Container>
    </div>
  );
}