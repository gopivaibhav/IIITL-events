import React, { useState, useEffect, useRef } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../CSS/login.css";
import Zoom from 'react-reveal/Zoom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {
  const logoutBtn = useRef();
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
    logoutBtn.current.click();
    sessionStorage.clear();
    
  }, []);
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    sessionStorage.setItem("fName", res.profileObj.givenName);
    sessionStorage.setItem("lName", res.profileObj.familyName);
    sessionStorage.setItem("imageUrl", res.profileObj.imageUrl);
    sessionStorage.setItem(
      "auth-token",
      `${process.env.REACT_APP_AUTH_GOOGLE}$$$${res.profileObj.email}`
    );
    const object = {
      fName: res.profileObj.givenName,
      lName: res.profileObj.familyName,
      imageUrl: res.profileObj.imageUrl,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
    };
    axios.post(`${process.env.REACT_APP_PORT}/register`, object).then((res) => {
      toast("Registered")
      if (res.data.error) {
        setMsg(res.data.error);
        toast(res.data.error)
      }
    });

    window.location.href = `/`;
  };
  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };
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
  const onLogout = () => {
    sessionStorage.clear();
  };
  const btnClicked = (event) => {
    event.preventDefault();
    console.log("enf")
    axios
      .post(`${process.env.REACT_APP_PORT}/login`, {
        email: email,
        password: pass,
      })
      .then((res) => {
       
        if (res.data.error) {
          setMsg(res.data.error);
          toast(res.data.error)
        } else {
          sessionStorage.setItem("auth-token", res.data);
          toast("Login Succesfull")
          window.location.href = `/`;
        }
      });
  };
  return (
    <div>
    <ToastContainer  />
    <Zoom>
    <div className="text-black ">
    </div>
      <div className=" w-1/3 mx-auto my-10 px-10 py-10 rounded-2xl shadow-2xl text-black">
        <div >
          {log && (
            <form className=" flex flex-col justify-center">
              <h1 className="text-black text-center text-3xl font-bold">LOG IN</h1>
              <input
                type="email"
                autoComplete="off"
                placeholder="Email Address"
                className="text-blue-600  my-2 border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              ></input>
              <input
                type="password"
                autoComplete="off"
                placeholder="Password"
                className="text-blue-600 my-2  border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                required
              ></input>
              <button className="px-4 py-2 my-3 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600" type="submit" onClick={btnClicked}>
                SignIn
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
                <span className="fourth"></span>
              </button>
              {msg !== null && <p className="error">{msg}</p>}
              <p className="text-center font-semibold">OR</p>
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <button className="px-4 py-2 my-3 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600" onClick={renderProps.onClick}>
                    Continue with Google
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                    <span className="fourth"></span>
                  </button>
                )}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
              />
            </form>
          )}

          {sign && (
            <div>
              <form className=" flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-black text-center text-3xl font-bold">SIGN UP</h1>
                <input
                  type="text"
                  className="text-blue-600 my-2  border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                  placeholder="First name"
                  {...register("First name", { required: true, maxLength: 80 })}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="text-blue-600 my-2  border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                  {...register("Last name", { required: true, maxLength: 100 })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="text-blue-600 my-2  border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="text-blue-600 my-2  border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                  {...register("Password", { required: true, min: 7 })}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="text-blue-600 my-2  border-[1px] px-3 py-3 focus:text-blue-600 font-semibold shadow-lg rounded-xl"
                  {...register("Confirm Password", { required: true, min: 7 })}
                />
                <button type="submit" className="px-4 py-2 my-3 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600">
                  SignUp
                  <span className="first"></span>
                  <span className="second"></span>
                  <span className="third"></span>
                  <span className="fourth"></span>
                </button>
                {msg !== null && <p className="error">{msg}</p>}
                <GoogleLogin
                  clientId={clientId}
                  render={(renderProps) => (
                    <button className="px-4 py-2 border-black rounded-md bg-black text-white font-semibold hover:text-blue-600" onClick={renderProps.onClick}>
                      Continue with Google
                      <span className="first"></span>
                      <span className="second"></span>
                      <span className="third"></span>
                      <span className="fourth"></span>
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                />
              </form>
            </div>
          )}

        </div>
        <p className="signup text-center text-black hover:underline hover:text-blue-600 my-2" onClick={signUp}>
          {text}
        </p>
        


        <GoogleLogout
          clientId={clientId}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="logoutBtn"
              ref={logoutBtn}
            >
              Logout
            </button>
          )}
          buttonText="Logut"
          onLogoutSuccess={onLogout}
        ></GoogleLogout>
      </div>
    </Zoom>
    </div>
  );
}
export default Login;
