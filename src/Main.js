import React from 'react';
import './CSS/style.css'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom';
import Login from './Components/Login';
import Profile from './Components/Profile';
import People from './Components/People';
import Person from './Components/Person';
import { useState, useEffect } from 'react';
export default function Main() {
    const [text, setText] = useState('Login')
    // useEffect(() => {
    //     if(token){
    //         setText('Logout')
    //     }else{
    //         setText('Login')
    //     }
    // }, [token])
    useEffect(() => {
        function checkUserData() {
            const item = sessionStorage.getItem('auth-token')
            console.log('called')
            if (item) {
                setText('Logout')
            } else {
                setText('Login')
            }
        }
            window.addEventListener('storage', checkUserData)

            return () => {
                window.removeEventListener('storage', checkUserData)
            }
        }, [])
    return (
        <Router>
            <div className='navbar'>
                <Link to="/login">{text}</Link>
                <Link to="/">Home</Link>
                <Link to="/people">People</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <Routes>
                <Route path='/' element={<Checking />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/login' element={<Login />} />
                <Route path='/people' element={<People />} />
                <Route path='/person/:idForPerson' element={<Person />} />
            </Routes>
        </Router>
    )
}

function Checking() {
    return (
        <div>
            Home Page
        </div>
    )
}
