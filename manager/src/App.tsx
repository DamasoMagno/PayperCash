import ReactModal from "react-modal";

import { AppRoutes } from "./routes";

import GlobalStyles from "./styles/global";

import { AppProvider } from "./hooks/useOcurrencies";

ReactModal.setAppElement("#root");

export function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <AppRoutes />
    </AppProvider>
  );
}
