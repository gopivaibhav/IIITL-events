import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/people.css'
export default function People() {
    const [items, setItems] = useState([]);
    // const [frnds, setFrnds] = useState([]);
    const [newItems, setnewItems] = useState([]);
    const [search, setSearch] = useState('all');
    const [msg, setMsg] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PORT}/user/getfrnds`, {
            headers: {
                'auth-token': sessionStorage.getItem('auth-token')
            }
        }).then((res) => {
            console.log(res.data)
        })
        axios.get(`${process.env.REACT_APP_PORT}/people`).then((res) => {
            res.data.people.forEach(e => {
                setItems(prevItems => [...prevItems, e]);
            });
        })
        setnewItems(items)
    }, [])
    const handleClick = (e) => {
        navigate(`/person/${e.target.id}`)
    }
    const searchFun = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        if (search === 'all') {
            setnewItems(items)
            setMsg(null)
        } else {
            let re = new RegExp(search, 'i');
            const check = items.filter((i) => {
                return re.test(`${i.fName} ${i.lName}`)
            })
            if (check.length !== 0) {
                setnewItems(check)
                setMsg(null)
            } else {
                setMsg(`No user Found with ${search}`)
            }
        }
    }, [search, items])
    // }else{
    //     console.log(items.map((i)=>{
    //         return i.fName===search
    //     }))
    // }
    // const addFrnd = (e) => {
    //     console.log(e.target.key)
    // }
    const list = newItems.map((i) => {
        return (
                <p key={i._id} id={i._id} onClick={handleClick}>
                    {i.fName} {i.lName}
                    {/* <span onClick={addFrnd} key={i._id}>Add Friend</span> */}
                </p>
        )
    })
    return (
        <>

            <div className='people'>
                <input type="text" onChange={searchFun} id='search' autoComplete="off"></input>
                {msg
                    ? <span className='error'>{msg}</span>
                    : <label htmlFor='search' style={{ fontSize: '20px' }}> Searching for {search}</label>
                }
                {list}
            </div>
        </>
    )
}
