import ReactModal from "react-modal";

import { AppRoutes } from "./routes";

import GlobalStyles from "./styles/global";

import { ModalProvider } from "./contexts/modalContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";

import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

const queryClient = new QueryClient();

ReactModal.setAppElement("#root");

export function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ModalProvider>
              <AppRoutes />
              <GlobalStyles />
            </ModalProvider>
          </QueryClientProvider>
        </AuthProvider>
      </CookiesProvider>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}
