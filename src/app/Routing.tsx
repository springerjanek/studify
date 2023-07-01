import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./shared/utils/auth";
import { Home } from "./Home";
import { Dashboard } from "@features/Dashboard";
import { SignIn } from "@features/Auth/containers/Login";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();

  return !session ? <Navigate to={"/"} /> : children;
};

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
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
