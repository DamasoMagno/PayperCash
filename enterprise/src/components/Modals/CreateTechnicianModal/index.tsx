import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { User } from "../../../interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container } from "./styles";
// import { showError } from "../../../utils/showError";
import { Input } from "../../Form/Input";
import { throwToastError } from "../../../utils/toastify";

type TechnicianInput = Omit<User, "id">;

type TechnicianModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateNewTechnician(data: TechnicianInput): Promise<void>;
};

const schemaValidation = yup
  .object({
    nome: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    senha: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Tamanho minimo  6 letras"),
  })
  .required();

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
      throwToastError(error);
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
        <Input
          placeholder="Nome"
          register={() => register("nome")}
          error={errors.nome}
        />
        <Input
          placeholder="Email"
          register={() => register("email")}
          error={errors.email}
        />
        <Input
          placeholder="Senha"
          isPassword
          register={() => register("senha")}
          error={errors.senha}
        />
        <div className="buttons">
          <button type="button" onClick={onRequestClose} className="cancel">
            Cancelar
          </button>
          <button className="create">Cadastrar</button>
        </div>
      </Container>
    </ReactModal>
  );
}
