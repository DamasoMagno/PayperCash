import { ContextProvider } from "./hooks/useModal";
import ReactModal from "react-modal";

import { AppRoutes } from "./routes";

import GlobalStyles from "./styles/global";

ReactModal.setAppElement("#root");

export function App() {
  return (
    <ContextProvider>
      <GlobalStyles />
      <AppRoutes />
    </ContextProvider>
  );
}
