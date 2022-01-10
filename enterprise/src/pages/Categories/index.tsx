import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import { Ocurrency } from "../../interfaces";

import { showError } from "../../utils/showError";

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
  const [error, setError] = useState("");

  useEffect(() => {
    api.get<Category[]>("/categorias")
      .then((res) => setCategories(res.data));
  }, []);

  async function handleCreateNewCategory() {
    if (!newCategory) return setError("Campo obrigatório");
    try {
      const { data } = await api.post("/categorias", { nome: newCategory });
      setCategories([...categories, data]);
    } catch (error) {
      showError(error, logoutUser);
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
                onChange={(e) => {
                  setError("");
                  setNewCategory(e.target.value);
                }}
              />
              <label htmlFor="newCategory">Nova Categoria</label>
            </div>
            <button onClick={handleCreateNewCategory}>
              <MdAdd color="#FFF" size={24} />
            </button>
          </div>
          {error && <p>{error}</p>}
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
