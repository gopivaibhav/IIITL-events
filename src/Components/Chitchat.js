import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Chitchat() {
    const {idForPerson} = useParams()
    const [items, setItems] = useState([])
    const [text, setText] = useState([])
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_PORT}/texting/${idForPerson}`,{
          headers: {
            "auth-token": sessionStorage.getItem("auth-token"),
          },
        }).then(res =>{
            console.log(res.data)
            setItems(res.data)
            // res.data.forEach((e) => {
            //     setItems((prevItems) => [...prevItems, e]);
            // });
        })
    }, [])
    // console.log(items)
    const list = items.map((i) => {
        if (i.senderId.fName == sessionStorage.getItem('fName')) {
            // console.log('in if', i.msg)
            return (
                <p key={i._id} id={i._id} className="right">
                <span className="You">
                {i.msg}
                <span className="time">{i.time}</span>
                </span>
            </p>
            );
        } else{
            // console.log("in else", i.msg)
            return (
            <p key={i._id} id={i._id} className="left">
                <span className="Admin">
                {i.msg}
                <span className="time">{i.time}</span>
                </span>
            </p>
            );
        }
    })
    const TextHandler = () =>{
        if(items.length!==0){
            return (
                <div className="text-container">{list}</div>
            )
        }
        return(
            <div className="text-xl  my-2 mx-2">
                You both never interacted with each other, Make your move!!
            </div>
        )
    }
    const submitMsg =()=>{
        if (text !== "") {
            axios
              .post(`${process.env.REACT_APP_PORT}/texting/`, {
                msg: text,
                receiverId: idForPerson,
              },{
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
              })
              .then((res) => {
                console.log(res.data);
                window.location.href = `/ChitChat/${idForPerson}`;
              });
          }
    }
  return (
    <div>
        <TextHandler />
        <div className="fixed bottom-2 w-full flex ">
            <input
            type="text"
            placeholder="Type Your Message"
            className="w-full shadow-2xl border-[1px]  px-10 py-10"
            onChange={(e) => {
                setText(e.target.value);
            }}
            ></input>
            <button onClick={submitMsg} className="send rounded bg-black text-white font-semibold text-xl focus:border-black">
            Send
            <span className="first"></span>
            <span className="second"></span>
            <span className="third"></span>
            <span className="fourth"></span>
            </button>
      </div>
    </div>
  )
}

export default Chitchat