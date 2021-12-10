import { ContextProvider } from "./hooks/useModal";
import ReactModal from "react-modal";
import { QueryClient, QueryClientProvider } from "react-query";

import { Routes } from "./routes";

import GlobalStyles from "./styles/global";

ReactModal.setAppElement("#root");

const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Routes />
        </ContextProvider>
      </QueryClientProvider>
    </>
  );
}

