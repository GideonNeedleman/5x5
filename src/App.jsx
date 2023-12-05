import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import History from "./pages/History";
import Workout from "./pages/Workout";
import Review from "./pages/Review";
import Toaster from "./features/toasts/Toaster";

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
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
