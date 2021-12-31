import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { api } from "../../services/api";

import { Item as Category } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content, Historic, NewCategory } from "./styles";

type Category = {
  id: number;
  nome: string;
  ocorrencia: Array<{}>;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    api.get("/categories")
      .then(response => setCategories(response.data));
  }, []);

  async function handleCreateNewCategory(){
    const { data } = await api.post('/categories', { id: Math.random(), nome: newCategory });
    setCategories([...categories, data]);
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
          <button onClick={handleCreateNewCategory}>
            <MdAdd color="#FFF" size={24} />
          </button>
        </NewCategory>

        <Historic>
          <h2>Categorias</h2>

          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.nome}
              router={`/category/${category.id}`}
              subtitle={`Ocorrencias: ${category.ocorrencia?.length ?? 0}`}
            />
          ))}
        </Historic>
      </Content>
    </Container>
  );
}
