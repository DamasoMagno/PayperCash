import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Ocurrencies";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { UserProfile } from "./pages/Account";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/ocurrencies" element={<Home />} />
        <Route path="/account" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
