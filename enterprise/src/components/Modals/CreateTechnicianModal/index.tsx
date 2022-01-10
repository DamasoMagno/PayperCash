import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { User } from "../../../interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container } from "./styles";

type TechnicianInput = Omit<User, "id">;

type TechnicianModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateNewTechnician(data: TechnicianInput): Promise<void>;
};

const schemaValidation = yup
  .object({
    nome: yup
      .string()
      .required("Nome obrigatório"),
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Email inválido"),
    senha: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Tamanho minimo  6 letras"),
}).required();

export function CreateTechnicianModal({
  isOpen,
  onRequestClose,
  onCreateNewTechnician,
}: TechnicianModalProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TechnicianInput>({
    resolver: yupResolver(schemaValidation),
  });

  async function handleCreateUser(data: TechnicianInput) {
    try {
      await onCreateNewTechnician(data);
      onRequestClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modalOverlay"
      className="modalContent"
    >
      <Container onSubmit={handleSubmit(handleCreateUser)}>
        <h2>Cadastrar Tecnico</h2>
        <div className="input">
          <label htmlFor="inputNome">Nome</label>
          <input id="inputNome" {...register("nome")} />
          {errors.nome?.message && <p>{errors.nome?.message}</p>}
        </div>
        <div className="input">
          <label htmlFor="inputEmail">Email</label>
          <input id="inputEmail" type="email" {...register("email")} />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>
        <div className="input">
          <label htmlFor="inputPassword">Senha</label>
          <input id="inputPassword" type="password" {...register("senha")} />
          {errors.senha?.message && <p>{errors.senha?.message}</p>}
        </div>
        <div className="buttons">
          <button type="button" onClick={onRequestClose}>
            Cancelar
          </button>
          <button className="create">Cadastrar</button>
        </div>
      </Container>
    </ReactModal>
  );
}
