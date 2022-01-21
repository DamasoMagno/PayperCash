import { useState } from "react";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Field } from "../../components/Form/Field";
import { Item } from "../../components/Item";
import { RemoveCallModal } from "../../components/Modals/RemoveCallModal";
import { SideBar } from "../../components/SideBar";
import { useModals } from "../../contexts/modalsContext";
import { api } from "../../services/api";
import { Ocurrency } from "../../interfaces";

import { Container, Content, Delete } from "./styles";

type Technician = {
  id: number;
  nome: string;
  email: string;
  ocorrencia: Ocurrency[];
};

export function Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setModalRemoveDataIsOpen } = useModals();
  const [category, setCategory] = useState<Technician>({} as Technician);

  useEffect(() => {
    api
      .get(`/categorias/${id}`)
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch(() => navigate("/categories"));
  }, []);

  return (
    <Container>
      <SideBar />

      <Content>
        {!!category ? (
          <>
            <h1>Informações da Categoria</h1>
            <section className="user">
              <Field label="Nome" value={category?.nome ?? "Carregando..."} />
              <Delete onClick={() => setModalRemoveDataIsOpen(true)}>
                <MdDeleteOutline size={18} />
                <p>Deletar</p>
              </Delete>
            </section>

            <section className="historicall">
              <div className="divisor">
                <h3>Histórico</h3>
                <span />
              </div>
              {category.ocorrencia?.map((ocurrency) => (
                <Item
                  key={ocurrency.id}
                  title={ocurrency.titulo}
                  router={`/ocurrency/${ocurrency.id}`}
                />
              ))}
            </section>
          </>
        ) : (
          <p>Carregando</p>
        )}
      </Content>
      <RemoveCallModal/>
    </Container>
  );
}
