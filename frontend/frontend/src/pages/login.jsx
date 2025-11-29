import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(""); 

  // Log when component mounts to confirm it's rendering
  React.useEffect(() => {
    console.log("LoginPage mounted");
  }, []);

  const handleLogin = async (event) => {
    console.log("handleLogin triggered"); 
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid credentials.");
        return;
      }

      localStorage.setItem("user_id", data.user_id);

      console.log("Logged in:", data);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server.");
    }
  };

  const goToSignup = () => {
    navigate('/signup'); 
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282c34', 
      }}
    >
      <div
        style={{
          backgroundColor: 'white', 
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          minWidth: '320px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Please Log in</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '10px'
            }}
          >
            Login
          </button>
        </form>
        <button
          onClick={goToSignup}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Sign Up
        </button>
        {error && (
          <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
