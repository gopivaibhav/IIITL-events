import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/login.css";
import Lottie from "lottie-react";
import event from "./event.json"
import Slide from 'react-reveal/Slide';
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
    <div className="flex py-20 px-40 gap-x-[200px]">
    <Slide left>
    <div>
    <Lottie className="w-[800px]" animationData={event} loop={true} />
    </div>
    </Slide>
    <Slide right>
    <div className=" shadow-2xl h-fit w-full  px-20 py-16 rounded-xl">
    <h1 className="text-3xl text-center mb-4 first-letter:">ADD EVENT</h1>
    <div className="feed-form">
    <div className="feed-inputs inner-container">
    <input type="text" className="bg-white mx-4  shadow-xl rounded-xl  border-[1px] text-blue-600 px-2 py-3 my-10 font-bold text-xl w-[300px]"
     placeholder="Venue of event" onChange={(e) => setVenue(e.target.value)} />
     <input type="text" className="bg-white mx-4  shadow-xl rounded-xl  border-[1px] text-blue-600 px-2 py-3 my-10 font-bold text-xl w-[300px]"
     placeholder="Registration method" onChange={(e) => setRegistration(e.target.value)} />
     <input type="text" className="bg-white mx-4  shadow-xl rounded-xl  border-[1px] text-blue-600 px-2 py-3 my-10 font-bold text-xl w-[300px]"
     placeholder="Description of Event" onChange={(e) => setContent(e.target.value)} />
     </div>
     <button onClick={sendRequest} className="px-4 py-2 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600 my-10">
     Submit
     <span className="first"></span>
     <span className="second"></span>
     <span className="third"></span>
     <span className="fourth"></span>
     </button>
     </div>
     {error && <p className="error">{error}</p>}
     </div>
     </Slide>
    </div>
  );
}
