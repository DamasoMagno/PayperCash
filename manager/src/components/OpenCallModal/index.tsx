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

  return (
    <ReactModal
      isOpen={modalOpenCallIsOpen}
      onRequestClose={() => setModalOpenCallIsOpen(!modalOpenCallIsOpen)}
      overlayClassName="modalOverlay"
      className="modalContent"
    >
      <Container>
        <h2>Cadastrar Ocorrência</h2>

        <div>
          <div className="resume">
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
              <select id="category">
                <option value="">Vírus</option>
              </select>
              <label htmlFor="category">Categoria</label>
            </Field>
          </div>

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
          <button type="submit" className="sendOrEdit">
            Enviar
          </button>
        </div>
      </Container>
    </ReactModal>
  );
}
