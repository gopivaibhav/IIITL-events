import React from "react";
import "../CSS/card.css";
export default function Card({ fName, lName, content, venue, time }) {
//   console.log(data);
    // console.log(name, content, "card")
  return (
    <div className="card-body">
      <div className="card-container card-center">
        <div className="card">
          <h3>{venue}</h3>
          <hr />
          <p>{content}</p>
          Posted by: <br />
          <p>
            {fName} {lName}
          </p>
          at {time}
        </div>
      </div>
    </div>
  );
}
