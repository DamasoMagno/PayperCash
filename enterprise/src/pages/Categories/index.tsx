import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import { Ocurrency } from "../../interfaces";
import { FiAlertTriangle } from "react-icons/fi";

import { throwToastError } from "../../utils/toastify";

import { Item as Category } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content, Historic, NewCategory } from "./styles";

type Category = {
  id: number;
  nome: string;
  ocorrencia: Ocurrency[];
};

export function Categories() {
  const { logoutUser } = useAuth();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    api.get<Category[]>("/categorias/todas")
      .then((res) => setCategories(res.data))
      .catch(logoutUser);
  }, []);

  async function handleCreateNewCategory() {
    try {
      const { data } = await api.post("/categorias", { nome: newCategory });
      setNewCategory("");
      setCategories([...categories, data]);
    } catch (error) {
      throwToastError(error, logoutUser);
    }
  }

  return (
    <Container>
      <SideBar />

      <Content>
        <NewCategory>
          <div className="input">
            <div>
              <input
                id="newCategory"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
              />
              <label htmlFor="newCategory">Nova Categoria</label>
            </div>
            <button onClick={handleCreateNewCategory}>Adicionar</button>
          </div>
        </NewCategory>

        <Historic>
          <h2>Categorias</h2>

          {categories.map((category) => (
            <Category
              key={category.id}
              title={category.nome}
              router={`/category/${category.id}`}
              icon={FiAlertTriangle}
              subtitle={category.ocorrencia?.length.toString() ?? 0}
            />
          ))}
        </Historic>
      </Content>
    </Container>
  );
}
