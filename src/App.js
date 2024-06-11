import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Player/Auth/Auth";




const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          {/*<Route path="/register" element={<Register />} />*/}
          {/*<Route path="/login" element={<Login />} />*/}
          <Route path="/auth" element={<Auth />} />
    
        </Routes>
      </div>
    </Router>
  );
};

export default App;

