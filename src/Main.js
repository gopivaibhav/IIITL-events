import React from 'react';
import './style.css'
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
export default function Main() {
    return (
        <Router>
            <div className='navbar'>
                <Link to="/login">Login</Link>
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
