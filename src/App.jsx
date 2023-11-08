import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SelectWorkout from "./pages/SelectWorkout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const sampleWorkouts = [
  {
    name: "A day",
    exercises: [
      {
        name: "Squat",
        sets: 5,
      },
      {
        name: "Barbell Row",
        sets: 5,
      },
      {
        name: "Bench Press",
        sets: 5,
      },
    ],
  },
  {
    name: "B day",
    exercises: [
      {
        name: "Squat",
        sets: 5,
      },
      {
        name: "Overhead Press",
        sets: 5,
      },
      {
        name: "Deadlift",
        sets: 1,
      },
    ],
  },
];

const samplePrograms = [
  {
    name: "Stronglifts 5x5",
    program: [
      {
        name: "A day",
        next: true,
        exercises: [
          {
            name: "Squat",
            sets: 5,
          },
          {
            name: "Barbell Row",
            sets: 5,
          },
          {
            name: "Bench Press",
            sets: 5,
          },
        ],
      },
      {
        name: "B day",
        next: false,
        exercises: [
          {
            name: "Squat",
            sets: 5,
          },
          {
            name: "Overhead Press",
            sets: 5,
          },
          {
            name: "Deadlift",
            sets: 1,
          },
        ],
      },
    ],
  },
  /*   {
    name: "Standard program",
    program: [
      {
        name: "Push day",
        exercises: [
          {
            name: "Pushups",
            sets: 5,
          },
          {
            name: "Bench Press",
            sets: 5,
          },
        ],
      },
      {
        name: "Pull day",
        exercises: [
          {
            name: "Pullups",
            sets: 5,
          },
          {
            name: "Deadlift",
            sets: 1,
          },
        ],
      },
    ],
  }, */
];

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SelectWorkout programs={samplePrograms} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
