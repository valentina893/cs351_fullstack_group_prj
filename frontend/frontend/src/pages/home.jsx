import React, { useRef, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const infoRef = useRef(null);
  const [interests, setInterests] = useState([]);
  const [eventsByInterest, setEventsByInterest] = useState({});
  const navigate = useNavigate();

  // Search events for a single interest
  const searchEvents = async (interest) => {
    const response = await fetch(
      `http://localhost:5000/search?query=${encodeURIComponent(interest)}&max_results=3`,
      { credentials: "include" }
    );
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    return data.results; // array of events
  };

  // Fetch events for all interests and group by interest
  const fetchEvents = async (interests) => {
    const groupedEvents = {};
    for (const interest of interests) {
      const results = await searchEvents(interest);
      groupedEvents[interest] = results;
    }
    setEventsByInterest(groupedEvents);
  };

  useEffect(() => {
    const fetchInterests = async() => {
      try {
        const response = await fetch("http://localhost:5000/interests", {
          methond: "GET",
          credentials: "include"
        })

        const data = await response.json()
        console.log("Backend data:", data, Array.isArray(data))
        setInterests(data)

        console.log("Received interests from backend: ", data);
      } catch (err) {
        console.error("Error fetching interests: ", err)
      }
    }
    fetchInterests()

    // fetchEvents()
  }, [])

  useEffect(() => {
    if(interests.length > 0) {
      fetchEvents(interests)
    }
  }, [interests])
  
  // Handle clicks outside popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    }

    if (showInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInfo]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include"
      });

      const data = await response.json();
      console.log("Logout: ", data);

      localStorage.removeItem("user_id");
      sessionStorage.clear();

      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  const eventButton = {
    padding: "35px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    cursor: "pointer",
  };

  const searchButton = {
    width: "120px",
    height: "50px",
    fontSize: "16px",
    borderRadius: "100px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    cursor: "pointer",
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#282c34",
        display: "flex",
        justifyContent: "center",
        color: "white",
        overflowX: "hidden", 
      }}
    >

      <div
        style={{
          width: "98%",       // was "600px"
          backgroundColor: "#081317",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          position: "relative",  // ensures dropdown stays inside this container
        }}
      >

        <div style={{display: "flex", justifyContent: "space-between"}}>

          <h2 style={{ color: "white", marginBottom: "20px" }}>Hello User</h2>

          <div style={{display: "flex", gap: "10px", justifyContent: "space-between"}}>
            <button
              style={searchButton}
              onClick={logout}
            >Log Out</button>

            <button
              style={searchButton}
              onClick={() => navigate('/search')}
            >Search</button>

          </div>
        </div>

        {/* Render events grouped by interest */}
        {interests.map((interest) => (
          <div key={interest} style={{ marginBottom: "30px" }}>
            <div
              style={{
                width: "80%",
                padding: "10px 15px",
                textAlign: "left",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              {interest}
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {(eventsByInterest[interest] || []).map((event, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowInfo(true);
                  }}
                  style={eventButton}
                >
                  {event.title || "Untitled Event"}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Event Info Popup */}
        {showInfo && selectedEvent && (
          <div
            ref={infoRef}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              color: "black",
              padding: "40px 60px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <h3>{selectedEvent.title}</h3>

            <div
              style={{
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              <p>{selectedEvent.snippet || "No description available"}</p>
            </div>
            
            {selectedEvent.url && (
              <a href={selectedEvent.url} target="_blank" rel="noreferrer">
                More Info
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
