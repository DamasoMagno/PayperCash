import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useOcurrencies";
import { Ocurrency } from "../../interfaces";
import { api } from "../../services/api";
import { throwToast } from "../../utils/Toastify";
import ReactModal from "react-modal";

import { Container, Field } from "./styles";

type OcurrencyInput = Pick<Ocurrency, "id" | "tipo_categoria" | "titulo" | "descricao">;

type Category = {
  id: number;
  nome: string;
};

export type Error = {
  response: {
    data: string;
    status: number;
  }
};

interface AppProps {
  onCreateNewOcurrency: (data: OcurrencyInput) => Promise<void>;
}

export function OpenCallModal({ onCreateNewOcurrency }: AppProps) {
  const navigate = useNavigate();
  const { modalOpenCallIsOpen, setModalOpenCallIsOpen } = useModal();
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const { register, handleSubmit } = useForm<Ocurrency>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [maxCharacters, setMaxCharacters] = useState(0);

  useEffect(() => {
    api
      .get<Category[]>("/categorias")
      .then((response) => setCategories(response.data));
  }, [modalOpenCallIsOpen]);

  async function handleCreateNewOcurrenty(data: Ocurrency) {
    try {
      await onCreateNewOcurrency(data);
      throwToast({
        message: "Cadastro de ocorrenicia, realizada com sucesso",
        type: "success",
      });

      setMaxCharacters(0);
      setModalOpenCallIsOpen(false);
    } catch (error) {
      const signError = error as Error;
      switch (signError.response.status) {
        case 401:
          navigate("/");
          break;
        case 404:
          throwToast({
            message: "Cadastro de ocorrenicia, realizada com sucesso",
            type: "success",
          });
          break;
        default:
          console.log("Nenhum desses");
      }
    }
  }

  function handleCloseModal() {
    setModalOpenCallIsOpen(!modalOpenCallIsOpen);
    setMaxCharacters(0);
  }

  return (
    <ReactModal
      isOpen={modalOpenCallIsOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="modalOverlay"
      className="modalContent"
    >
      <Container onSubmit={handleSubmit(handleCreateNewOcurrenty)}>
        <h2>Cadastrar Ocorrência</h2>

        <div>
          <div className="resume">
            <Field>
              <input
                id="title"
                placeholder=" "
                {...register("titulo", { required: "Titulo obrigatorio" })}
                maxLength={40}
                onChange={() =>
                  setMaxCharacters(
                    inputRef.current?.maxLength - inputRef.current.value.length
                  )
                }
                ref={inputRef}
              />
              <label htmlFor="time">Título</label>
              <p>
                {maxCharacters} / {inputRef.current?.maxLength ?? 40}
              </p>
            </Field>

            <Field>
              <select
                id="category"
                {...register("tipo_categoria", {
                  required: "Descrição obrigatória",
                })}
              >
                {categories.map((category) => (
                  <option value={category.nome} key={category.id}>
                    {category.nome}
                  </option>
                ))}
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
          <button onClick={handleCloseModal} className="cancel">
            Fechar
          </button>
          <button className="sendOrEdit" type="submit">Enviar</button>
        </div>
      </Container>
    </ReactModal>
  );
}
