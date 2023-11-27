import { createContext, useContext, useReducer } from "react";

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
        activeKey: 1,
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
        activeKey: 0,
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
        activeWorkout: null,
        activeProgramId: null,
        isWorkoutStarted: false,
        nextWorkoutOrder: null,
        activeKey: 1,
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
    default:
      throw new Error("unknown action type");
  }
}

// use program id=null for self workouts not in a program
const initialState = {
  activeWorkout: null,
  activeProgramId: null,
  isWorkoutStarted: false,
  activeKey: 1,
  nextWorkoutOrder: null, //check if needed
  tempWorkoutData: [], //each element is a completed set
  programData: [
    {
      name: "Stronglifts 5x5",
      id: 1,
      workouts: [
        {
          name: "A day",
          id: 1,
          order: 0,
          next: true,
          exercises: [
            {
              name: "Barbell Squats",
              id: 1,
              sets: [
                { id: 1, weight: 185, reps: 5 },
                { id: 2, weight: 185, reps: 5 },
                { id: 3, weight: 185, reps: 5 },
                { id: 4, weight: 185, reps: 5 },
                { id: 5, weight: 185, reps: 5 },
              ],
            },
            {
              name: "Barbell Row",
              id: 2,
              sets: [
                { id: 6, weight: 135, reps: 5 },
                { id: 7, weight: 135, reps: 5 },
                { id: 8, weight: 135, reps: 5 },
                { id: 9, weight: 135, reps: 5 },
                { id: 10, weight: 135, reps: 5 },
              ],
            },
            {
              name: "Bench Press",
              id: 3,
              sets: [
                { id: 11, weight: 125, reps: 5 },
                { id: 12, weight: 125, reps: 5 },
                { id: 13, weight: 125, reps: 5 },
                { id: 14, weight: 125, reps: 5 },
                { id: 15, weight: 125, reps: 5 },
              ],
            },
          ],
        },
        {
          name: "B day",
          id: 2,
          order: 1,
          next: false,
          exercises: [
            {
              name: "Barbell Squats",
              id: 4,
              sets: [
                { id: 16, weight: 185, reps: 5 },
                { id: 17, weight: 185, reps: 5 },
                { id: 18, weight: 185, reps: 5 },
                { id: 19, weight: 185, reps: 5 },
                { id: 20, weight: 185, reps: 5 },
              ],
            },
            {
              name: "Overhead Press",
              id: 5,
              sets: [
                { id: 21, weight: 95, reps: 5 },
                { id: 22, weight: 95, reps: 5 },
                { id: 23, weight: 95, reps: 5 },
                { id: 24, weight: 95, reps: 5 },
                { id: 25, weight: 95, reps: 5 },
              ],
            },
            {
              name: "Deadlift",
              id: 6,
              sets: [{ id: 26, weight: 195, reps: 5 }],
            },
          ],
        },
      ],
    },
    {
      name: "Some other program",
      id: 2,
      workouts: [
        {
          name: "Push day",
          id: 3,
          order: 0,
          next: true,
          exercises: [
            {
              name: "Pushups",
              id: 7,
              sets: [
                { id: 27, weight: null, reps: 15 },
                { id: 28, weight: null, reps: 15 },
                { id: 29, weight: null, reps: 15 },
                { id: 30, weight: null, reps: 15 },
                { id: 31, weight: null, reps: 15 },
              ],
            },
            {
              name: "Bench Press",
              id: 8,
              sets: [
                { id: 32, weight: 125, reps: 5 },
                { id: 33, weight: 125, reps: 5 },
                { id: 34, weight: 125, reps: 5 },
                { id: 35, weight: 125, reps: 5 },
                { id: 36, weight: 125, reps: 5 },
              ],
            },
          ],
        },
        {
          name: "Pull day",
          id: 4,
          order: 1,
          next: false,
          exercises: [
            {
              name: "Pullups",
              id: 9,
              sets: [
                { id: 37, weight: null, reps: 8 },
                { id: 38, weight: null, reps: 6 },
                { id: 39, weight: null, reps: 3 },
              ],
            },
            {
              name: "Deadlift",
              id: 10,
              sets: [{ id: 40, weight: 195, reps: 5 }],
            },
          ],
        },
        {
          name: "Legs",
          id: 5,
          order: 2,
          next: false,
          exercises: [
            {
              name: "Barbell Squats",
              id: 11,
              sets: [
                { id: 41, weight: 185, reps: 5 },
                { id: 42, weight: 185, reps: 5 },
                { id: 43, weight: 185, reps: 5 },
                { id: 44, weight: 185, reps: 5 },
                { id: 45, weight: 185, reps: 5 },
              ],
            },
            {
              name: "Leg Press",
              id: 12,
              sets: [
                { id: 46, weight: 215, reps: 5 },
                { id: 47, weight: 215, reps: 5 },
                { id: 48, weight: 215, reps: 5 },
                { id: 49, weight: 215, reps: 5 },
                { id: 50, weight: 215, reps: 5 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function GlobalContextProvider({ children }) {
  const [
    {
      activeWorkout,
      isWorkoutStarted,
      activeKey,
      programData,
      tempWorkoutData,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        activeWorkout,
        isWorkoutStarted,
        activeKey,
        programData,
        tempWorkoutData,
        dispatch,
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
