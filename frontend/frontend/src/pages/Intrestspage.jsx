import React, { useState } from "react"
import {useNavigate} from 'react-router-dom';

const IntrestsPage = () => {
    const navigate = useNavigate();

    const interests = [
      "Sports",
      "Food",
      "Computer Science",
      "Wellness/ Health",
      "Music",
      "Art",
    ];

    const sportInterests = [
      "Basketball",
      "Football",
      "Soccer",
      "Tennis",
      "Baseball",
      "Hockey"
    ]

    const foodIntersests = [
      "Fast Food",
      "Chinese",
      "Sandwich",
      "Indian",
      "Italian",
      "Ice Cream",
      "Mexican"
    ]

    const csInterests = [
      "Software Development",
      "Software Engineering",
      "Cybersecurity",
      "Hackathons",
      "Interview Practice",
      "Data Science"
    ]

    const healthInterests = [
      "Recreation",
      "Counseling",
      "Food Assistance",
    ]

    const musicInterests = [
      "Concerts",
      "Jazz",
      "Symphonic Band",
      "Orchestra",
      "Choir",
      "Percussion"
    ]

    const artInterests = [
      "History",
      "Exhibitions",
      "Art Fests",
      "Galleries"
    ]

    

    const styles = {
      container: {
        width: '200px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
      },
      scrollBox: {
        maxHeight: '100px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
      },
      option: {
        padding: '8px',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
      },
    };

    const scrollInterests = ({ interests }) => {
      return (
        <div style={styles.container}>
          <h2>Select a Few Interests</h2>
          <div style={styles.scrollBox}>
            {interests.map((interest, index) => (
              <div key={index} style={styles.interest}>
                {interest}
              </div>
            ))}
          </div>
        </div>
      )
    }

    const [selected, setSelected] = useState(new Set());

    const handleClick = (interests) => {
      const updated = new Set(selected);
      if(updated.has(interests)) {
        updated.delete(interests);
      }
      else{
        updated.add(interests);
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
          {interests.map((interests) =>(
            <button
              key={interests}
              onClick={() => handleClick(interests)}
              style={{
                width: "85px",
                height: "60px",
                backgroundColor: selected.has(interests) ? "#1e1e1e" : "#ffffff",
                color: selected.has(interests) ? "#ffffff" : "#081317",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              >
                {interests}
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
                onClick={() => navigate('/home')}
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