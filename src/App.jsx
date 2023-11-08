import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SelectWorkout from "./pages/SelectWorkout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DoWorkout from "./pages/DoWorkout";

const samplePrograms = [
  {
    name: "Stronglifts 5x5",
    workouts: [
      {
        name: "A day",
        id: 1,
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
        id: 2,
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
    workouts: [
      {
        name: "Push day",
        id: 3,
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
        id: 4,
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
          <Route path="/workout" element={<DoWorkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
