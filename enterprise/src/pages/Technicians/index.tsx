import { Item as Technician } from "../../components/Item";
import { Filters } from "../../components/Filters";
import { CreateTechnicianModal } from "../../components/Modals/CreateTechnicianModal";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";
import { useModals } from "../../contexts/globalContexts";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

type Technicians = {
  id: number;
  nome: string;
  email: string;
}

export function Techinicians() {
  const { modalCreateTechcnianIsOpen, setModalCreateTechnicinIsOpen } = useModals();

  const [ technicians, setTechnicians ] = useState<Technicians[]>([]);

  useEffect(() => {
    api.get("/enterprises/1")
      .then(response => setTechnicians(response.data.tecnicos));
  }, []);

  return (
    <>
      <Container>
        <SideBar />
        <Content>
          <Filters>
            <button onClick={() => setModalCreateTechnicinIsOpen(true)}>Adicionar</button>
          </Filters>
          { technicians.map( technician => (
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
      />
    </>
  );
}
