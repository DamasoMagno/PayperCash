import { createContext, ReactNode, useContext, useState } from "react";

type modalContextProps = {
  modalOpenCallIsOpen: boolean;
  setModalOpenCallIsOpen: (modal: boolean) => void;
}

export const modalContext = createContext({} as modalContextProps);

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps){
  const [ modalOpenCallIsOpen, setModalOpenCallIsOpen ] = useState(false);

  return (
    <modalContext.Provider value={{ modalOpenCallIsOpen, setModalOpenCallIsOpen }} >
      { children }
    </modalContext.Provider>
  );
}

export function useModal(){
  return useContext(modalContext);
}