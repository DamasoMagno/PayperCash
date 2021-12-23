import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useModals, useUser } from "../../contexts/globalContexts";

import { NavigationSection } from "./NavigationSection";

import { Container, User } from "./styles";

import userProfileImage from "../../assets/profile.jpg";

export function SideBar() {
  const { setModalEnterpriseIsOpen } = useModals();
  const { typeOfAccount } = useUser();

  useEffect(() => {
    console.log(typeOfAccount);
  });

  return (
    <Container>
      <User>
        <Link to="/">
          <FiLogOut color="#FFF" size={20} />
        </Link>

        <div className="profile">
          <img
            src={userProfileImage}
            alt="User Image"
            onClick={() => setModalEnterpriseIsOpen(true)}
          />
          <span>Giordano</span>
        </div>
      </User>

      <nav>
        <NavigationSection router="/ocurrencies/finished" title="Concluídos" />
        <NavigationSection router="/ocurrencies/pendents" title="Pendentes" />
        {typeOfAccount === "" && (
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
