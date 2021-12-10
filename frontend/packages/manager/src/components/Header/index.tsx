import { ReactNode } from "react";
import { Container, Content } from "./styles";

type Header = {
  children: ReactNode;
}

export function Header({ children }: Header){
  return (
    <Container>
      <Content>
        { children }
      </Content>
    </Container>
  );
}