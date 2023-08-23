import React, { FC } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<{ children: React.JSX.Element }> = ({ children }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={"auth"} replace />;
  }

  return children;
};

export default PrivateRoute;
