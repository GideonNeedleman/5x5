import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SelectWorkout from "./pages/SelectWorkout";

function App() {
  const router = createBrowserRouter();
  return (
    <>
      <Header />
      <SelectWorkout />
    </>
  );
}

export default App;
