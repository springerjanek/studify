import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./shared/utils/auth";
import { Home } from "./Home";
import { SignIn } from "@features/Auth/containers/Login";
import { Dashboard } from "@features/Dashboard";
import { Notifications } from "@features/Dashboard/components/notifications/Notifications";
import { Settings } from "./features/Dashboard/components/settings/Settings";
import { Profile } from "./features/Dashboard/components/user/Profile";

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
        <Route
          path="/dashboard/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
