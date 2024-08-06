import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Player/Auth/Auth";
import Play from "./components//Player/Play/Play";
import Quiz from "./components/Player/Quiz/Quiz";
import PlayerDetails from "./components/Player/PlayerDetails/PlayerDetails";
//import Level from "./components/Level/Level";
import Crossword from "./components/Player/Crossword/Crossword";
import LoadingPage from "./components/Player/Loading/LoadingPage";
import Map from "./components/Player/Map/Map";





const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/play" element={<Play />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/crossword/:id" element={<Crossword />} />
          <Route path="/playerdetails" element={<PlayerDetails />} />
          <Route path="/map" element={<Map />} />
          <Route path="/loading" element={<LoadingPage />} />
    
        </Routes>
      </div>
    </Router>
  );
};

export default App;

