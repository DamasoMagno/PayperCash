import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Ocurrencies } from "./pages/Ocurrencies";
import { Ocurrency } from "./pages/Ocurrency";
import { Categories } from "./pages/Categories";
import { Category } from "./pages/Category";
import { Managers } from "./pages/Managers";
import { Techinicians } from "./pages/Technicians";
import { Technician } from "./pages/Technician";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/ocurrencies/:status" element={<Ocurrencies />} />
        <Route path="/technicians" element={<Techinicians />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ocurrency/:id" element={<Ocurrency />} />
        <Route path="technician/:id" element={<Technician />} />
        <Route path="/managers" element={<Managers />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}
