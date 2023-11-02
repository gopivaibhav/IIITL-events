import React, { useState } from "react";
import axios from "axios";
import Feed from "./Feed";
import "../CSS/home.css";
import Zoom from 'react-reveal/Zoom';
import Lottie from "lottie-react";
import global from './global.json'
import Slide from 'react-reveal/Slide';

export default function Home() {
  const [other, setOther] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onChangeValue = (e) => {
    setValue(e.target.value);
    if (e.target.value === "Other") {
      setOther(true);
    } else {
      setOther(false);
    }
  };
  const submitForm = () => {
    if (value === "" || value === "Other" || value === " ") {
      setError("Game Name can not be empty");
    } else {
      if (sessionStorage.getItem("auth-token")) {
        axios
          .post(
            `${process.env.REACT_APP_PORT}/user/form`,
            {
              value: value,
            },
            {
              headers: {
                "auth-token": sessionStorage.getItem("auth-token"),
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setError(res.data);
          });
      } else {
        setError("Login to vote");
      }
    }
  };

  return (
    <>
      <div  className="flex w-full h-[800px] py-20 px-20">
      <Slide left>
      <div className="px-10 py-10 w-1/2 leading-relaxed "> 
      <h1 className="text-6xl text-blue-600 font-bold">Connecting Alumni, Celebrating Events: IIITL-EVENTS</h1>
      <p className="mt-10 w-2/3 font-light text-xl">IIITL-EVENTS: Your gateway to a vibrant college community. Seamlessly reconnect with alumni, simplify event management, and celebrate college life. </p>
      
      <p className="mt-10 w-2/3 font-light text-xl" > Join us in fostering lasting connections and memorable events. Embrace the spirit of our alma mater with this all-in-one platform, enhancing the college experience for all.</p>
      </div>
      </Slide>
      <Slide right>
      <div>
      <Lottie className="w-[800px]" animationData={global} loop={true} />
      </div>
      </Slide>
      </div>
      <div className="">
      <Zoom>
        <div className="Q-A text-black bg-white mx-auto my-10 shadow-2xl">
        
          <p className="text-black">Which Game are you most intrested in ? </p>
          <p className="text-black">(Prefer college IDs to vote) </p>
          <div onChange={onChangeValue} className="options">
            <p className="">
              <input  className="mx-3" type="radio" value="Valorant" name="game" id="valo" />
              <label  className="text-black" htmlFor="valo">Valorant</label>{" "}
            </p>
            <p>
              <input  className="mx-3" type="radio" value="CSGO" name="game" id="csgo" />
              <label  className="text-black"htmlFor="csgo"> CSGO </label>
            </p>
            <p>
              <input
                type="radio"
                value="Call of Duty"
                name="game"
                id="Call of Duty"
                className="mx-3"
              />
              <label  className="text-black" htmlFor="Call of Duty"> Call of Duty </label>
            </p>
            <p>
              <input type="radio" value="BGMI" name="game" className="mx-3" id="bgmi" />
              <label  className="text-black"htmlFor="bgmi"> BGMI </label>
            </p>
            <p className="text-black">
              <input type="radio" value="Other" className="mx-3" name="game" id="other" />
              <label className="text-black" htmlFor="other"> Other</label>{" "}
            </p>
          </div>
          {other && (
            <p>
              <input
                type="text"
                className="text-blue-600  border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write Game name"
              />
            </p>
          )}
          <button  className="px-4 py-2 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600" onClick={submitForm}>
            Submit
          </button>
          {error && <p className="error">{error}</p>}
        </div>
        </Zoom>
        <Feed />
      </div>
    </>
  );
}
