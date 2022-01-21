import { UserProfileModal } from "./components/Modals/UserProfileModal";
import { ModalsProvider } from "./contexts/modalsContext";
import { AppRoutes } from "./routes";
import { CookiesProvider } from "react-cookie";
import Modal from "react-modal";

import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "./styles/global";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

export function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <ModalsProvider>
          <AppRoutes />
          <GlobalStyles />
          <UserProfileModal />
        </ModalsProvider>
      </CookiesProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}
