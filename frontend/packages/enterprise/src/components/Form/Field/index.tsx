import { HtmlHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { IconBaseProps } from "react-icons/lib";
import { MdEdit } from "react-icons/md";
import { Container } from "./styles";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  canEdit?: boolean;
  label: string;
  value?: string;
  action?: () => void;
}

export function Field({ label, value, canEdit, action }: FieldProps) {
  return (
    <Container>
      <label>{label}</label>
      <div>
        <div className="contentInput">
          <p>{value}</p>
          {canEdit && (
            <button>
              <MdEdit />
            </button>
          )}
        </div>
        <span />
      </div>
    </Container>
  );
}
