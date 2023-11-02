import React, { useState, useEffect } from "react";
import axios from "axios";
import Access from "./Access";

export default function Text() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      axios
        .get(`${process.env.REACT_APP_PORT}/user/view`, {
          headers: {
            "auth-token": sessionStorage.getItem("auth-token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data !== "NTG") {
            res.data.forEach((e) => {
              setItems((prevItems) => [...prevItems, e]);
            });
          }
        });
    }
  }, []);

  const submitMsg = () => {
    if (text !== "") {
      axios
        .post(
          `${process.env.REACT_APP_PORT}/user/msg`,
          {
            sender: "You",
            msg: text,
          },
          {
            headers: {
              "auth-token": sessionStorage.getItem("auth-token"),
            },
          }
        )
        .then((res) => {
          window.location.href = "/text";
        });
    } else {
      setError("Message can't be empty");
    }
  };

  const list = items.map((i) => {
    if (i.sender === "You") {
      return (
        <p key={i._id} id={i._id} className="right text-black">
          <span className="You">
            {i.msg}
            <span className="time">{i.time}</span>
          </span>
        </p>
      );
    } else if (i.sender === "Admin") {
      return (
        <p key={i._id} id={i._id} className="left text-black">
          <span className="Admin">
            {i.msg}
            <span className="time">{i.time}</span>
          </span>
        </p>
      );
    }
    return <>Nothing</>;
  });
  if (sessionStorage.getItem("auth-token")) {
    return (
      <>
        <p className="title">Chat with Your Admin</p>
        <div className="text-container bg-white text-black">
          {list}
          {error !== "" && <p className="error">{error}</p>}
        </div>
        <div className="msg bg-white text-black">
          <input
            type="text"
            placeholder="Type Your Message"
            className="bg-white"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button onClick={submitMsg} className="send">
            Send
            <span className="first"></span>
            <span className="second"></span>
            <span className="third"></span>
            <span className="fourth"></span>
          </button>
        </div>
      </>
    );
  } else {
    return <Access />;
  }
}
