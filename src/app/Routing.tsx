import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Dashboard } from "@features/Dashboard";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
