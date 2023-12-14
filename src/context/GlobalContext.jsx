import { createContext, useContext, useReducer, useEffect } from "react";
import { initialProgramData } from "./initialProgramData";
import { initialExerciseData } from "./initialExerciseData";
import { initialWorkoutData } from "./initialWorkoutData";

const GlobalContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "select-workout":
      return {
        ...state,
        activeWorkout: JSON.parse(JSON.stringify(action.payload.workout)),
        activeProgramId: action.payload.program.id,
      };
    case "clear-workout":
      return {
        ...state,
        activeWorkout: null,
        isWorkoutStarted: false,
        activeProgramId: null,
        tempRecordData: [],
        activeKey: 1,
        tempWorkoutHistoryRecord: {},
      };
    case "begin-workout":
      return {
        ...state,
        // calculate nextWorkoutOrder to increment 'next' flag. if currentOrder < workouts.length ? increment 1 : set to 0
        nextWorkoutOrder:
          state.activeWorkout.id <
          state.programData.find(
            (program) => program.id === state.activeProgramId
          ).workouts.length
            ? state.activeWorkout.id + 1
            : 1,
        isWorkoutStarted: true,
        isWorkoutFinished: false,
        activeKey: 0,
        tempWorkoutHistoryRecord: {
          workoutId: state.activeWorkout.id,
          workoutName: state.activeWorkout.name,
          startTime: new Date(),
        },
        tempRecordData: [],
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
                  workout.id === state.nextWorkoutOrder
                    ? { ...workout, next: true }
                    : { ...workout, next: false }
                ),
              }
            : program
        ),
        activeWorkout: null,
        activeProgramId: null,
        isWorkoutStarted: false,
        isWorkoutFinished: true,
        nextWorkoutOrder: null,
        activeKey: 1,
        recordData: [...state.recordData, ...state.tempRecordData],
        // tempRecordData: [],
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
        tempRecordData: [...state.tempRecordData, action.payload],
      };
    case "edit-temp-set-data":
      return {
        ...state,
        tempRecordData: [...action.payload],
      };
    case "edit-set-data":
      return {
        ...state,
        recordData: [
          ...state.recordData.map((set) =>
            set.datetime === action.payload.datetime ? action.payload : set
          ),
        ],
      };
    case "delete-set":
      return {
        ...state,
        recordData: [
          ...state.recordData.filter(
            (set) => set.datetime !== action.payload.datetime
          ),
        ],
      };
    case "update-adaptive-metrics":
      return {
        ...state,
        programData: state.programData.map((program) =>
          program.id === state.activeProgramId
            ? {
                ...program,
                workouts: program.workouts.map((workout) =>
                  workout.id === state.activeWorkout.id
                    ? state.activeWorkout
                    : workout
                ),
              }
            : program
        ),
      };
    case "add-new-exercise":
      return {
        ...state,
        exerciseData: [...state.exerciseData, action.payload],
      };
    case "add-new-workout":
      return {
        ...state,
        workoutData: [...state.workoutData, action.payload],
      };
    case "add-new-program":
      return {
        ...state,
        programData: [...state.programData, action.payload],
      };
    default:
      throw new Error("unknown action type");
  }
}

// use program id=null for self workouts not in a program
const initialState = {
  activeWorkout: null,
  activeProgramId: null,
  isWorkoutStarted: false,
  isWorkoutFinished: false,
  activeKey: 1,
  nextWorkoutOrder: null, //check if needed
  tempRecordData: [], //each element is a completed set
  recordData: JSON.parse(localStorage.getItem("recordData")) || [],
  tempWorkoutHistoryRecord: {},
  workoutHistory: JSON.parse(localStorage.getItem("workoutHistory")) || [], //{workoutId, workoutName, startTime, finishTime}
  exerciseData:
    JSON.parse(localStorage.getItem("exerciseData")) || initialExerciseData,
  workoutData:
    JSON.parse(localStorage.getItem("workoutData")) || initialWorkoutData,
  programData:
    JSON.parse(localStorage.getItem("programData")) || initialProgramData,
};

function GlobalContextProvider({ children }) {
  const [
    {
      activeWorkout,
      activeProgramId,
      isWorkoutStarted,
      isWorkoutFinished,
      activeKey,
      programData,
      tempRecordData,
      recordData,
      workoutHistory,
      exerciseData,
      workoutData,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleFinishWorkout() {
    // strip out setId
    for (let i in tempRecordData) {
      delete tempRecordData[i].setId;
    }

    dispatch({ type: "update-adaptive-metrics" });
    dispatch({ type: "finish-workout", payload: tempRecordData });
  }

  useEffect(() => {
    localStorage.setItem("recordData", JSON.stringify(recordData));
  }, [recordData]);

  useEffect(() => {
    localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem("programData", JSON.stringify(programData));
  }, [programData]);

  useEffect(() => {
    localStorage.setItem("exerciseData", JSON.stringify(exerciseData));
  }, [exerciseData]);

  useEffect(() => {
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
  }, [workoutData]);

  return (
    <GlobalContext.Provider
      value={{
        activeWorkout,
        activeProgramId,
        isWorkoutStarted,
        isWorkoutFinished,
        activeKey,
        programData,
        tempRecordData,
        recordData,
        workoutHistory,
        exerciseData,
        workoutData,
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
