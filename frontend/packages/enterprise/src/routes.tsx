import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Ocurrencies } from "./pages/Ocurrencies";
import { SignTechinician } from "./pages/Technicians";
import { Categories } from "./pages/Categories";
import { Category } from "./pages/Category";
import { Ocurrency } from "./pages/Ocurrency";
import { Technician } from "./pages/Technician";
import { Managers } from "./pages/Managers";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/ocurrencies/:status" element={<Ocurrencies />} />
        <Route path="/technicians" element={<SignTechinician />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ocurrency/:id" element={<Ocurrency />} />
        <Route path="technician/:id" element={<Technician />}/>
        <Route path="/managers" element={<Managers />} />
        <Route path="/category" element={< Category />} />
      </Routes>
    </BrowserRouter>
  );
}
