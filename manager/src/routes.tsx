import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Ocurrencies";
import { Ocurrency } from "./pages/Ocurrency";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Account } from "./pages/Account";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/ocurrencies" element={<Home />} />
      <Route path="/ocurrency/:id" element={<Ocurrency />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}
