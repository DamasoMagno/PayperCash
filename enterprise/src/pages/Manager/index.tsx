import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

import { Options } from "../../components/Filters/Options";
import { Field } from "../../components/Form/Field";
import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content, Status } from "./styles";

type Manager = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  ocorrencias: Array<{
    id: number;
    titulo: string;
    resolucao: string;
  }>;

}

export function Manager() {
  const { id } = useParams();

  const [ manager, setManager ] = useState<Manager>({} as Manager);

  useEffect(() => {
    api.get(`/gerente/${id}`)
      .then(response => setManager(response.data));
  }, []);
  
  return (
    <Container>
      <SideBar />

      <Content>
        <h1>Tecnico</h1>
        <section className="user">
          <Field label="Nome" value={manager.nome} canEdit />
          <Field label="E-mai" value={manager.email} canEdit/>
          <Field label="Endereço" value={manager.endereco} canEdit/>
        </section>

        <section className="historicall">
          <div className="divisor">
            <h3>Histórico</h3>
            <span />
          </div>
          <div className="resume">
            <Options />
            <div>
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
            </div>
          </div>
          { manager.ocorrencias?.map(ocurrency => (
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
