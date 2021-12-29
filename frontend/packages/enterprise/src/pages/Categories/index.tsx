import { useState } from "react";
import { MdAdd } from "react-icons/md";

import { Item as Category } from "../../components/Item";
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
            <label htmlFor="newCategory">Nova Categoria</label>
            <input
              id="newCategory"
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <button onClick={handleAddNewCategory}>
            <MdAdd color="#FFF" size={24} />
          </button>
        </NewCategory>

        <Historic>
          <h2>Categorias</h2>

          {categories.map((category) => (
            <Category
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
