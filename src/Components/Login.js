import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../CSS/login.css";
import Zoom from 'react-reveal/Zoom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(true);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [text, setText] = useState("Don't have an account? SignUp");
  const [msg, setMsg] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const object = {
      fName: data["First name"],
      lName: data["Last name"],
      email: data["Email"],
      password: data["Password"],
    };
    if (
      data["Password"] === data["Confirm Password"] &&
      data["Password"].length >= 7
    ) {
      axios
        .post(`${process.env.REACT_APP_PORT}/register`, object)
        .then((res) => {
          if (res.data.error) {
            setMsg(res.data.error);
          }
        });
    } else if (data["Password"].length < 7) {
      setMsg("Password length should be greater than 6");
    } else {
      setMsg("Passwords didn't match");
    }
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const signUp = () => {
    if (log) {
      setSign(true);
      setLog(false);
      setText("Already have an account? SignIn");
    } else {
      setSign(false);
      setLog(true);
      setText("Don't have an account? SignUp");
    }
  };

  const btnClicked = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_PORT}/login`, {
        email: email,
        password: pass,
      })
      .then((res) => {
        if (res.data.error) {
          setMsg(res.data.error);
          toast(res.data.error);
        } else {
          sessionStorage.setItem("auth-token", res.data);
          toast("Login Successful");
          window.location.href = `/`;
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      <Zoom>
        <div className="text-black "></div>
        <div className=" w-1/3 mx-auto my-10 px-10 py-10 rounded-2xl shadow-2xl text-black">
          <div>
            {log && (
              <form className="flex flex-col justify-center">
                <h1 className="text-black text-center text-3xl font-bold">LOG IN</h1>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="Email Address"
                  className="text-blue-600 my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                ></input>
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  className="text-blue-600 my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  required
                ></input>
                <button
                  className="px-4 py-2 my-3 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600"
                  type="submit"
                  onClick={btnClicked}
                >
                  SignIn
                </button>
                {msg !== null && <p className="error">{msg}</p>}
              </form>
            )}

            {sign && (
              <div>
                <form
                  className="flex flex-col justify-center"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h1 className="text-black text-center text-3xl font-bold">SIGN UP</h1>
                  <input
                    type="text"
                    className="text-blue-600 my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                    placeholder="First name"
                    {...register("First name", { required: true, maxLength: 80 })}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="text-blue-600 my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                    {...register("Last name", { required: true, maxLength: 100 })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="text-blue-600 my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                    {...register("Email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="text-blue-600 my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                    {...register("Password", { required: true, min: 7 })}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="text-blue-600 my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                    {...register("Confirm Password", { required: true, min: 7 })}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 my-3 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600"
                  >
                    SignUp
                  </button>
                  {msg !== null && <p className="error">{msg}</p>}
                </form>
              </div>
            )}
          </div>
          <p
            className="signup text-center text-black hover:underline hover:text-blue-600 my-2"
            onClick={signUp}
          >
            {text}
          </p>
        </div>
      </Zoom>
    </div>
  );
}

export default Login;
