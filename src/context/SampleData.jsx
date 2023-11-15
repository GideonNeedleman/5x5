import { createContext, useContext, useState } from "react";

const SampleData = createContext();

const initialState = [
  {
    name: "Stronglifts 5x5",
    workouts: [
      {
        name: "A day",
        id: 1,
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
    workouts: [
      {
        name: "Push day",
        id: 3,
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
];

export function SampleDataProvider({ children }) {
  const [programData, setProgramData] = useState(initialState);

  return (
    <SampleData.Provider value={{ programData, setProgramData }}>
      {children}
    </SampleData.Provider>
  );
}

export function useSampleData() {
  const context = useContext(SampleData);
  if (context === undefined)
    throw new Error("SampleData was used outside of SampleDataProvider");
  return context;
}
