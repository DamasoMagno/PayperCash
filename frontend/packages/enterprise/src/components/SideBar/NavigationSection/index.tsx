import { useLocation } from "react-router-dom";

import { Containaer } from "./styles";

type NavigationSectionProps = {
  router: string;
  title: string;
}

export function NavigationSection({ router, title }: NavigationSectionProps){
  const { pathname } = useLocation(); 

  return (
    <Containaer isCurrentPage={ router === pathname }>

    </Containaer>
  );
}