import { Container } from "./styles";

interface FieldProps {
  label: string;
  value?: string;
}

export function Field({ label, value }: FieldProps){
  return (
    <Container>
      <label>{label}</label>
      <div>
        <p>{value ?? " "}</p>
        <span />
      </div>
    </Container>
  );
}