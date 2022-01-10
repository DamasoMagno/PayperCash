import { ButtonHTMLAttributes } from "react";
import { CircleSpinner } from "react-spinners-kit";

import { Container } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading, ...rest }: ButtonProps) {
  return (
    <Container disabled={isLoading} {...rest}>
      {isLoading ? <CircleSpinner color="#000" size={22}/> : title}
    </Container>
  );
}
