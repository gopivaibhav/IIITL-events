import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = "774998093778-lj0dcv0os65cvqi7ljql5pn2opsb8ica.apps.googleusercontent.com";

function Login() {

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
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

    return (
        <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
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