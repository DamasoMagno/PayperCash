type Ocurrency = {
  id: number;
  titulo: string;
  descricao: string;
  tipo_categoria: string;
  dataCriacao: string;
  status: "PENDENTE" | "CONCLUIDO";
};

export function formatOcurrencies(ocorrencia: Ocurrency) {
  return {
    id: ocorrencia.id,
    titulo: ocorrencia.titulo,
    status: ocorrencia.status,
    dataCriacao:
      new Date(ocorrencia.dataCriacao).getHours() +
      ":" +
      new Date(ocorrencia.dataCriacao).getMinutes(),
  };
}
