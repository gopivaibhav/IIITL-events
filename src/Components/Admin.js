import React, { useState } from 'react'

export default function Admin() {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const btnClicked=(e)=>{
        e.preventDefault()
        console.log(email)
        console.log(pass)
        if(email==="admin@bgv.com" && pass===process.env.REACT_APP_ADMIN_PASS){
            sessionStorage.setItem('admin',process.env.REACT_APP_AUTH_GOOGLE)
        }
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
        </div>
        {sessionStorage.getItem('admin')===process.env.REACT_APP_AUTH_GOOGLE
        && <>Welcome admin</>
        }
        </>
    )
}
