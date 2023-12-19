import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import History from "./pages/History";
import Workout from "./pages/Workout";
import Review from "./pages/Review";
// import Toaster from "./features/toasts/Toaster";
import Builder from "./pages/Builder";
import BuildExercise from "./features/builder/BuildExercise";
import BuildWorkout from "./features/builder/BuildWorkout";
import BuildProgram from "./features/builder/BuildProgram";
import AddScreen from "./pages/AddScreen";
import EditProgram from "./features/edit/EditProgram";
import EditWorkout from "./features/edit/EditWorkout";
import EditExercise from "./features/edit/EditExercise";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Header />
        {/* <Toaster /> */}
        <Routes>
          <Route path="/" element={<Workout />} />
          <Route path="/history" element={<History />} />
          <Route path="/review" element={<Review />} />
          <Route path="/add-program-workout" element={<AddScreen />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/build-exercise" element={<BuildExercise />} />
          <Route path="/build-workout" element={<BuildWorkout />} />
          <Route path="/build-program" element={<BuildProgram />} />
          <Route path="/edit-program/:id" element={<EditProgram />} />
          <Route path="/edit-workout/:id" element={<EditWorkout />} />
          <Route path="/edit-exercise/:id" element={<EditExercise />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
