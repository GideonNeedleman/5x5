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
    case "begin-workout":
      return {
        ...state,
        isWorkoutStarted: true,
        activeKey: 0,
      };
    case "finish-workout":
      return {
        ...state,
        activeWorkout: null,
        isWorkoutStarted: false,
        activeKey: 1,
      };
    case "next-exercise":
      return {
        ...state,
        activeKey: state.activeKey - 1,
      };
    default:
      throw new Error("unknown action type");
  }
}

const initialState = {
  activeWorkout: null,
  isWorkoutStarted: false,
  activeKey: 1,
};

function GlobalContextProvider({ children }) {
  const [{ activeWorkout, isWorkoutStarted, activeKey }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [activeWorkout, setActiveWorkout] = useState(null);

  return (
    <GlobalContext.Provider
      value={{ activeWorkout, isWorkoutStarted, activeKey, dispatch }}
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
