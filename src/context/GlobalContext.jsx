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
        activeProgramId: null,
      };
    case "begin-workout":
      return {
        ...state,
        // if currentOrder < workouts.length ? increment 1 : set to 0
        nextWorkoutOrder:
          state.activeWorkout.order <
          state.programData.filter(
            (program) => program.id === state.activeProgramId
          )[0].workouts.length -
            1
            ? state.activeWorkout.order + 1
            : 0,
        /*         currentWorkoutOrder: state.programData
          .filter((program) => program.id === state.activeProgramId)[0]
          .workouts.filter(
            (workout) => workout.id === state.activeWorkout.id
          )[0].order, */
        /*         {
          ...state.activeProgram,
          state.activeProgram.workouts: state.activeProgram.workouts.map((workout) => {
            workout, (workout.next = false);
          }),
        }, */
        isWorkoutStarted: true,
        activeKey: 0,
      };
    case "finish-workout":
      return {
        ...state,
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
  nextWorkoutOrder: null,
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
              sets: [
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
              ],
            },
            {
              name: "Barbell Row",
              sets: [
                { weight: 135, reps: 5 },
                { weight: 135, reps: 5 },
                { weight: 135, reps: 5 },
                { weight: 135, reps: 5 },
                { weight: 135, reps: 5 },
              ],
            },
            {
              name: "Bench Press",
              sets: [
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
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
              sets: [
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
              ],
            },
            {
              name: "Overhead Press",
              sets: [
                { weight: 95, reps: 5 },
                { weight: 95, reps: 5 },
                { weight: 95, reps: 5 },
                { weight: 95, reps: 5 },
                { weight: 95, reps: 5 },
              ],
            },
            {
              name: "Deadlift",
              sets: [{ weight: 195, reps: 5 }],
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
              sets: [
                { weight: null, reps: 15 },
                { weight: null, reps: 15 },
                { weight: null, reps: 15 },
                { weight: null, reps: 15 },
                { weight: null, reps: 15 },
              ],
            },
            {
              name: "Bench Press",
              sets: [
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
                { weight: 125, reps: 5 },
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
              sets: [
                { weight: null, reps: 8 },
                { weight: null, reps: 6 },
                { weight: null, reps: 3 },
              ],
            },
            {
              name: "Deadlift",
              sets: [{ weight: 195, reps: 5 }],
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
              name: "BarbellSquats",
              sets: [
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
                { weight: 185, reps: 5 },
              ],
            },
            {
              name: "Leg Press",
              sets: [
                { weight: 215, reps: 5 },
                { weight: 215, reps: 5 },
                { weight: 215, reps: 5 },
                { weight: 215, reps: 5 },
                { weight: 215, reps: 5 },
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
    { activeWorkout, isWorkoutStarted, activeKey, programData },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        activeWorkout,
        isWorkoutStarted,
        activeKey,
        programData,
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
