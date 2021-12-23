import { useState } from "react";
import { MdAdd } from "react-icons/md";

import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content, Historic, NewCategory } from "./styles";

export function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  function handleAddNewCategory() {
    setCategories([...categories, newCategory]);
  }

  return (
    <Container>
      <SideBar />

      <Content>
        <NewCategory>
          <div>
            <label>Nova Categoria</label>
            <input onChange={(e) => setNewCategory(e.target.value)} />
          </div>
          <button onClick={handleAddNewCategory}>
            <MdAdd color="#FFF" size={24} />
          </button>
        </NewCategory>

        <Historic>
          <h2>Categorias</h2>

          {categories.map((category) => (
            <Item
              key={category}
              title={category}
              router="/category"
              subtitle={`Ocorrencias: 40`}
            />
          ))}
        </Historic>
      </Content>
    </Container>
  );
}
