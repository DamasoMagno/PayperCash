import { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useModals } from "../../contexts/modalsContext";
import { useAuth } from "../../contexts/authContext";

import { NavigationSection } from "./NavigationSection";

import { Container, User } from "./styles";


export function SideBar() {
  const { setModalEnterpriseIsOpen } = useModals();
  const { user, logoutUser } = useAuth();

  const [ accountSelecioned, setAccountSelecioned ] = useState(() => {
    const typeAccount = JSON.parse(localStorage.getItem("@type") as string);
    return typeAccount ? typeAccount : "tecnicos";
  });

  return (
    <Container>
      <User>
        <div>
          <button onClick={logoutUser}>
            <FiLogOut color="#FFF" size={20} />
          </button>
          <button onClick={() => setModalEnterpriseIsOpen(true)}>
            <FiUser size={20} color="#FFF"/>
          </button>
        </div>

        <div className="profile">
          <p>{user.nome?.slice(0, 10) ?? "Giordano"}</p>
          <span>{user.email ?? "paypercash@gmail.com"}</span>
        </div>
      </User>

      <nav>
        <NavigationSection router="/ocurrencies/finished" title="Concluídos" />
        <NavigationSection router="/ocurrencies/pendents" title="Pendentes" />
        {accountSelecioned === "empresas" && (
          <>
            <NavigationSection router="/managers" title="Gerentes" />
            <NavigationSection router="/technicians" title="Tecnicos" />
            <NavigationSection router="/categories" title="Categorias" />
          </>
        )}
      </nav>
    </Container>
  );
}
