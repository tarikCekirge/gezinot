import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == undefined) {
    return new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { useAuth };
