import { MdPlace } from "react-icons/md";

import { OcurrencyManagerProfile } from "../../components/Modals/OcurrenceManagerProfie";
import { InputSearch } from "../../components/Forms/InputSearch";
import { SideBar } from "../../components/SideBar";
import { useModals } from "../../contexts/modalsContext";

import { Container, Card, Content } from "./styles";

import localizationImage from "../../assets/localization.png";
import { useEffect } from "react";
import { api } from "../../services/api";

export function OcurrencyManager(){;
  const { onSetModalOcurrencyManagerIsOpen } = useModals();

  useEffect(() => {
    api.get("/ocurrencies")
      .then(response => console.log(response));
  });

  return (
    <Container>
    <SideBar />
    <Content>
      <InputSearch title="Buscar Gerente"/>

      <div className="cards">
        <Card onClick={() => onSetModalOcurrencyManagerIsOpen(true)}>
          <img src={localizationImage} alt="" />
          <div>
            <h3>Unidade Madalenas</h3>
            <div>
              <MdPlace color="#666360" size={10}/>
              <p>Rua Ana Luíza Braga, 1881</p>
            </div>
          </div>
        </Card>

        <Card>
          <img src={localizationImage} alt="" />
          <div>
            <h3>Unidade Madalenas</h3>
            <div>
              <MdPlace color="#666360" size={10}/>
              <p>Rua Ana Luíza Braga, 1881</p>
            </div>
          </div>
        </Card>

        <Card>
          <img src={localizationImage} alt="" />
          <div>
            <h3>Unidade Madalenas</h3>
            <div>
              <MdPlace color="#666360" size={10}/>
              <p>Rua Ana Luíza Braga, 1881</p>
            </div>
          </div>
        </Card>
        <Card>
          <img src={localizationImage} alt="" />
          <div>
            <h3>Unidade Madalenas</h3>
            <div>
              <MdPlace color="#666360" size={10}/>
              <p>Rua Ana Luíza Braga, 1881</p>
            </div>
          </div>
        </Card>

        <Card>
          <img src={localizationImage} alt="" />
          <div>
            <h3>Unidade Madalenas</h3>
            <div>
              <MdPlace color="#666360" size={10}/>
              <p>Rua Ana Luíza Braga, 1881</p>
            </div>
          </div>
        </Card>
      </div>

      <OcurrencyManagerProfile />
    </Content>
    </Container>
  );
}