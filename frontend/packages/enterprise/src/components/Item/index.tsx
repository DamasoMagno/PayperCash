import { MdArrowRight } from "react-icons/md";
import { Container } from "./styles";

type ItemProps = {
  router: string;
  title: string;
  subtitle?: string;
}

export function Item({ router, title, subtitle }: ItemProps){
  return (
    <Container to={router}>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <MdArrowRight color="#FFF"  size={24}/>
    </Container>
  );
}