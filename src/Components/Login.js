import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios'
import '../login.css'

const clientId = "774998093778-lj0dcv0os65cvqi7ljql5pn2opsb8ica.apps.googleusercontent.com";

function Login() {
    const logoutBtn = useRef()
    const [showloginButton, setShowloginButton] = useState(true);
    const showlogoutButton = true;
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    useEffect(() => {
        // sessionStorage.removeItem("fName")
        // sessionStorage.removeItem("lName")
        // sessionStorage.removeItem("imageUrl")
        // logoutBtn.current.click()
    }, [])
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        sessionStorage.setItem("fName", res.profileObj.givenName);
        sessionStorage.setItem("lName", res.profileObj.familyName);
        sessionStorage.setItem("imageUrl", res.profileObj.imageUrl);
        sessionStorage.setItem("auth-token", 'Jai_Balayya');
        setShowloginButton(true);
    };
    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onLogout = () => {
        sessionStorage.clear();
        setShowloginButton(true);
    };
    const btnClicked = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login', { email: email, password: pass }).then((res) => {
            console.log(res.data)
            sessionStorage.setItem('auth-token', res.data);
        })
    }
    return (
        <div className='login-container'>
            <div className='inner-container'>
                <form>
                    <input type="email" placeholder='Email Address' onChange={(e) => { setEmail(e.target.value) }} required></input>
                    <input type="password" placeholder='Password' onChange={(e) => { setPass(e.target.value) }} required></input>
                    <button type='submit' onClick={btnClicked}>SignIn</button>
                </form>
            </div>
            <p>OR</p>
            {/* {showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null} */}
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <button onClick={renderProps.onClick}>Login</button>
                )}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
            />

            {showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} ref={logoutBtn}>Logout</button>
                    )}
                    buttonText="Logut"
                    onLogoutSuccess={onLogout}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default Login;