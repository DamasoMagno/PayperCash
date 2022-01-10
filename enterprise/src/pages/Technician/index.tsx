import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Options } from "../../components/Filters/Options";
import { Field } from "../../components/Form/Field";
import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";

import { Container, Content, Status } from "./styles";

type Technician = {
  id: number;
  nome: string;
  email: string;
  ocorrencias: Array<{
    id: number;
    titulo: string;
    resolucao: string;
  }>;

}

export function Technician() {
  const { id } = useParams();

  const [ technician, setTechnician ] = useState<Technician>({} as Technician);
  const [ cookie ] = useCookies(["token"]);

  useEffect(() => {
    api.get(`/technicians`, { headers: { token: cookie.token } })
      .then(response => setTechnician(response.data))
  }, []);

  console.log(technician);
  
  return (
    <Container>
      <SideBar />

      <Content>
        <h1>Tecnico</h1>
        <section className="user">
          <Field label="Nome" value={technician.nome} canEdit />
          <Field label="E-mai" value={technician.email} canEdit/>
          <Field label="Senha" value="hbaddt15623" type="password" canEdit/>
        </section>

        <section className="historicall">
          <div className="divisor">
            <h3>Histórico</h3>
            <span />
          </div>
          <div className="resume">
            <Options />
            {/* <div>
              <Status className="finished">
                <p>Concluidos</p>
                <span />
                <p>01</p>
              </Status>
              <Status className="pendents">
                <p>Pendentes</p>
                <span />
                <p>0</p>
              </Status>
            </div> */}
          </div>
          { technician.ocorrencias?.map(ocurrency => (
            <Item
              title={ocurrency.titulo}
              router={`/ocurrency/${ocurrency.id}`}
            />
          )) }
        </section>
      </Content>
    </Container>
  );
}
