import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [activeWorkout, setActiveWorkout] = useState(null);

  return (
    <GlobalContext.Provider value={{ activeWorkout, setActiveWorkout }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (context === undefined)
    throw new Error("GlobalContext was used outside of GlobalContextProvider");
  return context;
}

export { GlobalContextProvider, useGlobalContext };
