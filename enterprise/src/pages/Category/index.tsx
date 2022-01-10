import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ocurrency } from "../../interfaces";
import { api } from "../../services/api";

import { Item } from "../../components/Item";
import { SideBar } from "../../components/SideBar";

import { Container, Content } from "./styles";
import { MdDelete } from "react-icons/md";

type Category = {
  id: number;
  nome: string;
  ocorrencia: Ocurrency[];  
}

export function Category() {
  const { id } = useParams();

  const [ category, setCategory ] = useState<Category>();

  useEffect(() => {
    api.get(`/categorias/${id}`)
      .then(response => setCategory(response.data));
  }, []);

  async function handleRemoveCategory(){
    const response = await api.delete(`/categories/${id}`);
    console.log(response);
  }

  return (
    <Container>
      <SideBar />

      <Content>
        <header>
          <h3>{category?.nome}</h3>
          <button onClick={handleRemoveCategory}>
            <MdDelete />
          </button>
        </header>

        { category?.ocorrencia.map((ocorrencia: Ocurrency) => (
          <Item 
            title={ocorrencia.titulo} 
            subtitle={ocorrencia.descricao.length > 50 ? ocorrencia.descricao.slice(0, 20) + '...' : ocorrencia.descricao} 
            router={`/ocurrency/${ocorrencia.id}`}
          />
        )) }
      </Content>
    </Container>
  );
}
