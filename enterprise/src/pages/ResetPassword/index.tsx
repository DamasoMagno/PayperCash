import { useForm } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { Container, ResetPasswordForm } from "./styles";

export function ResetPassword(){
  const { register, handleSubmit } = useForm();

  function handleResetPassword(data: any){}

  return (
    <Container>
      <ResetPasswordForm onSubmit={handleSubmit(handleResetPassword)}>
        <Input register={() => register("email")} placeholder="E-mail"/>
        <Input register={() => register("senha")} placeholder="Nova Senha"/>
        <Button title={"Alterar Senha"}>Alterar Senha</Button>
      </ResetPasswordForm>
    </Container>
  );
}