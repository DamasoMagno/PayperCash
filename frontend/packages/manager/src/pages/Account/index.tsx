import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { MdMail, MdPlace, MdHome, MdContactPhone, MdArrowBack, MdLogout } from "react-icons/md";

import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";

import { Container, Buttons } from "./styles";

import localization from "../../assets/localeMap.png";
import { useQuery } from "react-query";

type User = {
  name: string;
  email: string;
  address: string;
  contact: string;
}

export function UserProfile(){
  const { register } = useForm<User>();

  const { data: user } = useQuery<User>("user", async () => {
    const response = await api.get("user");
    return response.data;
  });

  return (
    <>
      <Header>
        <Buttons>
          <Link to="/">
            <MdArrowBack size={24}/>
          </Link>
          <Link to="/signIn">
            <MdLogout size={24} color="#FFF" />
          </Link>
        </Buttons>
      </Header>

      <Container>
        <div className="locale">
          <img src={ localization } alt="React Leaflet" />
        </div>

        <Input 
          icon={MdHome} 
          value={user?.name}
          register={() => register("name")}
        />
        <Input 
          icon={MdPlace} 
          value={user?.address}
          register={() => register("address")}
        />
        <Input 
          icon={MdMail} 
          value={user?.email}
          register={() => register("email")}
        />
        <Input 
          icon={MdContactPhone} 
          value={user?.contact}
          register={() => register("contact")}  
        />

        <button className="confirmChanges " type="submit">
          Confirmar Alterações
        </button>
      </Container>
    </>
  );
}