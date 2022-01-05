import { useEffect, useState } from "react";
import { MdPlace } from "react-icons/md";
import { api } from "../../services/api";

import { SideBar } from "../../components/SideBar";
import { Filters } from "../../components/Filters";

import { Container, Card, Content } from "./styles";

import localizationImage from "../../assets/localization.png";

type Manager = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
}

export function Managers() {
  const [ managers, setManagers ] = useState<Manager[]>([]);

  useEffect(() => {
    api.get("/enterprises/1")
      .then(response => setManagers(response.data.gerenteOcorrencias));
  }, []);

  return (
    <Container>
      <SideBar />

      <Content>
        <Filters />

        <div className="cards">
          { managers.map( manager => (
            <Card>
            <img src={localizationImage} alt="Localização do Gerente" />
            <div>
              <h3>{manager.nome}</h3>
              <div>
                <MdPlace color="#666360" size={10} />
                <p>{manager.endereco}</p>
              </div>
            </div>
          </Card>
          ))}
        </div>
      </Content>
    </Container>
  );
}
