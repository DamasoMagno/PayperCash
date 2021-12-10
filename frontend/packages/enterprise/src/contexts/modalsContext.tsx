import { createContext, ReactNode, useContext, useState } from "react";

interface modalContextProps {
  modalEnterpriseIsOpen: boolean;
  modalOcurrencyManagerIsOpen: boolean;
  modalFinishedOcurrencyIsOpen: boolean;
  onSetModalEnterpriseIsOpen( isOpen: boolean ): void;
  onSetModalOcurrencyManagerIsOpen( isOpen: boolean ): void; 
  onSetModalFinishedOcurrencyIsOpen( isOpen: boolean ): void;
}

export const modalsContexts = createContext<modalContextProps>({} as modalContextProps);

interface AppContextProps {
  children: ReactNode;
}

export function AppContext({ children }: AppContextProps){
  const [ modalEnterpriseIsOpen, onSetModalEnterpriseIsOpen ] = useState(false);
  const [ modalOcurrencyManagerIsOpen, onSetModalOcurrencyManagerIsOpen ] = useState(false);
  const [ modalFinishedOcurrencyIsOpen, onSetModalFinishedOcurrencyIsOpen ] = useState(false);

  return (
    <modalsContexts.Provider value={{ 
      modalEnterpriseIsOpen, 
      modalOcurrencyManagerIsOpen, 
      modalFinishedOcurrencyIsOpen,
      onSetModalEnterpriseIsOpen,
      onSetModalFinishedOcurrencyIsOpen,
      onSetModalOcurrencyManagerIsOpen
    }}>
      { children }
    </modalsContexts.Provider>
  );
}


export function useModals(){
  return useContext(modalsContexts);
}