import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate,useLocation } from "react-router-dom";
import Home from './home/Home';
import Autoreply from './autoreply/Autoreply';
import Sendmsg from './sendmessage/Sendmsg';
import Login from './login/login';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    
    <>
       <Router>
        <Routes>
        <Route exact path="/autoreply" element={<Autoreply />} />
         <Route exact path="/sentmsg" element={<Sendmsg />} />

         <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
         <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Home />} />
        </Routes>
        </Router>

    </>

  )
}

export default App