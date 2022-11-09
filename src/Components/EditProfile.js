import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../CSS/profile.css";
export default function EditProfile() {
  const [fName, setfName] = useState();
  const [lName, setlName] = useState();
  const [skills, setSkills] = useState([]);
  const First = useRef();
  const Last = useRef();
  useEffect(() => {
    setfName(sessionStorage.getItem("fName"));
    setlName(sessionStorage.getItem("lName"));
    First.current.value = sessionStorage.getItem("fName");
    Last.current.value = sessionStorage.getItem("lName");
  }, []);

  const handleClick = () => {
    if (fName !== "" || fName !== " ") {
      axios
        .post(
          `${process.env.REACT_APP_PORT}/user/edit`,
          {
            fName: fName,
            lName: lName,
            skills: skills,
          },
          {
            headers: {
              "auth-token": sessionStorage.getItem("auth-token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data === "updated succesfully") {
            window.location.href = "/";
          }
        });
    }
  };
  const skillChange = (e) => {
    let check = skills.find((i) => {
      return i === e.target.value;
    });
    if (check === undefined) {
      setSkills((prevItems) => [...prevItems, e.target.value]);
    }
  };
  let skillList = skills.map((i) => {
    return (
      <p key={i}>
        {i} <span>X</span>
      </p>
    );
  });
  return (
    <>
      <div className="outer-container">
        <p>
          First Name :{" "}
          <input
            type="text"
            ref={First}
            onChange={(e) => setfName(e.target.value)}
          ></input>
        </p>
        <p>
          Last Name :{" "}
          <input
            type="text"
            ref={Last}
            onChange={(e) => setlName(e.target.value)}
          ></input>
        </p>
        <div className="skills">Skills You selected: {skillList}</div>
        <select onChange={skillChange}>
          <option value="Web Development">Web Development</option>
          <option value="App Development">App Development</option>
          <option value="AI-ML">AI-ML</option>
          <option value="CyberSecurity">CyberSecurity</option>
          <option value="Design">Design</option>
          <option value="Content">Content</option>
        </select>
        <button onClick={handleClick}>
          Submit
          <span className="first"></span>
          <span className="second"></span>
          <span className="third"></span>
          <span className="fourth"></span>
        </button>
      </div>
    </>
  );
}
