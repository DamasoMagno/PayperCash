import { MdArrowDropDown } from "react-icons/md";
import { Container } from "./styles";

export function Options() {
  return (
    <Container>
      <select>
        <option value="">TODOS</option>
      </select>
      <MdArrowDropDown color="#333" size={20} />
    </Container>
  );
}
