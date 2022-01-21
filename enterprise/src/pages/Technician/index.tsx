import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { FiDelete } from "react-icons/fi";
import { MdDelete, MdDeleteOutline, MdDeleteSweep } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Field } from "../../components/Form/Field";
import { Item } from "../../components/Item";
import { RemoveCallModal } from "../../components/Modals/RemoveCallModal";
import { SideBar } from "../../components/SideBar";
import { useModals } from "../../contexts/modalsContext";
import { Ocurrency } from "../../interfaces";
import { api } from "../../services/api";
import { throwToastError } from "../../utils/toastify";

import { Container, Content, Delete } from "./styles";

type Technician = {
  id: number;
  nome: string;
  email: string;
  ocorrencias: Ocurrency[];
};

export function Technician() {
  const { id } = useParams();

  const { setModalRemoveDataIsOpen } = useModals();
  const [technician, setTechnician] = useState<Technician>({} as Technician);

  useEffect(() => {
    api
      .get(`/tecnicos/${id}`)
      .then((response) => setTechnician(response.data))
      .catch(() => console.log("Está vndo aqui"));;
  }, []);

  return (
    <Container>
      <SideBar />

      <Content>
        <h1>Informações do Tecnico</h1>
        <section className="user">
          <Field label="Nome" value={technician?.nome ?? "Carregando..."} />
          <Field
            label="E-mail"
            value={technician?.email ?? "Carregando..."}
          />
          <Delete onClick={() => setModalRemoveDataIsOpen(true)}>
            <MdDeleteOutline size={18} />
            <p>Deletar</p>
          </Delete>
        </section>

        <section className="historicall">
          <div className="divisor">
            <h3>Histórico</h3>
            <span />
          </div>
          {technician.ocorrencias?.map((ocurrency) => (
            <Item 
              key={ocurrency.id}
              title={ocurrency.titulo}
              router={`/ocurrency/${ocurrency.id}`} />
          ))}
        </section>
      </Content>
      <RemoveCallModal />
    </Container>
  );
}
