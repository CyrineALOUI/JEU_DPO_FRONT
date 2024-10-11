import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Player/Auth/Auth";
import Play from "./components/Play/Play";
import Map from "./components/Map/Map";
import Quiz from "./components/Games/Quiz/Quiz";
import Crossword from "./components/Games/Crossword/Crossword";
import ProfileModal from "./components/Settings/Profile/ProfileModal";
import { ScoreProvider } from "./components/GameHeader/Score/ScoreContext";
import Hint from "./components/Hint/Hint";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./components/Player/Auth/ResetPassword/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/*"
            element={
              <ScoreProvider>
                <Routes>
                  <Route path="/play" element={<PrivateRoute element={<Play />} />} />
                  <Route path="/map" element={<PrivateRoute element={<Map />} />} />
                  <Route path="/quiz/:id" element={<PrivateRoute element={<Quiz />} />} />
                  <Route path="/crossword/:id" element={<PrivateRoute element={<Crossword />} />} />
                  <Route path="/ProfileModal" element={<PrivateRoute element={<ProfileModal />} />} />
                  <Route path="/hint" element={<PrivateRoute element={<Hint />} />} />
                </Routes>
              </ScoreProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
