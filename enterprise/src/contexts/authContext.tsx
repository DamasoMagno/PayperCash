import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { User } from "../interfaces";
import { api } from "../services/api";

type authContext = {
  user: User;
  logoutUser: () => void;
  accountSelecioned: string;
  setAccountSelecioned: (type: string) => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const authContext = createContext<authContext>({} as authContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSignPage = 
  pathname === "/" 
  || pathname === "/signUp" 
  || pathname === "/reset";

  const [user, setUser] = useState({} as User);
  const [cookies, , removeCookies] = useCookies(["token"]);
  const [ loading, setIsLoading ] = useState(true);

  const [accountSelecioned, setAccountSelecioned] = useState(() => {
    const typeAccount = JSON.parse(localStorage.getItem("@type") as string);
    return typeAccount ? typeAccount : "tecnicos";
  });

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = cookies.token;

    if (!isSignPage) {
      api
        .get(`/${accountSelecioned}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch(logoutUser);
    }
  }, [pathname]);

  function logoutUser() {
    removeCookies("token");
    navigate("/");
  }

  return (
    <authContext.Provider
      value={{ user, logoutUser, accountSelecioned, setAccountSelecioned }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
