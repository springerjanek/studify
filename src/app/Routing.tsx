import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Dashboard } from "@features/Dashboard";
import { AuthProvider, useAuth } from "./shared/utils/auth";

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
      <AuthProvider>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/" element={<App />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
