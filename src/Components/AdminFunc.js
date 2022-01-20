import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/admin.css'
export default function AdminFunc() {
    const [items, setItems] = useState([]);
    const navigate=useNavigate()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PORT}/people`).then((res) => {
            res.data.people.forEach(e => {
                setItems(prevItems => [...prevItems, e]);
            });
        })
    }, [])
    const handleClick = (e) => {
        navigate(`/chat/${e.target.id}`)
    }
    const list = items.map((i) => {
        return (
            <p key={i._id} id={i._id} onClick={handleClick}>{i.fName} {i.lName}</p>
        )
    })
    return (<div className='container'>
    <div className='left'>
        {list}
    </div>
    <div className='right'>
        Chat Application
    </div>
    </div>);
}
