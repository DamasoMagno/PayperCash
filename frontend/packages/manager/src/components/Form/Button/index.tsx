import { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement>{
  title: string;
}

export function Button({ title, ...rest }: ButtonProps){
  return (
    <Container {...rest}>
    { title }
    </Container>
  );
}