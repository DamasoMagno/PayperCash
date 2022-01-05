import ReactModal from "react-modal";

import { AppRoutes } from "./routes";

import GlobalStyles from "./styles/global";

import { AppProvider } from "./hooks/useOcurrencies";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactModal.setAppElement("#root");

export function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <GlobalStyles />
          <AppRoutes />
          <ToastContainer position="top-center" autoClose={1000} closeOnClick />
        </AppProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
