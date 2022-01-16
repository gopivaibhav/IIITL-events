import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/people.css'
export default function People() {
    const [items, setItems] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5000/people').then((res) => {
            res.data.people.forEach(e => {
                setItems(prevItems => [...prevItems, e]);
            });
        })
    }, [])
    const handleClick=(e)=>{
        navigate(`/person/${e.target.id}`)
    }
    const list = items.map((i) => {
        return (
            <p key={i._id} id={i._id} onClick={handleClick}>{i.fName} {i.lName}</p>
        )
    })
    return (
        <div className='people'>
            {list}
            {list}
            {list}
            {list}
            {list}
        </div>
    )
}
