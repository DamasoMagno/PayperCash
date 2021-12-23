import { MdArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { Options } from "../../components/Filters/Options";
import { Field } from "../../components/Form/Field";
import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";
import { Status } from "../../components/StatusOcurrencies";

import { Container, Content } from "./styles";

export function Technician() {
  return (
    <Container>
      <SideBar />

      <Content>
        <h1>Damaso Magno</h1>

        <div className="userAbout">
          <Field label="Nome" value="Damaso Magno" />
          <Field label="E-mai" value="limamdamaso@gmail.com" />
          <Field label="Senha" value="hbaddt15623" type="password" />
        </div>

        <div className="historico">
          <div className="divisor">
            <h3>Histórico</h3>
            <span />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Options />
            <Status />
          </div>

          <Item
            title="Monitor não  estava amostrando o display  ligado"
            subtitle="Hoje de manhã, cheguei ao posto e notei que o monitor da sala de impressão não estava sando sinal de funcionamento."
            router="/ocurrency/pendent"
          />
        </div>
      </Content>
    </Container>
  );
}
