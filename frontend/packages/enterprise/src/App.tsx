import { UserProfileModal } from "./components/Modals/UserProfileModal";
import { AppContext } from "./contexts/globalContexts";
import { AppRoutes } from "./routes";

import GlobalStyles from "./styles/global";

export function App() {
  return (
    <AppContext>
      <AppRoutes />
      <GlobalStyles />
      <UserProfileModal />
    </AppContext>
  );
}
