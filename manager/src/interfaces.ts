export type Ocurrency = {
  id: number;
  titulo: string;
  resolucao: string;
  descricao: string;
  tipo_categoria: string;
  dataCriacao: string;
  status: "PENDENTE" | "CONCLUIDO";
};
