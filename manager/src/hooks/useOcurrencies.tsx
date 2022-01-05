import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

interface modalContextProps {
  modalOpenCallIsOpen: boolean;
  setModalOpenCallIsOpen: (modal: boolean) => void;
}
interface AppProps {
  children: ReactNode;
}

export const modalContext = createContext({} as modalContextProps);

export function AppProvider({ children }: AppProps) {
  const [modalOpenCallIsOpen, setModalOpenCallIsOpen] = useState(false);

  return (
    <modalContext.Provider
      value={{ modalOpenCallIsOpen, setModalOpenCallIsOpen }}
    >
      {children}
    </modalContext.Provider>
  );
}

export function useModal() {
  return useContext(modalContext);
}
