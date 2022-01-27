import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSS/profile.css'
import Access from './Access'
function Profile() {
    const [fName, setfName] = useState(null)
    const [lName, setlName] = useState(null)
    const [formOpt, setformOpt] = useState(null)
    const [skills, setSkills] = useState([])
    const [imageUrl, setimageUrl] = useState(null)
    let token = sessionStorage.getItem('auth-token')
    useEffect(() => {
        if (token) {
                axios.get(`${process.env.REACT_APP_PORT}/people/main`, {
                    headers: {
                        'auth-token': token
                    }
                }).then((res) => {
                    console.log(res.data)
                    if(res.data.imageUrl){
                        setimageUrl(res.data.imageUrl)
                        sessionStorage.setItem('imageUrl',res.data.imageUrl)
                    }else{
                        setimageUrl("https://cdn-icons-png.flaticon.com/128/3237/3237472.png")
                        sessionStorage.setItem('imageUrl',res.data.imageUrl)
                    }
                    setfName(res.data.fName)
                    setlName(res.data.lName)
                    if(res.data.formFilled){
                        setformOpt(res.data.formFilled)
                    }
                    sessionStorage.setItem('fName',res.data.fName)
                    sessionStorage.setItem('lName',res.data.lName)
                    res.data.skills.forEach(e => {
                        setSkills(prevItems => [...prevItems, e]);
                    });
                })
        } else {
            setfName('Login Karo')
        }
    }, [token])
    let skillList = skills.map((i) => {
        return (
            <p key={i}>{i}</p>
        )
    })
    if (fName === "Login Karo") {
        return (<Access />)
    } else {
        return (
            <>
                <div className='overall-container'>
                    <div>
                        <img src={imageUrl} alt=''></img>
                    </div>
                    <div>
                        <p className='name'>{fName} {lName}</p>
                        <a href='./profile/edit'>Edit Profile </a>
                    </div>
                </div>
                <div>Your Skills:</div>
                {skillList}
                <div>
                    {formOpt && <>{formOpt}</>}
                </div>
            </>
        )
    }
}

export default Profile;
