import { UserProfileModal } from "./components/Modals/UserProfileModal";
import { ModalsProvider } from "./contexts/modalsContext";
import { AppRoutes } from "./routes";
import { CookiesProvider } from "react-cookie";
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from "react-query";

import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "./styles/global";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import { Toastify } from "./components/Toastify";

Modal.setAppElement("#root");

const queryClient = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ModalsProvider>
              <AppRoutes />
              <GlobalStyles />
              <UserProfileModal />
            </ModalsProvider>
          </QueryClientProvider>
        </AuthProvider>
      </CookiesProvider>
      <Toastify />
    </BrowserRouter>
  );
}
