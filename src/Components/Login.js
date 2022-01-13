import React, { useState,useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios'
import '../login.css'

const clientId = "774998093778-lj0dcv0os65cvqi7ljql5pn2opsb8ica.apps.googleusercontent.com";

function Login() {
    useEffect(() => {
        localStorage.clear()
    }, [])
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        sessionStorage.setItem("fName", res.profileObj.givenName);
        sessionStorage.setItem("lName", res.profileObj.familyName);
        sessionStorage.setItem("imageUrl", res.profileObj.imageUrl);
        setShowloginButton(false);
        setShowlogoutButton(true);
    };
    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onLogout = () => {
        sessionStorage.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };
    const btnClicked=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/login',{email:email,password:pass}).then((res)=>{
            console.log(res.data)
            localStorage.setItem('auth-token', res.data);
        })
    }
    return (
        <div className='login-container'>
            <div className='inner-container'>
                <form>
                    <input type="email" placeholder='Email Address' onChange={(e)=>{setEmail(e.target.value)}} required></input>
                    <input type="password" placeholder='Password' onChange={(e)=>{setPass(e.target.value)}} required></input>
                    <button type='submit' onClick={btnClicked}>SignIn</button>
                </form>
            </div>
            <p>OR</p>
            {showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            {showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onLogout}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default Login;