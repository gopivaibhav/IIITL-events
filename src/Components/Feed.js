import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/home.css";
import axios from "axios";
import Card from "./Card";
export default function Feed() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PORT}/feeds`).then((res) => {
      setData(res.data);
    });
  }, []);
  const addEvent = () => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/add-event");
    } else {
      setError("Login to add an event");
    }
  };
  return (
    <div className="events-div">
      <div className="cards-div">
        {data.map((ele) => {
          return (
            <Card
              fName={ele.personId.fName}
              lName={ele.personId.lName}
              content={ele.content}
              venue={ele.venue}
              time={ele.time}
            />
          );
        })}
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={addEvent}>Add Event</button>
    </div>
  );
}
