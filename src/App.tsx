import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "pages/Registration/Login/Login";
import SignUp from "pages/Registration/SignUp/SignUp";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import NotFound from "pages/NoFound/NoFound";
import ForgetPassword from "pages/Registration/ForgetPassword/ForgetPassword";
import PinVerification from "pages/Registration/PinVerification/PinVerification";
import SetPassword from "pages/Registration/ForgetPassword/SetPassword";
function App() {
  const isLogin = localStorage.getItem("isLogin");
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={isLogin === "true" ? "/dashboard" : "/login"} />
            }
          />

          <Route path="/login/">
            <Route path="" element={<Login />} />
            <Route path="pin" element={<PinVerification path="/dashboard" />} />
          </Route>
          <Route path="/signup/">
            <Route path="" element={<SignUp />} />
            <Route path="pin" element={<PinVerification path="/login" />} />
          </Route>
          <Route path="/forget-password/">
            <Route path="" element={<ForgetPassword />} />
            <Route
              path="pin"
              element={
                <PinVerification path="/forget-password/reset-password" />
              }
            />
            <Route
              path="reset-password"
              element={<SetPassword path="/login" />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
