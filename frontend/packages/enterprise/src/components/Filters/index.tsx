import { ReactNode } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { InputSearch } from "./InputSearch";
import { Options } from "./Options";
import { Container } from "./styles";

type FiltersProps = {
  children?: ReactNode;
};

export function Filters({ children }: FiltersProps) {
  return (
    <Container>
      { children ?? <Options />}
      <InputSearch title="Buscar ocorrência" />
    </Container>
  );
}
