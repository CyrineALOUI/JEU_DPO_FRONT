import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Player/Auth/Auth";



import Play from "./components/Play/Play";
import Map from "./components/Map/Map";
import Quiz from "./components/Games/Quiz/Quiz";




import Crossword from "./components/Games/Crossword/Crossword";






const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/play" element={<Play />} />
          <Route path="/map" element={<Map />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/crossword/:id" element={<Crossword />} />
          
    
    
        </Routes>
      </div>
    </Router>
  );
};

export default App;

