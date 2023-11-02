import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/home.css";
import axios from "axios";
import Card from "./Card";
import Zoom from 'react-reveal/Zoom';
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
    <div className=" my-10 text-center items-center">
    <h1 className="text-3xl my-10">Events</h1>
    {data.length==0?<div> No events now</div>:<div></div>}
      <div className="grid grid-flow-row gap-x-10 gap-y-10 grid-cols-3  px-40">
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
      <Zoom>
      {error && <p className="error">{error}</p>}
      <button className="px-4 py-2 mx-auto border-black rounded-md bg-black text-white font-semibold hover:text-blue-600" onClick={addEvent}>Add Event</button>
      </Zoom>
    </div>
  );
}
