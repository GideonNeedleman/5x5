import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "select-workout":
      return {
        ...state,
        activeWorkout: action.payload,
      };
    case "clear-workout":
      return {
        ...state,
        activeWorkout: null,
      };
    case "start-workout":
      return {
        ...state,
        workoutStarted: true,
      };
    case "end-workout":
      return {
        ...state,
        workoutStarted: false,
      };
    default:
      throw new Error("unknown action type");
  }
}

const initialState = {
  activeWorkout: null,
  isWorkoutStarted: false,
};

function GlobalContextProvider({ children }) {
  const [{ activeWorkout, isWorkoutStarted }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [activeWorkout, setActiveWorkout] = useState(null);

  return (
    <GlobalContext.Provider
      value={{ activeWorkout, isWorkoutStarted, dispatch }}
    >
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
