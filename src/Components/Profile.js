import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import "../CSS/profile.css";
import Access from "./Access";
import Lottie from "lottie-react";
import profile from "./profile.json"
import Slide from 'react-reveal/Slide';


function Profile() {
  const [fName, setfName] = useState(null);
  const [lName, setlName] = useState(null);
  const [formAns, setformAns] = useState("");
  const [skills, setSkills] = useState([]);
  const [imageUrl, setimageUrl] = useState(null);
  let token = sessionStorage.getItem("auth-token");
  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_PORT}/people/main`, {
          headers: {
            "auth-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.imageUrl) {
            setimageUrl(res.data.imageUrl);
            sessionStorage.setItem("imageUrl", res.data.imageUrl);
          } else {
            setimageUrl(
              "https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
            );
            sessionStorage.setItem("imageUrl", res.data.imageUrl);
          }
          setfName(res.data.fName);
          setlName(res.data.lName);
          if (res.data.filledForm) {
            setformAns(res.data.filledForm);
          }
          sessionStorage.setItem("fName", res.data.fName);
          sessionStorage.setItem("lName", res.data.lName);
          res.data.skills.forEach((e) => {
            setSkills((prevItems) => [...prevItems, e]);
          });
        });
    } else {
      setfName("Login Karo");
    }
  }, [token]);
  let skillList = skills.map((i) => {
    return <p key={i}>{i}</p>;
  });
  if (fName === "Login Karo") {
    return <Access />;
  } else {
    return (
      <div className="flex px-56 ">
      <Slide left>
      <div className="w-1/2">
      <Lottie className="w-[800px]" animationData={profile} loop={true} />
      </div>
      </Slide>


      <Slide right>
      <div className="  py-20 w-1/2   ">
      <div className="overall-container flex flex-col ">
      <div className="flex flex-col  justify-center">
      <img src={imageUrl} alt=""></img>
      </div>
          <div className="text-center ">
          <p className="name my-3">
          {fName} {lName}
          </p>
         
          </div>
          </div>
          <div className="text-center">Your Skills:</div>
          {skillList.length !== 0 ? (
            <>{skillList}</>
            ) : (
              <div className="text-center font-medium">Edit your profile to add Skills</div>
              )}
              <div>
              {formAns !== "" && (
                <>
                <br></br>You Have opted {formAns} as the Answer for Question asked
                </>
                )}
            </div>
            <div className="flex justify-center my-10">
            <Link className="text-center mx-auto  bg-black text-white font-bold hover:text-blue-600 px-3 py-2  rounded-lg " to="./edit">Edit Profile </Link>
            </div>
          </div>
          </Slide>
          
      </div>
    );
  }
}

export default Profile;
