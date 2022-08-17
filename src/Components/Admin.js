import React, { useState } from 'react'
import AdminFunc from './AdminFunc'
export default function Admin() {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const token = sessionStorage.getItem('admin')
    const btnClicked = (e) => {
        e.preventDefault()
        if (email === "admin@bgv.com" && pass === process.env.REACT_APP_AUTH_GOOGLE) {
            sessionStorage.setItem('admin', process.env.REACT_APP_AUTH_GOOGLE)
        }
    }
    const clearFunc = () => {
        sessionStorage.removeItem('admin')
    }
    return (
        <>
            <div className='inner-container'>
                <form>
                    <input type="email" autoComplete="off" placeholder='Admin email' onChange={(e) => { setEmail(e.target.value) }} required></input>
                    <input type="password" autoComplete="off" placeholder='Password' onChange={(e) => { setPass(e.target.value) }} required></input>
                    <button type='submit' onClick={btnClicked}>
                        SignIn
                        <span className="first"></span>
                        <span className="second"></span>
                        <span className="third"></span>
                        <span className="fourth"></span>
                    </button>
                </form>
                    <button onClick={clearFunc}>
                        Signout
                        <span className="first"></span>
                        <span className="second"></span>
                        <span className="third"></span>
                        <span className="fourth"></span>
                    </button>
            </div>
            {token === process.env.REACT_APP_AUTH_GOOGLE
                && <AdminFunc />
            }
        </>
    )
}
