import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SelectWorkout from "./pages/SelectWorkout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DoWorkout from "./pages/DoWorkout";
import { GlobalContextProvider } from "./context/GlobalContext";
import History from "./pages/History";

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
        next: false,
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
      {
        name: "Legs",
        id: 5,
        next: false,
        exercises: [
          {
            name: "Squats",
            sets: 5,
          },
          {
            name: "Leg Press",
            sets: 1,
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <GlobalContextProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SelectWorkout programs={samplePrograms} />}
          />
          <Route path="/workout" element={<DoWorkout />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
