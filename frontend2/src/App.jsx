import { useState } from 'react'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? (
        <Dashboard />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App
