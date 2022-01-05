import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowRight, MdPeople } from "react-icons/md";
import { api } from "../../services/api";
import { useModal } from "../../hooks/useOcurrencies";
import { Ocurrency as OcurrencyType } from "../../interfaces";
import { useCookies } from "react-cookie";

import { FormatOcurrencies } from "../../utils/FormOcurrencies";

import { OpenCallModal } from "../../components/OpenCallModal";
import { Header } from "../../components/Header";

import { Content, Buttons, HistoricCalls, Ocurrency, RecentCall } from "./styles";

import horarioImage from "../../assets/horario.png";
import callImage from "../../assets/call.png";

type OcurrencyFormated = Pick<OcurrencyType, "id" | "dataCriacao" | "titulo">;

type OcurrencyInput = {
  titulo: string;
  descricao: string;
  tipo_categoria: string;
};

export function Home() {
  const navigate = useNavigate();

  const { setModalOpenCallIsOpen } = useModal();
  const [ocurrencies, setOcurrencies] = useState<OcurrencyFormated[]>([]);
  const [ cookies, , removeCookies ] = useCookies(["token"]);

  useEffect(() => {
    api
      .get("gerente", { headers: { token: cookies.token } })
      .then(({ data }) => {
        const ocorrenciasFormatadas = data.ocorrencias
            .map((ocorrencia: OcurrencyType) => FormatOcurrencies(ocorrencia));
            
        setOcurrencies(ocorrenciasFormatadas);
      })
      .catch(() => {
        removeCookies("token");
        navigate("/");
      });
  }, []);

  async function createNewOcurrency(data: OcurrencyInput) {
    const response = await api.post(
      `/ocorrencias`,
      { ...data },
      { headers: { token: cookies.token } }
    );
    const ocorrenciaFormatada = FormatOcurrencies(response.data);
    setOcurrencies([...ocurrencies, ocorrenciaFormatada]);
  }

  return !!cookies.token ? (
    <>
      <Header>
        <Buttons>
          <button onClick={() => setModalOpenCallIsOpen(true)}>
            <img src={callImage} alt="Abrir Chamado" /> Abrir Chamado
          </button>
          <Link to="/account">
            <MdPeople size={24} color="#000" /> Conta
          </Link>
        </Buttons>
      </Header>

      <Content>
        <RecentCall>
          <header>
            <p>Chamado Recente</p>
          </header>
          <div onClick={() => setModalOpenCallIsOpen(true)}>
            <strong>{"Hello"}</strong>
            <MdArrowRight />
          </div>
        </RecentCall>

        <HistoricCalls>
          <div className="period">
            <p>Hoje</p>
            {ocurrencies.map((ocurrency) => (
              <Ocurrency key={ocurrency.id}>
                <div className="scheduleCall">
                  <img src={horarioImage} alt="Horário da Chamada" />
                  <span>{ocurrency.dataCriacao.toString().padEnd(5, "0")}</span>
                </div>

                <Link className="titleCall" to={`/ocurrency/${ocurrency.id}`}>
                  <p>{ocurrency.titulo}</p>
                  <MdArrowRight color="#FFF" />
                </Link>
              </Ocurrency>
            ))}
          </div>
        </HistoricCalls>
      </Content>

      <OpenCallModal onCreateNewOcurrency={createNewOcurrency} />
    </>
  ) : (
    <p style={{ background: "red" }}>Carregando</p>
  );
}
