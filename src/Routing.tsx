import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};
