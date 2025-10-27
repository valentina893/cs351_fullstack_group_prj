import React, { useRef, useState, useEffect } from "react";


const HomePage = () => {

      const [showInfo, setShowInfo] = useState(false);
      const infoRef = useRef(null);

      useEffect(() => {
        function handleClickOutside(event){
          if(infoRef.current && !infoRef.current.contains(event.target)){
            setShowInfo(false);
          }
        }

        if(showInfo){
          document.addEventListener("mousedown", handleClickOutside);
        }
        else{
          document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [showInfo]);

      const eventButton = {
        padding: "35px",
        fontSive: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        backgroundColor: "#ffffff",
        cursor: "pointer",
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
          //   width: "0px",
            backgroundColor: '#081317', 
            // padding: '1px 0px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            width: '600px',

          }}
        >

          <h2 style={{
            textAlign: 'left',
            marginTop: '30px',
            marginLeft: '30px',
            color: "white",
          }}>
            Hello User
          </h2>

          
          <div 
            style={{
              width: "600px",
              paddingLeft: "0x",
              textAlign: 'left',
              marginTop: '20px',
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.06)"
          }}>
            This Week
          </div>
          
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginBottom: "40px",
              marginLeft: '30px',
              marginTop: '15px'
            }}
          >
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
          </div>

          <div 
            style={{
              width: "600px",
              paddingLeft: "0x",
              textAlign: 'left',
              marginTop: '20px',
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.06)"
          }}>
            More Events
          </div>
          
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginBottom: "40px",
              marginLeft: '30px',
              marginTop: '15px'
            }}
          >
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
            <button
              onClick={() => setShowInfo(true)}
              style={eventButton}>Event</button>
          </div>

          {showInfo && (
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
              <h3>Event Info</h3>
            </div>
          )}

        </div>
      </div>
        
        
    );


}

export default HomePage;