import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Ocurrency as OcurrencyType } from "../../interfaces";
import { RemoveCallModal } from "../../components/Modals/RemoveCallModal";
import { useCookies } from "react-cookie";

import { Field } from "../../components/Form/Field";

import {  Content, OcurrencyResume } from "./styles";
import { useModal } from "../../contexts/modalContext";
import { useAuth } from "../../contexts/authContext";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import { MdArrowBack, MdPlace } from "react-icons/md";

export function Ocurrency() {
  const { id } = useParams();
  const { setModalRemoveCall } = useModal();
  const { logoutUser } = useAuth();

  const [ocurrency, setOcurreny] = useState({} as OcurrencyType);

  useEffect(() => {
    api
      .get(`/ocorrencias/${id}`)
      .then((response) => setOcurreny(response.data))
      .catch(logoutUser);
  }, []);

  return (
    <>
      <Header>
        <Link to="/ocurrencies">
          <MdArrowBack size={24} color="#FFF"/>
        </Link>
      </Header>

      <Content>
        <OcurrencyResume>
          <header>
            <small>Detalhes do chamado</small>
          </header>
          <strong>Primeira Ocorrencia desta conta</strong>
          <p>Chamado aberto em 29 de Janeiro de 2021</p>
          <span />
          <div className="status">
            <p>{ocurrency.status}</p>
          </div>
        </OcurrencyResume>
        
        <main>
          <Field label="Solicitante" value={ocurrency.gerente} />
          <Field label="Título" value={ocurrency?.titulo ?? "Carregando..."} />
          <Field label="Descrição" value={ocurrency?.descricao ?? "Carregando..."} />
          <Field label="Resolutividade" value={ocurrency?.resolucao ?? "Carregando..."} />
          <Field label="Técnico" value={ocurrency?.tecnico ?? "Nenhum técnico"} />
          <div className="locale">
            <Field label="Localização" value={ocurrency.endereco}/>
            <a href={`https://maps.google.com/?q=${ocurrency.endereco}`} target="_blank">
              <MdPlace color="#FFF"/>
              Localização
            </a>
          </div>
          <button onClick={() => setModalRemoveCall(true)}>
            Remover Ocorrencia
          </button>
        </main>
      </Content>
      <RemoveCallModal/>
    </>
  );
}
