import { createContext, ReactNode, useContext, useState } from "react";

interface modalContextProps {
  modalOpenCallIsOpen: boolean;
  setModalOpenCallIsOpen: (modal: boolean) => void;
  modalRemoveCall: boolean;
  setModalRemoveCall: (modal: boolean) => void;
}
interface AppProps {
  children: ReactNode;
}

export const modalContext = createContext({} as modalContextProps);

export function ModalProvider({ children }: AppProps) {
  const [modalOpenCallIsOpen, setModalOpenCallIsOpen] = useState(false);
  const [ modalRemoveCall, setModalRemoveCall ] = useState(false);

  return (
    <modalContext.Provider
      value={{ modalOpenCallIsOpen, setModalOpenCallIsOpen, modalRemoveCall, setModalRemoveCall }}
    >
      {children}
    </modalContext.Provider>
  );
}

export function useModal() {
  return useContext(modalContext);
}
