import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import '../CSS/login.css'

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {
    const logoutBtn = useRef()
    const [sign, setSign] = useState(false)
    const [log, setLog] = useState(true)
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [text, setText] = useState('SignUp');
    const [msg, setMsg] = useState(null);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const object = {
            fName: data['First name'],
            lName: data['Last name'],
            email: data['Email'],
            password: data['Password']
        }
        if (data['Password'] === data['Confirm Password'] && data['Password'].length >= 7) {
            axios.post(`${process.env.REACT_APP_PORT}/register`, object).then((res) => {
                if (res.data.error) {
                    setMsg(res.data.error)
                }
            })
        } else if (data['Password'].length < 7) {
            setMsg("Password length should be greater than 6")
        } else {
            setMsg("Passwords didn't match")
        }
    }
    useEffect(() => {
        logoutBtn.current.click()
        sessionStorage.clear()
    }, [])
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        sessionStorage.setItem("fName", res.profileObj.givenName);
        sessionStorage.setItem("lName", res.profileObj.familyName);
        sessionStorage.setItem("imageUrl", res.profileObj.imageUrl);
        sessionStorage.setItem("auth-token", `${process.env.REACT_APP_AUTH_GOOGLE}$$$${res.profileObj.email}`);
        const object = {
            fName: res.profileObj.givenName,
            lName: res.profileObj.familyName,
            imageUrl: res.profileObj.imageUrl,
            email: res.profileObj.email,
            googleId: res.profileObj.googleId
        }
        axios.post(`${process.env.REACT_APP_PORT}/register`, object).then((res) => {
            if (res.data.error) {
                setMsg(res.data.error)
            }
        })
        
        window.location.href=`/`
    };
    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };
    const signUp = () => {
        if (log) {
            setSign(true)
            setLog(false)
            setText('SignIn')
        } else {
            setSign(false)
            setLog(true)
            setText('SignUp')
        }
    }
    const onLogout = () => {
        sessionStorage.clear();
    };
    const btnClicked = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_PORT}/login`, { email: email, password: pass }).then((res) => {
            if (res.data.error) {
                setMsg(res.data.error)
            }else{
                sessionStorage.setItem('auth-token', res.data);
                window.location.href=`/`
            }
        })
    }
    return (
        <div className='login-container'>
            <div className='inner-container'>
                {log &&
                    <form>
                        <input type="email" autoComplete="off" placeholder='Email Address' onChange={(e) => { setEmail(e.target.value) }} required></input>
                        <input type="password" autoComplete="off" placeholder='Password' onChange={(e) => { setPass(e.target.value) }} required></input>
                        <button type='submit' onClick={btnClicked}>
                            SignIn
                            <span className="first"></span>
                            <span className="second"></span>
                            <span className="third"></span>
                            <span className="fourth"></span>
                        </button>
                        {msg !== null && <p className='error'>{msg}</p>}
                    </form>

                }
                {sign &&
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" placeholder="First name" {...register("First name", { required: true, maxLength: 80 })} />
                            <input type="text" placeholder="Last name" {...register("Last name", { required: true, maxLength: 100 })} />
                            <input type="email" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                            <input type="password" placeholder="Password" {...register("Password", { required: true, min: 7 })} />
                            <input type="password" placeholder="Confirm Password" {...register("Confirm Password", { required: true, min: 7 })} />
                            <button type="submit">
                                SignUp
                                <span className="first"></span>
                                <span className="second"></span>
                                <span className="third"></span>
                                <span className="fourth"></span>
                            </button>
                        {msg !== null && <p className='error'>{msg}</p>}
                        </form>

                    </div>

                }
            </div>
            <p className="signup" onClick={signUp}>{text}</p>
            <p>OR</p>
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <button onClick={renderProps.onClick}>
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

            <GoogleLogout
                clientId={clientId}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className='logoutBtn' ref={logoutBtn}>Logout</button>
                )}
                buttonText="Logut"
                onLogoutSuccess={onLogout}
            >
            </GoogleLogout>
        </div>
    );
}
export default Login;