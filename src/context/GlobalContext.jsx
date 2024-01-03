import { createContext, useContext, useReducer, useEffect } from "react";
import { initialProgramData } from "./initialProgramData";
import { initialExerciseData } from "./initialExerciseData";
import { initialWorkoutData } from "./initialWorkoutData";
import { initialActivePrograms } from "./initialActivePrograms";
import { initialExercisePresets } from "./initialExercisePresets";

const GlobalContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "select-workout":
      return {
        ...state,
        activeWorkout: JSON.parse(JSON.stringify(action.payload.workout)),
        activeWorkoutIndex: action.payload.index,
        activeProgramId: action.payload.program.id,
      };
    case "clear-workout":
      return {
        ...state,
        activeWorkout: null,
        activeWorkoutIndex: null,
        isWorkoutStarted: false,
        activeProgramId: null,
        tempRecordData: [],
        activeKey: 1,
        tempWorkoutHistoryRecord: {},
      };
    case "begin-workout":
      return {
        ...state,
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
    case "just-go":
      return {
        ...state,
        isWorkoutStarted: true,
        isWorkoutFinished: false,
        activeKey: 0,
        activeWorkout: {
          name: "Just Go",
          id: 0,
          exercises: [],
        },
        tempWorkoutHistoryRecord: {
          workoutId: 0,
          workoutName: "Just Go",
          startTime: new Date(),
        },
        tempRecordData: [],
      };
    case "just-go-save-workout":
      return {
        ...state,
        tempWorkoutHistoryRecord: {
          workoutId: action.payload.id,
          workoutName: action.payload.name,
        },
      };
    case "finish-workout":
      return {
        ...state,
        // increment 'next' value, set to 0 if last workout
        programData: state.programData.map((program) =>
          program.id === state.activeProgramId
            ? {
                ...program,
                next:
                  state.activeWorkoutIndex === program.workouts.length - 1
                    ? 0
                    : state.activeWorkoutIndex + 1,
              }
            : program
        ),
        activeWorkout: null,
        activeWorkoutIndex: null,
        activeProgramId: null,
        isWorkoutStarted: false,
        isWorkoutFinished: true,
        activeKey: 1,
        recordData: [...state.recordData, ...state.tempRecordData],
        // tempRecordData: [],
        workoutHistory: [
          ...state.workoutHistory,
          { ...state.tempWorkoutHistoryRecord, finishTime: new Date() },
        ],
        tempWorkoutHistoryRecord: {},
      };
    case "finish-just-go":
      return {
        ...state,
        activeWorkout: null,
        activeWorkoutIndex: null,
        activeProgramId: null,
        isWorkoutStarted: false,
        isWorkoutFinished: true,
        activeKey: 1,
        recordData: [...state.recordData, ...state.tempRecordData],
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
        // Need to add condition for adaptive metrics
        workoutData: state.workoutData.map((workout) =>
          workout.id === action.payload.id ? state.activeWorkout : workout
        ),
      };
    case "create-new-exercise":
      return {
        ...state,
        exerciseData: [...state.exerciseData, action.payload],
      };
    case "create-new-workout":
      return {
        ...state,
        workoutData: [...state.workoutData, action.payload],
      };
    case "create-new-program":
      return {
        ...state,
        programData: [...state.programData, action.payload],
      };
    case "edit-program":
      return {
        ...state,
        programData: state.programData.map((program) =>
          program.id === action.payload.id
            ? {
                ...program,
                name: action.payload.name,
                workouts: action.payload.workouts,
              }
            : program
        ),
      };
    case "edit-workout":
      return {
        ...state,
        workoutData: state.workoutData.map((workout) =>
          workout.id === action.payload.id
            ? {
                ...workout,
                name: action.payload.name,
                exercises: action.payload.exercises,
              }
            : workout
        ),
      };
    case "edit-exercise":
      return {
        ...state,
        exerciseData: state.exerciseData.map((exercise) =>
          exercise.id === action.payload.id ? action.payload : exercise
        ),
      };
    case "add-program":
      return {
        ...state,
        activePrograms: [action.payload.id, ...state.activePrograms],
      };
    case "add-workout":
      return {
        ...state,
        programData: state.programData.map((program) =>
          program.id === 0
            ? {
                ...program,
                workouts: [action.payload.id, ...state.programData[0].workouts],
              }
            : program
        ),
      };
    case "remove-program":
      return {
        ...state,
        activePrograms: state.activePrograms.filter(
          (el) => el !== action.payload.id
        ),
      };
    case "remove-workout":
      return {
        ...state,
        programData: state.programData.map((program) =>
          program.id === 0
            ? {
                ...program,
                workouts: state.programData[0].workouts.filter(
                  (el) => el !== action.payload.id
                ),
              }
            : program
        ),
      };
    default:
      throw new Error("unknown action type");
  }
}

// use program id=0 for workouts not in My Workouts
const initialState = {
  activeWorkout: null,
  activeWorkoutIndex: null,
  activeProgramId: null,
  isWorkoutStarted: false,
  isWorkoutFinished: false,
  activeKey: 1,
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
  activePrograms:
    JSON.parse(localStorage.getItem("activePrograms")) || initialActivePrograms,
  exercisePresets:
    JSON.parse(localStorage.getItem("exercisePresets")) ||
    initialExercisePresets,
};

function GlobalContextProvider({ children }) {
  const [
    {
      activeWorkout,
      activeWorkoutIndex,
      activeProgramId,
      isWorkoutStarted,
      isWorkoutFinished,
      activeKey,
      programData,
      activePrograms,
      tempRecordData,
      recordData,
      workoutHistory,
      exerciseData,
      workoutData,
      exercisePresets,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleFinishWorkout() {
    // strip out setId, not needed in recordData
    for (let i in tempRecordData) {
      delete tempRecordData[i].setId;
    }

    dispatch({
      type: "update-adaptive-metrics",
      payload: workoutData.find(
        (workout) =>
          workout.id ===
          programData.find((program) => program.id === activeProgramId)
            .workouts[activeWorkoutIndex]
      ),
    });
    dispatch({ type: "finish-workout" });
  }

  function handleFinishJustGo() {
    // strip out setId
    for (let i in tempRecordData) {
      delete tempRecordData[i].setId;
    }
    dispatch({ type: "finish-just-go" });
  }

  function handleFinishJustGoAndSave(newWorkout) {
    dispatch({
      type: "create-new-workout",
      payload: newWorkout,
    });
    dispatch({ type: "add-workout", payload: newWorkout });
    dispatch({
      type: "just-go-save-workout",
      payload: newWorkout,
    });
    handleFinishJustGo();
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

  useEffect(() => {
    localStorage.setItem("activePrograms", JSON.stringify(activePrograms));
  }, [activePrograms]);

  useEffect(() => {
    localStorage.setItem("exercisePresets", JSON.stringify(exercisePresets));
  }, [exercisePresets]);

  return (
    <GlobalContext.Provider
      value={{
        activeWorkout,
        activeWorkoutIndex,
        activeProgramId,
        isWorkoutStarted,
        isWorkoutFinished,
        activeKey,
        programData,
        activePrograms,
        tempRecordData,
        recordData,
        workoutHistory,
        exerciseData,
        workoutData,
        exercisePresets,
        dispatch,

        handleFinishWorkout,
        handleFinishJustGo,
        handleFinishJustGoAndSave,
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
