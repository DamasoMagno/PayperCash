import { InputHTMLAttributes } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useModals } from "../../../contexts/modalsContext";
import { Container } from "./styles";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  canEdit?: boolean;
  label?: string;
  value?: string;
  action?: () => void;
}

export function Field({ label, value, canEdit, action }: FieldProps) {
  const { setModalUpdateDataIsOpen } = useModals();

  return (
    <Container>
      <label>{label}</label>
      <div>
        <p>{value}</p>
        {canEdit && (
          <button>
            <FiEdit2 color="#676767" onClick={action}/>
          </button>
        )}
      </div>
    </Container>
  );
}
