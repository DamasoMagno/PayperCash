export type Ocurrency = {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  resolucao: string;
  tipo_categoria: string;
  status: "PENDENTE" | "CONCLUIDO";
}

export type User = {
  id: number;
  email: string;
  nome: string;
  senha: string;
  endereco?: string;
  perfil: "EMPRESA" | "TECNICO";
};

export type ErrorAxios = {
  response: {
    data: string;
    status: number;
  };
}