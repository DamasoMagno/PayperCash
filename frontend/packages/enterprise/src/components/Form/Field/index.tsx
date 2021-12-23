import { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import { Container } from "./styles";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
}

export function Field({ label, value, ...rest }: FieldProps) {
  return (
    <Container>
      <label>{label}</label>
      <div>
        <p>{value}</p>
        <span />
      </div>
    </Container>
  );
}
