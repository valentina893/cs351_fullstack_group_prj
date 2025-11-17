import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import PrivateRoute from './components/route';
import SignupPage from './pages/signUp';
import IntrestsPage from './pages/Intrestspage';
import HomePage from './pages/home';
import SearchPage from './pages/search';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/Intrests" element={<IntrestsPage />}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/Search" element={< SearchPage/>}/>
      {/* <Route 
        path="/" 
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } 
      />   */}
    </Routes>
  );
}

export default App;
