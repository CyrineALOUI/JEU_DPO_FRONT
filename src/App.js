import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Player/Auth/Auth";
import Play from "./components/Play/Play";
import Quiz from "./components/Quiz/Quiz";




const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          {/*<Route path="/register" element={<Register />} />*/}
          {/*<Route path="/login" element={<Login />} />*/}
          <Route path="/auth" element={<Auth />} />
          <Route path="/play" element={<Play />} />
          <Route path="/quiz/:id" element={<Quiz />} />
    
        </Routes>
      </div>
    </Router>
  );
};

export default App;

