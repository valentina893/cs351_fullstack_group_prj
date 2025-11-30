import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let debounceTimer = null;

  // Autocomplete
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      if (!value) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/autocomplete?query=${encodeURIComponent(value)}`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error(err);
      }
    }, 250);
  };

  // Search backend
  const runSearch = async (value) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/search?query=${encodeURIComponent(value)}&max_results=5`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleClick = () => {
      setSuggestions([]);
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSelect = (value) => {
    setSuggestions([]);

    setQuery((prev) => {

      const words = prev.trim().split(/\s+/);
      words[words.length - 1] = value;

      const newQuery = words.join(" ");
      runSearch(newQuery);
      return newQuery

    });
    
    runSearch(value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setSuggestions([]);
      runSearch(query);
    }
  };

  const backButton = {
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
            overflowX: "hidden",   // prevents dropdown from leaking out horizontally
          }}
        >
          <div
            style={{
              width: "98%",       // was "600px"
              //maxWidth: "800px",  // wider desktop screen
              backgroundColor: "#081317",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              position: "relative",  // ensures dropdown stays inside this container
            }}
          >

            <div style={{display: "flex", justifyContent: "space-between"}}>

              <h2 style={{ marginBottom: "20px" }}>Search</h2>

              <button
                style={backButton}
                onClick={() => navigate('/home')}
              > Back </button>
              
            </div>

        {/* Search Bar */}
        <div style={{ position: "relative", width: "100%" }}>
          <input
            value={query}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder="Search events..."
            style={{
              width: "80%",
              padding: "12px 15px",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#1c1f24",
              color: "white",
              outline: "none",
            }}
          />

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                width: "100%",
                top: "100%",
                left: 0,
                backgroundColor: "#1c1f24",
                color: "white",
                listStyle: "none",
                padding: 0,
                marginTop: "4px",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid #333",
              }}
            >
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(s)}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    borderBottom:
                      index !== suggestions.length - 1
                        ? "1px solid #333"
                        : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "rgba(255,255,255,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Results */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "10px" }}>Results</h3>

          {loading && <p>Searching...</p>}

          {results.map((event, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                padding: "15px",
                borderRadius: "6px",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: 0 }}>{event.title}</h4>
              <p style={{ marginTop: "8px" }}>
                {event.snippet || "No description available."}
              </p>
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#4fa3ff" }}
                >
                  More Info
                </a>
              )}
            </div>
          ))}

          {!loading && results.length === 0 && (
            <p style={{ opacity: 0.6 }}>No results yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
