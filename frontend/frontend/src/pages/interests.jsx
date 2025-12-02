import React, { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';

const InterestsPage = () => {
    const navigate = useNavigate();

    // const [error, setError] = useState("");

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

    const interests = {
      "Sports": sportInterests,
      "Food": foodIntersests,
      "Computer Science": csInterests,
      "Wellness/Health": healthInterests,
      "Music": musicInterests,
      "Art": artInterests,
    };

    // const interests = [
    //   "Sports",
    //   "Food",
    //   "Computer Science",
    //   "Wellness/ Health",
    //   "Music",
    //   "Art",
    // ];

    const [options, setOptions] = useState([])
    // const [interests, setInterests] = useState([])

    useEffect(() => {
      const fetchOptions = async() => {
        try {
          const response = await fetch("http://localhost:5000/interests", {
            method: "GET",
            credentials: "include"
          })

          const data = await response.json()
          setOptions(data)

          console.log("Received interests from backend: ", data);
          
        } catch (err) {
          console.error("Error fetching interest: ", err)
        }
      }

      fetchOptions()

    }, [])

    const [list, chosenOptions] = useState([])
    const[error, setError] = useState("")

    // const [allSelected, setSelected] = useState([]);

    // function handleMultipleOptions(subInterests, e){
    //   const selectedFromCategory = Array.from(
    //     e.target.selectedOptions,
    //     (o) => o.value
    //   )

    //   setSelected(prev => {
    //     const removeFromThisCategory = prev.filter(
    //       (item) => !subInterests.includes(item)
    //     )

    //     return [...removeFromThisCategory, ...selectedFromCategory]
    //   })
    // }

    // return(
    //   <div style={{
    //     // width: "50v",
    //     height: "100vh",
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#282c34',
    //   }}>
    //     <label>Select from Catagories</label>

    //     <div className="scroll-box">
    //       {Object.entries(interests).map(([key, subInterests], index) => (
    //         <div key={index} style={{marginBottom: "12px"}}>
    //           <label>{key}</label>

    //           <select
    //             multiple
    //             onChange={(e) => handleMultipleOptions(subInterests, e)}
    //             style={{width: "100%", marginTop: "5px"}}
    //           >
    //             {subInterests.map((subInt, i) => (
    //               <option key={i} value={subInt}>
    //                 {subInt}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //       ))}
    //     </div>

    //     <h3>All selected:</h3>
    //     <pre>{JSON.stringify(allSelected, null, 2)}</pre>

    //     <button
    //       onClick={() => navigate('/home')}
    //       style={{
    //         width: '254px',
    //         height: '40px',
    //         backgroundColor: '#ffffffff',
    //         color: '#081317',
    //         border: 'none',
    //         borderRadius: '4px',
    //         cursor: 'pointer',
    //         fontSize: '16px',
    //       }}
    //     >
    //       Confirm
    //     </button>
    //   </div>
    // )

    const [selected, setSelected] = useState(new Set());


    const handleClick = (interest) => {
      const updated = new Set(selected);
      if(updated.has(interest)) {
        updated.delete(interest);
        // chosenOptions.remove(interest)

      }
      else{
        updated.add(interest);
        // chosenOptions.add(interest)
      }
      setSelected(updated);
    }

    const sendInterests = async () =>{
      const selectedInterests = Array.from(selected)

      // const query = new URLSearchParams({
      //   selected: selectedInterests.join(",")
      // })

      try{
        const res = await fetch("http://localhost:5000/add_interests", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          credentials: "include",
          body: JSON.stringify({
            interests: selectedInterests
          })
        })

        const data = await res.json();

        if (!res.ok) {

          setError(/*data.error || */"Sending Error");
          return;
        }

        console.log("Server response:", data);
        navigate('/home')

      } catch (err) {
        console.error("Sending Error", err);
      }
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
            height: "300px",
            overflowY: "auto",
            paddingRight: "5px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "10px",
              justifyItems: "center",
            }}
          >
            {Object.entries(interests).map(([category, interestList]) =>(
              <div key={category}>
                <h3 
                  style={{
                    marginBottom: "10px",
                    color: "white"
                  }}
                > 
                  {category} 
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                    justifyItems: "center",
                  }}
                >
                  {interestList.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleClick(interest)}
                      style={{
                        width: "115px",
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

                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div
          style={{
            gridColumn: "1/ span 3",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px"
          }}
        >
          <button
            onClick={async () => {
              await sendInterests()
              // navigate('/home')
            }}
            style={{
              width: '254px',
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
  )
}

export default InterestsPage;