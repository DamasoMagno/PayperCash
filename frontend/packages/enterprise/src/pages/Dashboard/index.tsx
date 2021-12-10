import { AppRoutes } from "../../routes";

import { UserProfileModal } from "../../components/Modals/UserProfileModal";

import { Container } from "./styles";
import { SideBar } from "../../components/SideBar";

export function Dashboard(){
  return (
  <Container>
    <AppRoutes />
    <UserProfileModal/>
  </Container>
  );
}