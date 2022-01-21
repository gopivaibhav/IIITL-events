import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


export default function Chat() {
    const { idForPerson } = useParams()
    const [items, setItems] = useState([])
    const [text, setText] = useState('')
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PORT}/admin/view/${idForPerson}`, {
            headers: {
                'auth-token': sessionStorage.getItem('admin')
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data !== "NTG") {
                res.data.forEach(e => {
                    setItems(prevItems => [...prevItems, e]);
                });
            }
        })
    }, [idForPerson])

    const submitMsg = () => {
        if(text!==''){
            axios.post(`${process.env.REACT_APP_PORT}/admin/msg`, {
                sender: "Admin",
                msg: text,
                personId:idForPerson
            }).then((res) => {
                console.log(res.data)
                window.location.href=`/chat/${idForPerson}`
            })
        }
    }

    const list = items.map((i) => {
        if(i.sender==="You"){
            return (
                <p key={i._id} id={i._id} className='right'><span className="You">{i.msg}</span></p>
            )
        }else if(i.sender==="Admin"){
            return (
                <p key={i._id} id={i._id} className='left'><span className="Admin">{i.msg}</span></p>
            )
        }
        return(
         <>Nothing</>   
        )
    })
    return (
        <>
            <p className='title'>Chat with Your Admin</p>
            <div className='text-container'>
                {list}
            </div>
            
            <div className='msg'>
            <input type="text" placeholder='Type Your Message' onChange={(e) => { setText(e.target.value) }}></input>
            <button onClick={submitMsg} className='send'>
                Send
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
                <span className="fourth"></span>
            </button>

            </div>
        </>
    );
}
