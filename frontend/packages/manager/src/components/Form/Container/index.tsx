import { FormHTMLAttributes, HTMLAttributes, HtmlHTMLAttributes, ReactNode } from "react";
import { Container } from "./styles";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  title: string;
}

export function Form({ title, children, ...rest }: FormProps){
  return (
    <Container>
      <form {...rest}>
        <h2>{ title }</h2>
        { children }
      </form>  
    </Container>
  );
}