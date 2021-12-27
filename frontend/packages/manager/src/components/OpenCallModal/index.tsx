import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";

import { useModal } from "../../hooks/useModal";

import { Container, Field } from "./styles";

type Ocurrency = {
  title: string;
  description: string;
};

export function OpenCallModal() {
  const { modalOpenCallIsOpen, setModalOpenCallIsOpen } = useModal();
  const { register, watch } = useForm<Ocurrency>();

  const [ hasContent, setHasContent ] = useState(false);

  return (
    <ReactModal
      isOpen={modalOpenCallIsOpen}
      onRequestClose={() => setModalOpenCallIsOpen(!modalOpenCallIsOpen)}
      overlayClassName="modalOverlay"
      className="modalContent"
    >
      <Container>
        <h2>Cadastrar Ocorrência</h2>

        <div className="aboutOcurrency">
          <Field>
            <input
              id="title"
              placeholder=" "
              {...register("title")}
              maxLength={80}
            />
            <label htmlFor="time">Título</label>
          </Field>
          <Field>
            <textarea
              id="description"
              placeholder=" "
              {...register("description")}
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
