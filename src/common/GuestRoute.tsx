import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getToken } from "../Utility/Helper";
import { ENUMFORROUTES } from "../interfaces/interface";
const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

//   console.log(children);
  const isAuthenticated = getToken() !== null ? true : false; // get Token or flag from Localstorage for dynamic

  if (isAuthenticated) {
      return <Navigate to={ENUMFORROUTES.DASHBOARD }state={{ from: location }} />
    };
    return children;

};

export default GuestRoute;
