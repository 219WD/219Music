import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpinnerLoader from "./components/SpinnerLoader";
import NavigationOverlay from "./components/NavigationOverlay"; 
import "./App.css";

const HomeScreen = lazy(() => import("./pages/HomeScreen"));

const App = () => {
  return (
    <Suspense fallback={<SpinnerLoader />}>
      <Router>
        {/* <NavigationOverlay /> */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
