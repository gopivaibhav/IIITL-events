import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/people.css";
import Lottie from "lottie-react";
import Slide from 'react-reveal/Slide';
import searchh from "./search.json"
export default function People() {
  const [items, setItems] = useState([]);
  // const [frnds, setFrnds] = useState([]);
  const [newItems, setnewItems] = useState([]);
  const [search, setSearch] = useState("all");
  const [msg, setMsg] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PORT}/user/getfrnds`, {
        headers: {
          "auth-token": sessionStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      });
    axios.get(`${process.env.REACT_APP_PORT}/people`).then((res) => {
      res.data.people.forEach((e) => {
        setItems((prevItems) => [...prevItems, e]);
      });
    });
    setnewItems(items);
  }, []);
  const handleClick = (e) => {
    navigate(`/person/${e.target.id}`);
  };
  const searchFun = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search === "all") {
      setnewItems(items);
      setMsg(null);
    } else {
      let re = new RegExp(search, "i");
      const check = items.filter((i) => {
        return re.test(`${i.fName} ${i.lName}`);
      });
      if (check.length !== 0) {
        setnewItems(check);
        setMsg(null);
      } else {
        setMsg(`No user Found with ${search}`);
      }
    }
  }, [search, items]);
  // }else{
  //     console.log(items.map((i)=>{
  //         return i.fName===search
  //     }))
  // }
  // const addFrnd = (e) => {
  //     console.log(e.target.key)
  // }
  const list = newItems.map((i) => {
    return (
      <p key={i._id} id={i._id} className="flex items-center gap-x-5 shadow-md px-3 rounded-xl  py-4 min-w-[400px] hover:text-blue-600 cursor-pointer" onClick={handleClick}>
        <img className="rounded-full w-16 h-16" src="https://static.vecteezy.com/system/resources/previews/008/420/425/original/cute-penguin-wearing-earmuff-cartoon-icon-illustration-animal-winter-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg" alt="" />
        <span>
        {i.fName} {i.lName}
        </span>
        {/* <span onClick={addFrnd} key={i._id}>Add Friend</span> */}
      </p>
    );
  });
  return (
    <div className="flex  gap-x-[200px] px-56">
    <Slide left>
    <div>
    <Lottie className="w-[800px]" animationData={searchh} loop={true} />
    </div>
    </Slide>
    <Slide right>
   
      <div className="people pr-">
        <input
          type="text"
          onChange={searchFun}
          id="search"
          placeholder="Search"
          className="bg-white  shadow-xl rounded-xl  border-[1px] text-blue-600 px-2 py-3 my-10 font-bold text-xl w-[300px]"
          autoComplete="off"
        ></input>
        
        {msg ? (
          <span className="error">{msg}</span>
        ) : (
          <label htmlFor="search" style={{ fontSize: "20px" }}>
            {" "}
           
          </label>
        )}
        <div className="h-[600px] overflow-auto ">
        {list}
        </div>
      </div>
      </Slide>
    </div>
  );
}
