import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { Ocurrency } from "../../interfaces";
import { api } from "../../services/api";

import { Field } from "../../components/Form/Field";
import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";

type Manager = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  ocorrencias: Ocurrency[];
};

export function Manager() {
  const { id } = useParams();
  const { logoutUser } = useAuth();

  const [manager, setManager] = useState<Manager>({} as Manager);

  useEffect(() => {
    api
      .get(`/gerentes/${id}`)
      .then((response) => setManager(response.data))
      .catch(logoutUser);
  }, []);

  return (
    <Container>
      <SideBar />

      <Content>
        <h1>Informações do Gerente</h1>
        <section className="user">
          <Field label="Nome" value={manager?.nome ?? "Damaso"} />
          <Field
            label="E-mai"
            value={manager?.email ?? "Carregando..."}
          />
          <Field
            label="Endereço"
            value={manager?.endereco ?? "Carregando..."}
          />
        </section>

        <section className="historicall">
          <div className="divisor">
            <h3>Histórico</h3>
            <span />
          </div>
          {manager.ocorrencias?.map((ocurrency) => (
            <Item
              key={ocurrency.id}
              title={ocurrency.titulo}
              router={`/ocurrency/${ocurrency.id}`}
            />
          ))}
        </section>
      </Content>
    </Container>
  );
}
