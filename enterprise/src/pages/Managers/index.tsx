import { useEffect, useState } from "react";
import { MdPlace } from "react-icons/md";
import { api } from "../../services/api";

import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";

import { useAuth } from "../../contexts/authContext";
import { InputSearch } from "../../components/Form/InputSearch";
import { Item } from "../../components/Item";

type Manager = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
};

export function Managers() {
  const { logoutUser } = useAuth();

  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    api
      .get("/gerentes/todos")
      .then((response) => setManagers(response.data))
      .catch(logoutUser);
  }, []);

  return (
    <Container>
      <SideBar />

      <Content>
        <InputSearch title="Procurar Gerente" />

        <div className="cards">
          <h2>Gerentes</h2>

          {managers.map((manager) => (
            <Item
              key={manager.id}
              title={manager.nome}
              subtitle={manager.endereco}
              icon={MdPlace}
              router={`/manager/${manager.id}`}
            />
          ))}
        </div>
      </Content>
    </Container>
  );
}
