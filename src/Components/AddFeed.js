import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/login.css";

export default function AddFeed() {
  const [content, setContent] = useState("");
  const [registration, setRegistration] = useState("");
  const [venue, setVenue] = useState("");
  const [error, setError] = useState("");
  const sendRequest = () => {
    if (sessionStorage.getItem("auth-token")) {
      axios
        .post(
          `${process.env.REACT_APP_PORT}/feeds`,
          {
            content: content,
            registration: registration,
            venue: venue,
          },
          {
            headers: {
              "auth-token": sessionStorage.getItem("auth-token"),
            },
          }
        )
        .then((res) => {
            window.location.href = '/'
          // setError(res.data);
        });
    } else {
      setError("Login to set an event");
    }
  };
  return (
    <div className="login-container">
      <div className="feed-form">
        <div className="feed-inputs inner-container">
        <input type="text" placeholder="Venue of event" onChange={(e) => setVenue(e.target.value)} />
        <input type="text" placeholder="Registration method" onChange={(e) => setRegistration(e.target.value)} />
        <input type="text" placeholder="Description of Event" onChange={(e) => setContent(e.target.value)} />
        </div>
        <button onClick={sendRequest}>
            Submit
            <span className="first"></span>
            <span className="second"></span>
            <span className="third"></span>
            <span className="fourth"></span>
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
