import { useEffect, useState } from "react";
import { MdPlace } from "react-icons/md";
import { api } from "../../services/api";

import { SideBar } from "../../components/SideBar";
import { Filters } from "../../components/Filters";

import { Container, Card, Content } from "./styles";

import localizationImage from "../../assets/localization.png";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../../contexts/authContext";

type Manager = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
};

export function Managers() {
  const { logoutUser } = useAuth();

  const [managers, setManagers] = useState<Manager[]>([]);
  const [cookie] = useCookies(["token"]);

  useEffect(() => {
    api
      .get("/empresas", { headers: { token: cookie.token } })
      .then((response) => setManagers(response.data.gerenteOcorrencias))
      .catch(logoutUser);
  }, []);

  return (
    <Container>
      <SideBar />

      <Content>
        <Filters />

        <div className="cards">
          {managers.map((manager) => (
            <Card key={manager.id} to={`/manager/${manager.id}`}>
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
