import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useModals } from "../../contexts/modalsContext";

import { Container, User } from "./styles";

import userProfileImage from "../../assets/profile.jpg";

export function SideBar(){
  const { onSetModalEnterpriseIsOpen } = useModals();
  const { pathname } = useLocation();

  return (
    <Container>
      <User>
        <button>
          <FiLogOut color="#FFF" size={20}/>
        </button>

        <div className="profile">
          <img src={userProfileImage} alt="User Image" onClick={() => onSetModalEnterpriseIsOpen(true)}/>
          <span>Giordano</span>
        </div>
      </User>

      <nav>
        <li className={ pathname === "/finished" ? "active" : ""}>
          <Link to="/finished">Conluídos</Link>
        </li>

        <li className={ pathname === "/" ? "active" : ""}>
          <Link to="/">Pendentes</Link>
        </li>

        <li className={ pathname === "/ocurrencyManagers" ? "active" : ""}>
          <Link to="/ocurrencyManagers">Gerentes</Link>
        </li>
      </nav>
    </Container>
  );
}