import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "@features/Dashboard";
import { useAuth } from "./shared/utils/auth";
import { Home } from "./Home";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  if (!session) {
    <Navigate to={"/"} />;
  }

  return children;
};

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
