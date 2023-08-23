import React from "react";
import PrivateRoute from "./container/privateRoutes/privateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./container/Routes/home/home";
import Authentication from "./container/Routes/authentication/authentication.component";
import Phone from "./container/Routes/phone-authentication/phone";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="auth" element={<Authentication />}></Route>
        <Route path="phone-auth" element={<Phone />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
