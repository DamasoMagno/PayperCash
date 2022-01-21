import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../../services/api";
import { useModals } from "../../contexts/modalsContext";
import { User } from "../../interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Item as Technician } from "../../components/Item";
import { CreateTechnicianModal } from "../../components/Modals/CreateTechnicianModal";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";
import { useAuth } from "../../contexts/authContext";
import { InputSearch } from "../../components/Form/InputSearch";
import { throwToastError } from "../../utils/toastify";
import { CircleSpinner } from "react-spinners-kit";
import { Loading } from "../../components/Loading";
import { useQuery } from "react-query";

type TechnicianInput = Omit<User, "id" | "endereco" | "perfil">;

export function Techinicians() {
  const { logoutUser } = useAuth();
  const { modalCreateTechcnianIsOpen, setModalCreateTechnicinIsOpen } = useModals();

  const [technicians, setTechnicians] = useState<User[]>([]);
  const [cookie] = useCookies(["token"]);

  useEffect(() => {
    api
      .get("/tecnicos/todos")
      .then((response) => setTechnicians(response.data))
      .catch(() => console.log("Está vndo aqui"));
  }, []);

  async function handleCreateNewTechnician(data: TechnicianInput) {
    try {
      const response = await api.post(
        "/tecnicos",
        { ...data },
        { headers: { Authorization: `Bearer ${cookie.token}` } }
      );
      setTechnicians([...technicians, response.data]);
    } catch (error) {
      throwToastError(error, logoutUser);
    }
  }

  return (
    <>
      <Container>
        <SideBar />
        <Content>
          <InputSearch title="Buscar Técnico" />

          <main>
            <div className="new">
              <h2>Técnicos</h2>
              <button onClick={() => setModalCreateTechnicinIsOpen(true)}>
                Adicionar
              </button>
            </div>

            {technicians?.map((technician) => (
              <Technician
                key={technician.id}
                router={`/technician/${technician.id}`}
                title={technician.nome}
                subtitle={technician.email}
              />
            ))}
          </main>
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
