import { MdEdit } from "react-icons/md";
import { Options } from "../../components/Filters/Options";
import { Field } from "../../components/Form/Field";
import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content, Status } from "./styles";

export function Technician() {
  return (
    <Container>
      <SideBar />

      <Content>
        <h1>Tecnico</h1>
        <section className="user">
          <Field label="Nome" value="Damaso Magno" canEdit />
          <Field label="E-mai" value="limamdamaso@gmail.com" canEdit/>
          <Field label="Senha" value="hbaddt15623" type="password" canEdit/>
        </section>

        <section className="historicall">
          <div className="divisor">
            <h3>Histórico</h3>
            <span />
          </div>
          <div className="resume">
            <Options />
            <div>
              <Status className="finished">
                <p>Concluidos</p>
                <span />
                <p>01</p>
              </Status>
              <Status className="pendents">
                <p>Pendentes</p>
                <span />
                <p>0</p>
              </Status>
            </div>
          </div>
          <Item
            title="Monitor não  estava amostrando o display  ligado"
            router="/ocurrency/pendent"
          />
        </section>
      </Content>
    </Container>
  );
}
