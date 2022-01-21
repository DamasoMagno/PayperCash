export type Ocurrency = {
  id: number;
  titulo: string;
  resolucao: string;
  descricao: string;
  gerente: string;
  tecnico: string;
  tipo_categoria: string;
  endereco: string;
  dataCriacao: string;
  status: "PENDENTE" | "CONCLUIDO";
};

export type ErrorAxios = {
  response: {
    data: string;
    status: number;
  }
};