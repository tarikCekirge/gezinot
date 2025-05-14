import { useContext } from "react";
import { CitiesContext } from "../CitiesContext";

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};

export { useCities };
