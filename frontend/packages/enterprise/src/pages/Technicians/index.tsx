import { Item as Technician } from "../../components/Item";
import { Filters } from "../../components/Filters";
import { CreateTechnicianModal } from "../../components/Modals/CreateTechnicianModal";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";
import { useModals } from "../../contexts/globalContexts";

export function Techinicians() {
  const { modalCreateTechcnianIsOpen, setModalCreateTechnicinIsOpen } =
    useModals();

  return (
    <>
      <Container>
        <SideBar />
        <Content>
          <Filters>
            <button onClick={() => setModalCreateTechnicinIsOpen(true)}>Adicionar</button>
          </Filters>
          <Technician
            router="/technician/1"
            title="Damaso Magno"
            subtitle="damac@gmail.com"
          />
        </Content>
      </Container>

      <CreateTechnicianModal
        isOpen={modalCreateTechcnianIsOpen}
        onRequestClose={() => setModalCreateTechnicinIsOpen(false)}
      />
    </>
  );
}
