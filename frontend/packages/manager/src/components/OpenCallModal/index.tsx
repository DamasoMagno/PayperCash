import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";

import { useModal } from "../../hooks/useOcurrencies";
import { api } from "../../services/api";

import { Container, Field } from "./styles";

type Ocurrency = {
  titulo: string;
  descricao: string;
};

export function OpenCallModal() {
  const { modalOpenCallIsOpen, setModalOpenCallIsOpen } = useModal();
  const { register, handleSubmit } = useForm<Ocurrency>();

  const [ hasContent, setHasContent ] = useState(false);

  async function handleCreateNewOcurrency(data: Ocurrency){
    const id = localStorage.getItem("@Id");
    try {
      const response = await api.post(`/ocurrencies/${id}`, { ...data, id: Math.random() ,data_criacao: "2020-10-10" });
      console.log(response);
    } catch (error) {
      if(error instanceof Error)
        console.log(error);
    }
  }

  return (
    <ReactModal
      isOpen={modalOpenCallIsOpen}
      onRequestClose={() => setModalOpenCallIsOpen(!modalOpenCallIsOpen)}
      overlayClassName="modalOverlay"
      className="modalContent"
    >
      <Container onSubmit={handleSubmit(handleCreateNewOcurrency)}>
        <h2>Cadastrar Ocorrência</h2>

        <div className="aboutOcurrency">
          <Field>
            <input
              id="title"
              placeholder=" "
              {...register("titulo")}
              maxLength={80}
            />
            <label htmlFor="time">Título</label>
          </Field>
          <Field>
            <textarea
              id="description"
              placeholder=" "
              {...register("descricao")}
            />
            <label htmlFor="description">Descrição </label>
          </Field>
        </div>

        <div className="buttons">
          <button
            onClick={() => setModalOpenCallIsOpen(!modalOpenCallIsOpen)}
            className="cancel"
          >
            Fechar
          </button>
          {!hasContent && (
            <button type="submit" className="sendOrEdit">
              Enviar
            </button>
          )}
        </div>
      </Container>
    </ReactModal>
  );
}
