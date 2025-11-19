import React, { useRef, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const infoRef = useRef(null);
  const [interests, setInterests] = useState([]);
  const [eventsByInterest, setEventsByInterest] = useState({});
  const navigate = useNavigate();

  // // Fetch user interests and events
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/interests", { credentials: "include" });
  //       if (!res.ok) throw new Error("Not logged in");
  //       const data = await res.json();
  
  //       setInterests(data.interests || []);
  //       await fetchEvents(data.interests || []);
  //     } catch (err) {
  //       console.error("Failed to fetch interests:", err);
  //     }
  //   };
  //   loadData();
  // }, []);
  

  // // Search events for a single interest
  // const searchEvents = async (interest) => {
  //   const response = await fetch(
  //     `http://localhost:5000/search?query=${encodeURIComponent(interest)}&max_results=3`,
  //     { credentials: "include" }
  //   );
  //   if (!response.ok) throw new Error("Search failed");
  //   const data = await response.json();
  //   return data.results; // array of events
  // };

  // // Fetch events for all interests and group by interest
  // const fetchEvents = async (interests) => {
  //   const groupedEvents = {};
  //   for (const interest of interests) {
  //     const results = await searchEvents(interest);
  //     groupedEvents[interest] = results;
  //   }
  //   setEventsByInterest(groupedEvents);
  // };
    // Dummy data
    useEffect(() => {
      const dummyInterests = ["Sports", "Movies", "Music"];
      const dummyEvents = {
        Sports: [
          { title: "Football Match", snippet: "Local football game.", url: "#" },
          { title: "Basketball Tournament", snippet: "City-wide tournament.", url: "#" },
        ],
        Movies: [
          { title: "Movie Night", snippet: "Screening at the park.", url: "#" },
          { title: "Film Festival", snippet: "Annual film fest.", url: "#" },
        ],
        Music: [
          { title: "Jazz Concert", snippet: "Live jazz music.", url: "#" },
          { title: "Rock Band", snippet: "Outdoor concert.", url: "#" },
        ],
      };
  
      setInterests(dummyInterests);
      setEventsByInterest(dummyEvents);
    }, []);
  
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
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#282c34",
        // paddingTop: "40px",
        overflow: "auto"
      }}
    >

      <div
        style={{
          backgroundColor: "#081317",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          width: "100%",
          height: "100vh",
          boxSizing: "border-box",
          padding: "20px"
        }}
      >

        <div style={{display: "flex", justifyContent: "space-between"}}>

          <h2 style={{ color: "white", marginBottom: "20px" }}>Hello User</h2>

          <button
            style={searchButton}
            onClick={() => navigate('/search')}
          >Search</button>

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
            <p>{selectedEvent.snippet || "No description available"}</p>
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
