import { createContext, ReactNode, useContext, useState } from "react";

interface modalContextProps {
  modalEnterpriseIsOpen: boolean;
  modalFinishedOcurrencyIsOpen: boolean;
  modalCreateTechcnianIsOpen: boolean;
  setModalEnterpriseIsOpen(isOpen: boolean): void;
  setModalFinishedOcurrencyIsOpen(isOpen: boolean): void;
  setModalCreateTechnicinIsOpen(isOpen: boolean): void;
}

const modalsContext = createContext<modalContextProps>({} as modalContextProps);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalsProvider({ children }: ModalProviderProps) {
  const [modalEnterpriseIsOpen, setModalEnterpriseIsOpen] = useState(false);
  const [modalFinishedOcurrencyIsOpen, setModalFinishedOcurrencyIsOpen] = useState(false);
  const [modalCreateTechcnianIsOpen, setModalCreateTechnicinIsOpen] = useState(false);

  return (
    <modalsContext.Provider
      value={{
        modalEnterpriseIsOpen,
        modalFinishedOcurrencyIsOpen,
        modalCreateTechcnianIsOpen,
        setModalEnterpriseIsOpen,
        setModalFinishedOcurrencyIsOpen,
        setModalCreateTechnicinIsOpen,
      }}
    >
      {children}
    </modalsContext.Provider>
  );
}

export const useModals = () => useContext(modalsContext);
