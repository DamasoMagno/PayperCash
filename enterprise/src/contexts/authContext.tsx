import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type User = {
  id: number;
  email: string;
  nome: string;
  senha: string;
  endereco?: string;
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

  const isLoginPageOrSignPage = pathname ===  "/" || pathname === "/signUp";

  const [ user, setUser ] = useState({} as User);
  const [ cookie, , removeCookie ] = useCookies(["token"]);

  const typeAccount = JSON.parse(localStorage.getItem("@type") as string);

  useEffect(() => {
    api
      .get(`/${typeAccount}`, { headers: { token: cookie.token } })
      .then((response) => setUser(response.data))
      .catch(logoutUser);
  }, [!isLoginPageOrSignPage]);

  function logoutUser() {
    removeCookie("token");
    navigate("/");
  }

  return (
    <authContext.Provider value={{ user, logoutUser }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
