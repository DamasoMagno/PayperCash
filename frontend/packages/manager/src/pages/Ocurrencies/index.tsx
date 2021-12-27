import { Link } from "react-router-dom";
import { MdArrowRight, MdPeople } from "react-icons/md";

import { OpenCallModal } from "../../components/OpenCallModal";
import { Header } from "../../components/Header";
import { useModal } from "../../hooks/useModal";

import {
  Content,
  Buttons,
  HistoricCalls,
  Ocurrency,
  RecentCall,
} from "./styles";

import horarioImage from "../../assets/horario.png";
import accountImage from "../../assets/account.png";
import callImage from "../../assets/call.png";

export function Home() {
  const { setModalOpenCallIsOpen } = useModal();

  const ocurrencies = [
    { id: 1, hour: "8:30", title: "Notebook não está ligando", period: "Hoje" },
    {
      id: 2,
      hour: "10:25",
      title: "Servidor, está bloqueando o acesso aos sites",
      period: "Ontem",
    },
    { id: 3, hour: "9:30", title: "Tal problema", period: "Hoje" },
  ];

  const ocurrenciesByPeriod: any = [];

  for (const ocurrency of ocurrencies) {
    const index = ocurrenciesByPeriod[ocurrency.period];
    if (!index) {
      ocurrenciesByPeriod[ocurrency.period] = [];
    }
    ocurrenciesByPeriod[ocurrency.period].push(ocurrency);
  }

  return (
    <>
      <Header>
        <Buttons>
          <button onClick={() => setModalOpenCallIsOpen(true)}>
            <img src={callImage} alt="Abrir Chamado" /> Abrir Chamado
          </button>
          <Link to="/account">
            <MdPeople size={24} color="#000"/> Conta
          </Link>
        </Buttons>
      </Header>

      <Content>
        <RecentCall>
          <header>
            <p>Chamado Recente</p>
          </header>
          <div onClick={() => setModalOpenCallIsOpen(true)}>
            <strong> Notebook não está ligando </strong>
            <MdArrowRight />
          </div>
        </RecentCall>

        <HistoricCalls>
          {Object.keys(ocurrenciesByPeriod).map((ocurrency: any) => (
            <div className="period" key={ocurrency.id}>
              <p>{ocurrency}</p>
              {ocurrenciesByPeriod[ocurrency].map((ocurrency: any) => (
                <Ocurrency key={ocurrency.title}>
                  <div className="scheduleCall">
                    <img src={horarioImage} alt="Horário da Chamada" />
                    <span>{ocurrency.hour}</span>
                  </div>

                  <div
                    className="titleCall"
                    onClick={() => setModalOpenCallIsOpen(true)}
                  >
                    <p>{ocurrency.title}</p>
                    <MdArrowRight color="#FFF" />
                  </div>
                </Ocurrency>
              ))}
            </div>
          ))}
        </HistoricCalls>
      </Content>
      <OpenCallModal />
    </>
  );
}
