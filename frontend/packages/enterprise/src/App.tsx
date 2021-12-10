import { AppContext } from "./contexts/modalsContext";
import { Dashboard } from "./pages/Dashboard";

import GlobalStyles from "./styles/global";

export function App() {
  return (
    <AppContext>
        <Dashboard />
        <GlobalStyles />
    </AppContext>
  );
}

