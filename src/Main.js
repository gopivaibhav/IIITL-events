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
import Admin from './Components/AdminFunc';
import Chat from './Components/Chat';
import Text from './Components/Text';
import { useState, useEffect } from 'react';
export default function Main() {
    const [text, setText] = useState('Login')
    const token=sessionStorage.getItem('auth-token')
    useEffect(() => {
        if(token){
            setText('Logout')
        }else{
            setText('Login')
        }
    }, [token])
    return (
        <Router>
            <div className='navbar'>
                <Link to="/login">{text}</Link>
                <Link to="/">Home</Link>
                <Link to="/people">Search</Link>
                <Link to="/text">Chat</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <Routes>
                <Route path='/' element={<Checking />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/login' element={<Login />} />
                <Route path='/people' element={<People />} />
                <Route path='/text' element={<Text />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/person/:idForPerson' element={<Person />} />
                <Route path='/chat/:idForPerson' element={<Chat />} />
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
