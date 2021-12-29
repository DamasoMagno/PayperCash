import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  endereco: string;
};

type Ocurrency = {
  id: number;
  titulo:string;
  descricao: string;
  data_criacao: string;
}

interface modalContextProps {
  modalOpenCallIsOpen: boolean;
  setModalOpenCallIsOpen: (modal: boolean) => void;
  createNewOcurrency: (data: Ocurrency) => void;
};

interface authContextProps {
  user: User;
}

interface AppProps {
  children: ReactNode;
}

export const authContext = createContext<authContextProps>({} as authContextProps);

export const modalContext = createContext({} as modalContextProps);

export function AppProvider({ children }: AppProps) {
  const [ user, setUser ] = useState<User>({} as User);
  const [ modalOpenCallIsOpen, setModalOpenCallIsOpen ] = useState(false);
  const [ ocurrencies, setOcurrencies ] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("@Id");

    api.get<User>(`/manager/${id}`)
      .then((response) => setUser(response.data));
  });

  async function createNewOcurrency(data: Ocurrency){
    const response = await api.post(`/ocurrencies/${user.id}`, { data });
    console.log(response);
  }

  return (
    <authContext.Provider value={{ user }}>
      <modalContext.Provider value={{ modalOpenCallIsOpen, setModalOpenCallIsOpen, createNewOcurrency }}>
        {children}
      </modalContext.Provider>
    </authContext.Provider>
  );
}

export function useModal() {
  return useContext(modalContext);
}
