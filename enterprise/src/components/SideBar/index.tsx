import { FiLogOut } from "react-icons/fi";
import { useModals } from "../../contexts/modalsContext";

import { NavigationSection } from "./NavigationSection";

import { Container, User } from "./styles";

import { useAuth } from "../../contexts/authContext";
import { MdPeople } from "react-icons/md";

export function SideBar() {
  const { setModalEnterpriseIsOpen } = useModals();
  const { user, logoutUser } = useAuth();

  return (
    <Container>
      <User>
        <div>
          <button onClick={logoutUser}>
            <FiLogOut color="#FFF" size={20} />
          </button>
          <button onClick={() => setModalEnterpriseIsOpen(true)}>
            <MdPeople size={20} color="#FFF"/>
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
        {user.perfil === "EMPRESA" && (
          <>
            <NavigationSection router="/managers" title="Gerentes" />
            <NavigationSection router="/technicians" title="Tecnicos" />
            <NavigationSection router="/categories" title="Categorias" />
          </>
        )}
        <></>
      </nav>
    </Container>
  );
}
