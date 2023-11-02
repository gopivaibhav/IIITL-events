import React from "react";
import "../CSS/card.css";
import Zoom from 'react-reveal/Zoom';
export default function Card({ fName, lName, content, venue, time }) {
//   console.log(data);
    // console.log(name, content, "card")
  return (
    <Zoom>
    <div className=" bg-white shadow-2xl rounded-2xl px-10 py-10">
    <div className="">
    <div className="">
    <h3 className="text-xl">{venue}</h3>
          <hr className="my-1" />
          <p className="my-1">{content}</p>
          Posted by: 
          {fName} {lName}
           <br  />
           <span className="my-2">at {time}</span>
          
          </div>
      </div>
      </div>
      </Zoom>
  );
}
