import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Ocurrency } from "../interfaces";
import path from "path/posix";

type User = {
  id: number;
  email: string;
  nome: string;
  senha: string;
  endereco?: string;
  ocorrencias: Ocurrency[];
  perfil: "EMPRESA" | "TECNICO";
};

type authContext = {
  user: User;
  logoutUser: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const authContext = createContext<authContext>({} as authContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSignPage = pathname === "/" || pathname === "/signUp";

  const [user, setUser] = useState({} as User);
  const [cookies, , removeCookies] = useCookies(["token"]);

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = cookies.token;

    if (!isSignPage) {
      api
        .get(`/gerentes`)
        .then((response) => setUser(response.data))
        .catch(logoutUser);
    }
  }, [pathname]);

  function logoutUser() {
    removeCookies("token");
    navigate("/");
  }

  return (
    <authContext.Provider value={{ user, logoutUser }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
