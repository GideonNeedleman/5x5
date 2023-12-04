import { createContext, useContext, useReducer, useEffect } from "react";
import { initialProgramData } from "./initialProgramData";
import { initialExerciseData } from "./initialExerciseData";

const GlobalContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "select-workout":
      return {
        ...state,
        activeWorkout: action.payload.workout,
        activeProgramId: action.payload.program.id,
      };
    case "clear-workout":
      return {
        ...state,
        activeWorkout: null,
        isWorkoutStarted: false,
        activeProgramId: null,
        tempWorkoutData: [],
        activeKey: 1,
        tempWorkoutHistoryRecord: {},
      };
    case "begin-workout":
      return {
        ...state,
        // calculate nextWorkoutOrder to increment 'next' flag. if currentOrder < workouts.length ? increment 1 : set to 0
        nextWorkoutOrder:
          state.activeWorkout.order <
          state.programData.filter(
            (program) => program.id === state.activeProgramId
          )[0].workouts.length -
            1
            ? state.activeWorkout.order + 1
            : 0,
        isWorkoutStarted: true,
        isWorkoutFinished: false,
        activeKey: 0,
        tempWorkoutHistoryRecord: {
          workoutId: state.activeWorkout.id,
          workoutName: state.activeWorkout.name,
          startTime: new Date(),
        },
        // mostRecentWorkout: null,
      };
    case "finish-workout":
      return {
        ...state,
        // increment 'next' flag when workout.order === nextWorkoutOrder
        programData: state.programData.map((program) =>
          program.id === state.activeProgramId
            ? {
                ...program,
                workouts: program.workouts.map((workout) =>
                  workout.order === state.nextWorkoutOrder
                    ? { ...workout, next: true }
                    : { ...workout, next: false }
                ),
              }
            : program
        ),
        mostRecentWorkout: state.activeWorkout,
        activeWorkout: null,
        activeProgramId: null,
        isWorkoutStarted: false,
        isWorkoutFinished: true,
        nextWorkoutOrder: null,
        activeKey: 1,
        workoutData: [...state.workoutData, ...state.tempWorkoutData],
        tempWorkoutData: [],
        workoutHistory: [
          ...state.workoutHistory,
          { ...state.tempWorkoutHistoryRecord, finishTime: new Date() },
        ],
        tempWorkoutHistoryRecord: {},
      };
    case "next-exercise":
      return {
        ...state,
        activeKey: state.activeKey - 1,
      };
    case "submit-set-data":
      return {
        ...state,
        tempWorkoutData: [...state.tempWorkoutData, action.payload],
      };
    case "edit-temp-set-data":
      return {
        ...state,
        tempWorkoutData: [...action.payload],
      };
    case "edit-set-data":
      return {
        ...state,
        workoutData: [
          ...state.workoutData.map((set) =>
            set.datetime === action.payload.datetime ? action.payload : set
          ),
        ],
      };
    case "delete-set":
      return {
        ...state,
        workoutData: [
          ...state.workoutData.filter(
            (set) => set.datetime !== action.payload.datetime
          ),
        ],
      };
    default:
      throw new Error("unknown action type");
  }
}

// use program id=null for self workouts not in a program
const initialState = {
  activeWorkout: null,
  activeProgramId: null,
  mostRecentWorkout: null,
  isWorkoutStarted: false,
  isWorkoutFinished: false,
  activeKey: 1,
  nextWorkoutOrder: null, //check if needed
  tempWorkoutData: [], //each element is a completed set
  workoutData: JSON.parse(localStorage.getItem("workoutData")) || [],
  tempWorkoutHistoryRecord: {},
  workoutHistory: JSON.parse(localStorage.getItem("workoutHistory")) || [], //{workoutId, workoutName, startTime, finishTime}
  exerciseData:
    JSON.parse(localStorage.getItem("exerciseData")) || initialExerciseData,
  programData:
    JSON.parse(localStorage.getItem("programData")) || initialProgramData,
};

function GlobalContextProvider({ children }) {
  const [
    {
      activeWorkout,
      mostRecentWorkout,
      isWorkoutStarted,
      isWorkoutFinished,
      activeKey,
      programData,
      tempWorkoutData,
      workoutData,
      workoutHistory,
      exerciseData,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleFinishWorkout() {
    // strip out setId
    for (let i in tempWorkoutData) {
      delete tempWorkoutData[i].setId;
    }

    dispatch({ type: "finish-workout", payload: tempWorkoutData });
  }

  useEffect(() => {
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
  }, [workoutData]);

  useEffect(() => {
    localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem("programData", JSON.stringify(programData));
  }, [programData]);

  useEffect(() => {
    localStorage.setItem("exerciseData", JSON.stringify(exerciseData));
  }, [exerciseData]);

  return (
    <GlobalContext.Provider
      value={{
        activeWorkout,
        mostRecentWorkout,
        isWorkoutStarted,
        isWorkoutFinished,
        activeKey,
        programData,
        tempWorkoutData,
        workoutData,
        workoutHistory,
        exerciseData,
        dispatch,

        handleFinishWorkout,
      }}
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
