import React, { useState } from "react"
import {useNavigate} from 'react-router-dom';


const IntrestsPage = () => {
    const navigate = useNavigate();

    const interest = [
      "Sports",
      "Food",
      "Computer Science",
      "Wellness/ Health",
      "Music",
      "Art",
    ];

    const [selected, setSelected] = useState(new Set());

    const handleClick = (interest) => {
      const updated = new Set(selected);
      if(updated.has(interest)) {
        updated.delete(interest);
      }
      else{
        updated.add(interest);
      }
      setSelected(updated);
    }

    return(
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
          backgroundColor: '#081317', 
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          width: '400px',
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: "white"
        }}>
          Select a Few Interests</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            justifyItems: "center",
          }}
        >
          {interest.map((interest) =>(
            <button
              key={interest}
              onClick={() => handleClick(interest)}
              style={{
                width: "85px",
                height: "60px",
                backgroundColor: selected.has(interest) ? "#1e1e1e" : "#ffffff",
                color: selected.has(interest) ? "#ffffff" : "#081317",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              >
                {interest}
              </button>
            ))}

            <div
              style={{
                gridColumn: "1/ span 3",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
              }}
            >
              <button
                onClick={() => navigate('/search')}
                style={{
                  width: '154px',
                  height: '40px',
                  backgroundColor: '#ffffffff',
                  color: '#081317',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Confirm
              </button>
            </div>
        </div>
      </div>
    </div>
  )

}

export default IntrestsPage;