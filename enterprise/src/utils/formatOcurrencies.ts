import { Ocurrency } from "../interfaces";

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
