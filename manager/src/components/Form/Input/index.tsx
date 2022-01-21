import { InputHTMLAttributes, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IconBaseProps } from "react-icons/lib";

import { Container } from "./styles";

interface InputProfileProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  isPassword?: boolean;
  register: () => UseFormRegisterReturn;
  error?: FieldError;
}

export function Input({
  icon: Icon,
  isPassword,
  register,
  error,
  ...rest
}: InputProfileProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container notValid={!!error}>
        { Icon && <Icon color="#666360" size={24} />}
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          {...register()}
          {...rest}
        />
        {isPassword && (
          <button onClick={() => setShowPassword(!showPassword)} type="button">
            {showPassword ? <FiEyeOff color="#676767" /> : <FiEye color="#676767" />}
          </button>
        )}
        { !!error && (<p>{error.message}</p>) }
      </Container>
  );
}
