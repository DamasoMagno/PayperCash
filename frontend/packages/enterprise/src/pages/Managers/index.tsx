import { MdPlace } from "react-icons/md";

import { OcurrencyManagerProfile } from "../../components/Modals/OcurrenceManagerProfie";
import { SideBar } from "../../components/SideBar";
import { useModals } from "../../contexts/globalContexts";
import { Filters } from "../../components/Filters";

import { Container, Card, Content } from "./styles";

import localizationImage from "../../assets/localization.png";

export function Managers() {
  const { setModalOcurrencyManagerIsOpen } = useModals();

  return (
    <Container>
      <SideBar />

      <Content>
        <Filters />

        <div className="cards">
          <Card onClick={() => setModalOcurrencyManagerIsOpen(true)}>
            <img src={localizationImage} alt="Localização do Gerente" />
            <div>
              <h3>Unidade Madalenas</h3>
              <div>
                <MdPlace color="#666360" size={10} />
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
