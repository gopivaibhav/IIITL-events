import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Access from "./Access";
import "../CSS/profile.css";
import { LottiePlayer } from "lottie-react";
import Lottie from "lottie-react";
import person1 from "./person.json"
import Slide from 'react-reveal/Slide';
export default function Person() {
  const [error, setError] = useState(null);
  const [fName, setfName] = useState(null);
  const [lName, setlName] = useState(null);
  const [skills, setSkills] = useState([]);
  const [imageUrl, setimageUrl] = useState(null);
  const { idForPerson } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PORT}/people/${idForPerson}`, {
        headers: {
          "auth-token": sessionStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Invalid token") {
          setError("Login to see their profile");
        } else {
          if (res.data.imageUrl) {
            setimageUrl(res.data.imageUrl);
            // sessionStorage.setItem("imageUrl", res.data.imageUrl);
          } else {
            setimageUrl(
              "https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
            );
            // sessionStorage.setItem("imageUrl", res.data.imageUrl);
          }
          setfName(res.data.fName);
          // sessionStorage.setItem("fName", res.data.fName);
          // sessionStorage.setItem("lName", res.data.lName);
          setlName(res.data.lName);
          res.data.skills.forEach((e) => {
            setSkills((prevItems) => [...prevItems, e]);
          });
        }
      });
  }, [idForPerson]);
  // const addFrnd=()=>{
  //     axios.post(`${process.env.REACT_APP_PORT}/user/addfrnd`,{
  //         frndId:idForPerson
  //     }, {
  //         headers: {
  //             'auth-token': sessionStorage.getItem('auth-token')
  //         }
  //     }).then((res) => {
  //         console.log(res.data)
  //     })
  // }
  let skillList = skills.map((i) => {
    return <p key={i}>{i}</p>;
  });
  if (error) {
    return <Access />;
  } else {
    return (
      <>
      
        {fName && (
          <div className="flex  pt-10 px-40 gap-x-[200px]">
          <Slide left>
          <div>
          <Lottie className="w-[800px]" animationData={person1} loop={true} />
          </div>
          </Slide>
          <Slide right>
            <div className="flex flex-col pt-20 items-center ">
              <div className="">
                <img src={imageUrl} alt=""></img>
              </div>
              <div>
                <p className="name mb-10 mt-2">
                  {fName} {lName}
                </p>
                {/* <a href='#' onClick={addFrnd}>Add Friend </a> */}
              </div>
              <p><a className="px-4 py-2 mt-10 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600 my-10" href={`/ChitChat/${idForPerson}`}>Wanna Text him?</a></p>
              <div className="my-10">
              {skillList}
              <div>His Skills:</div>
              </div>
              </div>
              </Slide>
          </div>
        )}
      </>
    );
  }
}
