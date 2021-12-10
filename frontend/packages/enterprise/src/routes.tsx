import {  BrowserRouter, Route, Routes } from "react-router-dom";
import { SideBar } from "./components/SideBar";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Ocurrency } from "./pages/Ocurrency";
import { OcurrencyManager } from "./pages/OcurrencyManager";

export function AppRoutes(){
  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/finished" element={<Home />} />
        <Route path="/ocurrency/:id" element={<Ocurrency />} />
        <Route path="/ocurrencyManagers" element={<OcurrencyManager />} />
      </Routes>
    </BrowserRouter>
  );
}

