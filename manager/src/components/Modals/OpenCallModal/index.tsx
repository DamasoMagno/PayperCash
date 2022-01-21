import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../contexts/modalContext";
import { Ocurrency } from "../../../interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactModal from "react-modal";

import { Container, Field } from "./styles";
import { api } from "../../../services/api";
import {
  throwToastError,
  throwToastSucess,
} from "../../../utils/toastifyMessages";

type OcurrencyInput = Pick<
  Ocurrency,
  "id" | "tipo_categoria" | "titulo" | "descricao"
>;

type Category = {
  id: number;
  nome: string;
};

export type Error = {
  response: {
    data: string;
    status: number;
  };
};

interface AppProps {
  onCreateNewOcurrency: (data: OcurrencyInput) => Promise<void>;
}

const schemaValidator = yup
  .object({
    titulo: yup.string().required("Título Obrigatório").max(50),
    descricao: yup.string().required("Descrição Obrigatória"),
  })
  .required();

export function OpenCallModal({ onCreateNewOcurrency }: AppProps) {
  const navigate = useNavigate();
  const { modalOpenCallIsOpen, setModalOpenCallIsOpen } = useModal();
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ocurrency>({
    resolver: yupResolver(schemaValidator),
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api
      .get<Category[]>("/categorias/todas")
      .then((response) => setCategories(response.data));
  }, [modalOpenCallIsOpen]);

  async function handleCreateNewOcurrenty(data: Ocurrency) {
    try {
      await onCreateNewOcurrency(data);
      throwToastSucess("Cadastro de ocorrenicia, realizada com sucesso");
      setModalOpenCallIsOpen(false);
    } catch (error) {
      throwToastError(error);
    }
  }

  return (
    <ReactModal
      isOpen={modalOpenCallIsOpen}
      onRequestClose={() => setModalOpenCallIsOpen(!modalOpenCallIsOpen)}
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
                {...register("titulo")}
              />
              <label htmlFor="title">Título</label>
            </Field>

            <Field>
              <select id="category" {...register("tipo_categoria")}>
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
          <button
            type="button"
            onClick={() => setModalOpenCallIsOpen(!modalOpenCallIsOpen)}
            className="cancel"
          >
            Fechar
          </button>
          <button className="sendOrEdit">Enviar</button>
        </div>
      </Container>
    </ReactModal>
  );
}
