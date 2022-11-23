import React, { useState } from "react";
import axios from "axios";
import Feed from "./Feed";
import "../CSS/home.css";

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
      <div className="Q-A">
        <p>Which Game are you most intrested in ? </p>
        <p>(Prefer college IDs to vote) </p>
        <div onChange={onChangeValue} className="options">
          <p>
            <input type="radio" value="Valorant" name="game" id="valo" />
            <label htmlFor="valo">Valorant</label>{" "}
          </p>
          <p>
            <input type="radio" value="CSGO" name="game" id="csgo" />
            <label htmlFor="csgo"> CSGO </label>
          </p>
          <p>
            <input
              type="radio"
              value="Call of Duty"
              name="game"
              id="Call of Duty"
            />
            <label htmlFor="Call of Duty"> Call of Duty </label>
          </p>
          <p>
            <input type="radio" value="BGMI" name="game" id="bgmi" />
            <label htmlFor="bgmi"> BGMI </label>
          </p>
          <p>
            <input type="radio" value="Other" name="game" id="other" />
            <label htmlFor="other"> Other</label>{" "}
          </p>
        </div>
        {other && (
          <p>
            <input
              type="text"
              className="text"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write Game name"
            />
          </p>
        )}
        <button onClick={submitForm}>
          Submit
          <span className="first"></span>
          <span className="second"></span>
          <span className="third"></span>
          <span className="fourth"></span>
        </button>
        {error && <p className="error">{error}</p>}
      </div>
      <Feed />
    </>
  );
}
