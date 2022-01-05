import { createContext, ReactNode, useContext, useState } from "react";

interface modalContextProps {
  modalEnterpriseIsOpen: boolean;
  modalFinishedOcurrencyIsOpen: boolean;
  modalCreateTechcnianIsOpen: boolean;
  setModalEnterpriseIsOpen(isOpen: boolean): void;
  setModalFinishedOcurrencyIsOpen(isOpen: boolean): void;
  setModalCreateTechnicinIsOpen(isOpen: boolean): void;
}

interface userContext {
  typeOfAccount: string;
  setTypeofAccount(type: string): void;
}

const modalsContext = createContext<modalContextProps>({} as modalContextProps);

const userContext = createContext<userContext>({} as userContext);

interface AppContextProps {
  children: ReactNode;
}

export function AppContext({ children }: AppContextProps) {
  const [modalEnterpriseIsOpen, setModalEnterpriseIsOpen] = useState(false);
  const [modalFinishedOcurrencyIsOpen, setModalFinishedOcurrencyIsOpen] = useState(false);
  const [ modalCreateTechcnianIsOpen, setModalCreateTechnicinIsOpen ] = useState(false);

  const [typeOfAccount, setTypeofAccount] = useState("");

  return (
    <userContext.Provider value={{ typeOfAccount, setTypeofAccount }}>
      <modalsContext.Provider
        value={{
          modalEnterpriseIsOpen,
          modalFinishedOcurrencyIsOpen,
          modalCreateTechcnianIsOpen,
          setModalEnterpriseIsOpen,
          setModalFinishedOcurrencyIsOpen,
          setModalCreateTechnicinIsOpen
        }}
      >
        {children}
      </modalsContext.Provider>
    </userContext.Provider>
  );
}

export function useModals() {
  return useContext(modalsContext);
}

export function useUser() {
  return useContext(userContext);
}
