import { Field } from "components/Form/Field";
import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";

export function Category() {
  return (
    <Container>
      <SideBar />

      <Content>
        <header>
          <h3>Vírus</h3>
        </header>

        <Item 
          title="awd" 
          subtitle="awd" 
          router="/ocurrency/1"
        />
      </Content>
    </Container>
  );
}
