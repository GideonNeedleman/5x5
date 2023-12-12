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
          <Route path="/builder" element={<Builder />} />
          <Route path="/build-exercise" element={<BuildExercise />} />
          <Route path="/build-workout" element={<BuildWorkout />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
