import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";

export function Category() {
  return (
    <Container>
      <SideBar />

      <Content>
        <h3>Vírus</h3>

        <Item 
          title="awd" 
          subtitle="awd" 
          router="/ocurrency/1"
        />
      </Content>
    </Container>
  );
}
