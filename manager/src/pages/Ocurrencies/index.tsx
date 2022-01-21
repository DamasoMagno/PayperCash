import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAddTask, MdArrowForwardIos, MdPeople } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { useModal } from "../../contexts/modalContext";
import { Ocurrency as OcurrencyType } from "../../interfaces";
import { useCookies } from "react-cookie";
import { useAuth } from "../../contexts/authContext";
import { api } from "../../services/api";

import { FormatOcurrencies } from "../../utils/formatOcurrencies";
import { throwToastError } from "../../utils/toastifyMessages";

import { OpenCallModal } from "../../components/Modals/OpenCallModal";
import { Header } from "../../components/Header";

import { Content, Buttons, CallHistory, Ocurrency, RecentCall } from "./styles";

type OcurrencyFormated = Pick<OcurrencyType, "id" | "dataCriacao" | "titulo">;

type OcurrencyInput = {
  titulo: string;
  descricao: string;
  tipo_categoria: string;
};

export function Home() {
  const { setModalOpenCallIsOpen } = useModal();
  const { logoutUser } = useAuth();

  const [ocurrencies, setOcurrencies] = useState<OcurrencyFormated[]>([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    api
      .get<OcurrencyType[]>("/ocorrencias", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(({ data }) => {
        const ocorrenciasFormatadas = data.map((ocorrencia: OcurrencyType) =>
          FormatOcurrencies(ocorrencia)
        );

        setOcurrencies(ocorrenciasFormatadas);
      });
  }, []);

  async function createNewOcurrency(data: OcurrencyInput) {
    try {
      const response = await api.post(`/ocorrencias`, { ...data });

      const ocorrenciaFormatada = FormatOcurrencies(response.data);

      setOcurrencies([...ocurrencies, ocorrenciaFormatada]);
    } catch (error) {
      throwToastError(error, logoutUser);
    }
  }


  return (
    <>
      <Header>
        <Buttons>
          <button onClick={() => setModalOpenCallIsOpen(true)}>
            <MdAddTask /> Novo Chamado
          </button>
          <Link to="/account">
            <MdPeople size={24} color="#FFF" /> Conta
          </Link>
        </Buttons>
      </Header>

      <Content>
        <RecentCall>
          <header>
            <p>Chamado Recente</p>
          </header>
          <Link to="/ocurrency/1">
            <strong>Teste</strong>
            <MdArrowForwardIos color="#333" size={18} />
          </Link>
        </RecentCall>

        <CallHistory>
          <div className="period">
            <p>Hoje</p>
            {ocurrencies
              ?.map((ocurrency) => (
                <Ocurrency key={ocurrency.id}>
                  <div className="scheduleCall">
                    <FiClock color="#333" />
                    <span>{ocurrency.dataCriacao}</span>
                  </div>

                  <Link className="titleCall" to={`/ocurrency/${ocurrency.id}`}>
                    <p>{ocurrency.titulo}</p>
                    <MdArrowForwardIos color="#333" size={16} />
                  </Link>
                </Ocurrency>
              ))
              .reverse()}
          </div>
        </CallHistory>
      </Content>

      <OpenCallModal onCreateNewOcurrency={createNewOcurrency} />
    </>
  );
}
