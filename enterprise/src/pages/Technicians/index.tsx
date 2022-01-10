import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../../services/api";
import { useModals } from "../../contexts/modalsContext";
import { User } from "../../interfaces";

import { Item as Technician } from "../../components/Item";
import { Filters } from "../../components/Filters";
import { CreateTechnicianModal } from "../../components/Modals/CreateTechnicianModal";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";
import { useAuth } from "../../contexts/authContext";
import { showError } from "../../utils/showError";

type TechnicianInput = Omit<User, "id" | "endereco" | "perfil">;

export function Techinicians() {
  const { logoutUser } = useAuth();
  const { modalCreateTechcnianIsOpen, setModalCreateTechnicinIsOpen } =
    useModals();

  const [technicians, setTechnicians] = useState<User[]>([]);
  const [cookie] = useCookies(["token"]);

  useEffect(() => {
    api
      .get("/empresas", { headers: { token: cookie.token } })
      .then((response) => setTechnicians(response.data.tecnicos))
      .catch(logoutUser);
  }, []);

  async function handleCreateNewTechnician(data: TechnicianInput) {
    try {
      const response = await api.post(
        "/tecnicos",
        { ...data },
        { headers: { token: cookie.token } }
      );
      setTechnicians([...technicians, response.data]);
    } catch (error) {
      showError(error, logoutUser);
    }
  }

  return (
    <>
      <Container>
        <SideBar />
        <Content>
          <Filters>
            <button onClick={() => setModalCreateTechnicinIsOpen(true)}>
              Adicionar
            </button>
          </Filters>
          {technicians.map((technician) => (
            <Technician
              key={technician.id}
              router={`/technician/${technician.id}`}
              title={technician.nome}
              subtitle={technician.email}
            />
          ))}
        </Content>
      </Container>

      <CreateTechnicianModal
        isOpen={modalCreateTechcnianIsOpen}
        onRequestClose={() => setModalCreateTechnicinIsOpen(false)}
        onCreateNewTechnician={handleCreateNewTechnician}
      />
    </>
  );
}
