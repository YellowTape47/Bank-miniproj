import AuthContext from "@/context/AuthContext";
import { Redirect } from "expo-router";
import React, { useContext } from "react";

const Index = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Redirect href={"/home"} />;
  }

  return <Redirect href={"/Login"} />;
};

export default Index;
