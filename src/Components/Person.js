import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Access from './Access'
import '../CSS/profile.css'
export default function Person() {
    const [error, setError] = useState(null)
    const [fName, setfName] = useState(null)
    const [lName, setlName] = useState(null)
    const [skills, setSkills] = useState([])
    const [imageUrl, setimageUrl] = useState(null)
    const { idForPerson } = useParams()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PORT}/people/${idForPerson}`, {
            headers: {
                'auth-token': sessionStorage.getItem('auth-token')
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data === "Invalid token") {
                setError('Login to see their profile')
            } else {
                if(res.data.imageUrl){
                    setimageUrl(res.data.imageUrl)
                    sessionStorage.setItem('imageUrl',res.data.imageUrl)
                }else{
                    setimageUrl("https://cdn-icons-png.flaticon.com/128/3237/3237472.png")
                    sessionStorage.setItem('imageUrl',res.data.imageUrl)
                }
                setfName(res.data.fName)
                sessionStorage.setItem('fName',res.data.fName)
                sessionStorage.setItem('lName',res.data.lName)
                setlName(res.data.lName)
                res.data.skills.forEach(e => {
                    setSkills(prevItems => [...prevItems, e]);
                });
            }
        })
    }, [idForPerson])
    // const addFrnd=()=>{
    //     axios.post(`${process.env.REACT_APP_PORT}/user/addfrnd`,{
    //         frndId:idForPerson
    //     }, {
    //         headers: {
    //             'auth-token': sessionStorage.getItem('auth-token')
    //         }
    //     }).then((res) => {
    //         console.log(res.data)
    //     })
    // }
    let skillList = skills.map((i) => {
        return (
            <p key={i}>{i}</p>
        )
    })
    if (error) {
        return (<Access></Access>)
    } else {
        return (
            <>
                {fName &&
                    <>
                        <div className='overall-container'>
                            <div>
                                <img src={imageUrl} alt=''></img>
                            </div>
                            <div>
                                <p className='name'>{fName} {lName}</p>
                                {/* <a href='#' onClick={addFrnd}>Add Friend </a> */}
                            </div>
                        </div>
                        <div>Your Skills:</div>
                        {skillList}
                    </>
                }
            </>
        )
    }
}
