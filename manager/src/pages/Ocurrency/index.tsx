import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Ocurrency as OcurrencyType } from "../../interfaces";
import { useCookies } from "react-cookie";

import { Field } from "../../components/Form/Field";

import { Container, Divider, Content } from "./styles";

export function Ocurrency() {
  const { id } = useParams();

  const [ocurrency, setOcurreny] = useState<OcurrencyType>({} as OcurrencyType);
  const [ cookies ] = useCookies(["token"]);

  useEffect(() => {
    api.get(`/ocorrencias/${id}`)
      .then((response) => setOcurreny(response.data));
  }, []);

  return (
    <Container>
      <Content>
        <header>
          <small>Detalhes do chamado</small>
          <strong>{ocurrency.titulo}</strong>
          <p>Chamado aberto em {new Date(ocurrency.dataCriacao).toString()}</p>
          <Divider>
            <span />
            <div className={ocurrency.status === "CONCLUIDO" ? "concluded" : "pendent"}>
              <p>{ocurrency.status?.toLowerCase()}</p>
            </div>
          </Divider>
        </header>
        <main>
          <Field label="Solicitante" value="Maria Gonçalvez" />
          <Field label="Título" value={ocurrency.titulo} />
          <Field label="Descrição" value={ocurrency.descricao} />
          <Field label="Resolutividade" value={ocurrency.resolucao} />
          <Field label="Técnico" value={"Damaso"} />
          <button>Remover Ocorrencia</button>
        </main>
      </Content>
    </Container>
  );
}
