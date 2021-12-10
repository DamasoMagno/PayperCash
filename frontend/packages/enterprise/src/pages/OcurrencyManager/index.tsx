import { MdPlace } from "react-icons/md";
import { OcurrencyManagerProfile } from "../../components/Modals/OcurrenceManagerProfie";

import { InputSearch } from "../../components/Forms/InputSearch";

import { Container, Card } from "./styles";

import localizationImage from "../../assets/localization.png";
import { useModals } from "../../contexts/modalsContext";

export function OcurrencyManager(){;
  const { onSetModalOcurrencyManagerIsOpen } = useModals()

  return (
    <Container>
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
    </Container>
  );
}