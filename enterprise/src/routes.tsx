import { Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Ocurrencies } from "./pages/Ocurrencies";
import { Ocurrency } from "./pages/Ocurrency";
import { Categories } from "./pages/Categories";
import { Category } from "./pages/Category";
import { Managers } from "./pages/Managers";
import { Manager } from "./pages/Manager";
import { Techinicians } from "./pages/Technicians";
import { Technician } from "./pages/Technician";
import { ResetPassword } from "./pages/ResetPassword";
import { AuthProvider } from "./contexts/authContext";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/reset" element={<ResetPassword />} />
      <AuthProvider>
        <Route path="/ocurrencies/:status" element={<Ocurrencies />} />
        <Route path="/technicians" element={<Techinicians />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ocurrency/:id" element={<Ocurrency />} />
        <Route path="technician/:id" element={<Technician />} />
        <Route path="/managers" element={<Managers />} />
        <Route path="/manager/:id" element={<Manager />} />
        <Route path="/category/:id" element={<Category />} />
      </AuthProvider>
    </Routes>
  );
}
