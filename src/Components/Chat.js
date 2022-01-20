import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


export default function Chat() {
    const { idForPerson } = useParams()
    const [items, setItems] = useState([])
    const [text, setText] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PORT}/admin/view/${idForPerson}`, {
            headers: {
                'auth-token': sessionStorage.getItem('admin')
            }
        }).then((res) => {
            console.log(res.data)
            if(res.data!=="NTG"){
                res.data.forEach(e => {
                    setItems(prevItems => [...prevItems, e]);
                });
            }
        })
    }, [idForPerson])

    const submitMsg = () => {
        axios.post(`${process.env.REACT_APP_PORT}/admin/msg`, {
            sender: "Admin",
            msg: text,
            personId:idForPerson
        }).then((res) => {
            console.log(res.data)
        })
    }

    const list = items.map((i) => {
        return (
            <div key={i._id} id={i._id} className={i.sender}>{i.msg} {i.time}</div>
        )
    })
    return (
        <>
            {list}
            Chat of {idForPerson}
            <br></br>
            <br></br>
            <br></br>
            <input type="text" onChange={(e) => { setText(e.target.value) }}></input>
            <button onClick={submitMsg}>Send Message</button>
        </>
    );
}
