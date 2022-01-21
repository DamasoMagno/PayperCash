export type Ocurrency = {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  resolucao: string;
  tecnico: string;
  gerente: string;
  endereco: string;
  tipo_categoria: string;
  status: "PENDENTE" | "CONCLUIDO";
}

export type User = {
  id: number;
  email: string;
  nome: string;
  senha: string;
  endereco?: string;
  ocorrencias: Ocurrency[];
  perfil: "EMPRESA" | "TECNICO";
};

export type ErrorAxios = {
  response: {
    data: string;
    status: number;
  };
}