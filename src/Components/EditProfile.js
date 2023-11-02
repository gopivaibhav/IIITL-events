import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../CSS/profile.css";
import edit from "./edit.json"
import Lottie from "lottie-react";
import Slide from 'react-reveal/Slide';
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
      <p key={i} className="rounded-2xl  bg-white  shadow-2xl  py-3 w-[200px]">
        {i} <span>X</span>
      </p>
    );
  });
  return (
    <div className="flex px-40 gap-x-80">
    <Slide left>
    <div>
    <Lottie className="w-[800px]" animationData={edit} loop={true} />
    </div>
    </Slide>
    <Slide right>
   
      <div className="outer-container">
        <h1 className="text-3xl ">EDIT PROFILE</h1>
        <p className="font-semibold text-xl">
          First Name :{" "}
          <input
            type="text"
            ref={First}
            className="bg-white mx-4  shadow-xl rounded-xl  border-[1px] text-blue-600 px-2 py-3 my-10 font-bold text-xl w-[300px]"
            onChange={(e) => setfName(e.target.value)}
          ></input>
         <br />
          Last Name :{" "}
          <input
            type="text"
            ref={Last}
            className="bg-white mx-4 shadow-xl rounded-xl  border-[1px] text-blue-600 px-2 py-3 my-10 font-bold text-xl w-[300px]"
            onChange={(e) => setlName(e.target.value)}
          ></input>
        </p>
        <div className="skills font-semibold">Skills You selected: {skillList}</div>
        <select onChange={skillChange} className="px-5 py-3 bg-white shadow-2xl rounded-2xl">
          <option value="Web Development">Web Development</option>
          <option value="App Development">App Development</option>
          <option value="AI-ML">AI-ML</option>
          <option value="CyberSecurity">CyberSecurity</option>
          <option value="Design">Design</option>
          <option value="Content">Content</option>
        </select>
        <button className="px-4 py-2 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600 my-10"  onClick={handleClick}>
          Submit
        </button>
      </div>
      </Slide>
    </div>
  );
}
