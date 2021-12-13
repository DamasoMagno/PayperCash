import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";

import { SideBar } from "../../components/SideBar";
import { InputSearch } from "../../components/Forms/InputSearch";

import { Container, Period, Filters, Ocurrency, Content } from "./styles";

import scheduleImage from "../../assets/schedule.png";
import showOcurrencyImage from "../../assets/showOcurrency.png";
import { api } from "../../services/api";

export function Home(){
  const [ ocurrenciesByPeriod, setOcurrenciesByPeriod ] = useState();

  useEffect(() => {
    api.get("/ocurrencies")
      .then(response => console.log(response));
  })

  return (
    <Container>
    <SideBar />
    <Content>
      <Filters>
        <div className="filter">
          <select>
            <option value="">TODOS</option>
          </select>
          < MdArrowDropDown color="#333" size={20}/>
        </div>
        <InputSearch title="Buscar ocorrência"/>
      </Filters>

      <main>
        <Period>
          <h3>Hoje</h3>
          <Ocurrency>
            <div className="scheduleCall">
              <img src={ scheduleImage } alt="Horário da chamada" />
              <span>8:30</span>
            </div>

            <Link className="title" to={`/ocurrency/1`}>
              <p>O servidor da sala gerencias está inativado</p>
              <img src={showOcurrencyImage} alt="Ir para a ocorrência"/>
            </Link>
          </Ocurrency>
        </Period>
      </main>
    
    </Content>
    </Container>
  );
}
