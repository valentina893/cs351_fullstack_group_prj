import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
  
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
  
      console.log("User registered:", data);
      navigate('/Interests');   // ✔ correct redirect
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server.");
    }
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '15px' }}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              required
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
              required
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
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '10px'
            }}
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Back to Login
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

export default SignupPage;
