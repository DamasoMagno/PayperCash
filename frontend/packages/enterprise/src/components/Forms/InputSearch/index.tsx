import { FiSearch } from "react-icons/fi";

import { Container } from "./styles";

interface InputSearchPorps {
  title: string;
}

export function InputSearch({ title }: InputSearchPorps){
  return (
    <Container>
      <input placeholder={title}/>
      <FiSearch size={20} color="rgba(0, 0, 0, .15)"/>
    </Container>
  );
}