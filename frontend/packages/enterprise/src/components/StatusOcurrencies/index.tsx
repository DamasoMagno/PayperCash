import { Container } from "./styles";

export function Status(){
  return (
    <Container>
      <div>
        <span>pendente</span>
        <span>05</span>
      </div>
      <div>
        <span>concluido</span>
        <span>10</span>
      </div>
    </Container>
  );
}