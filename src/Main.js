import React, { useRef } from 'react';
import './CSS/style.css'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Home from './Components/Home';
import People from './Components/People';
import Person from './Components/Person';
import Admin from './Components/Admin';
import Chat from './Components/Chat';
import Text from './Components/Text';
import { useState, useEffect } from 'react';
import EditProfile from './Components/EditProfile';
export default function Main() {
    const [text, setText] = useState('Login')
    const [active, setActive] = useState(false)
    const token = sessionStorage.getItem('auth-token')
    const hamburger = useRef();
    const navMenu = useRef();
    useEffect(() => {
        if (token) {
            setText('Logout')
        } else {
            setText('Login')
        }
    }, [token])
    const handleClick = () => {
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }
    }
    const linkClick=()=>{
        setActive(false)
    }
    const loginClick=()=>{
        setActive(false)
        if(sessionStorage.getItem('auth-token')){
            window.location.href='/login'
        }
    }
    return (
        <Router>
            <header className="header">
                <nav className="navbar" >
                    <a href="/" className="nav-logo">IIITL Events.</a>
                    <ul className={active ? "active nav-menu" :"nav-menu"} ref={navMenu}>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={linkClick} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={linkClick} to="/people">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={linkClick} to="/text">Chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={linkClick} to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={loginClick} to="/login">{text}</Link>
                        </li>
                    </ul>
                    <div className={active ? "active hamburger" :"hamburger"} ref={hamburger} onClick={handleClick}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </header>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/edit' element={<EditProfile />} />
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
