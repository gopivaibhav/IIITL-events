import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSS/profile.css'
import Access from './Access'
function Profile() {
    const [fName, setfName] = useState(null)
    const [lName, setlName] = useState(null)
    const [imageUrl, setimageUrl] = useState(null)
    let token = sessionStorage.getItem('auth-token')
    useEffect(() => {
        if (token) {
            if (sessionStorage.getItem('fName')) {
                setfName(sessionStorage.getItem('fName'))
                setlName(sessionStorage.getItem('lName'))
                setimageUrl(sessionStorage.getItem('imageUrl'))
            } else {
                axios.get(`${process.env.REACT_APP_PORT}/people/main`, {
                    headers: {
                        'auth-token': token
                    }
                }).then((res) => {
                    setimageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkc22Q7pqxKlGEb_WY2bp474iC3msgcX6uA&usqp=CAU")
                    setfName(res.data.fName)
                    setlName(res.data.lName)
                })
            }
        } else {
            setfName('Login Karo')
        }
    }, [token])
    return (
        <div>
            {fName==="Login Karo" 
            ? <Access />
            :<><br></br>Welcome</>
            }
            
            <div>
                {fName!=="Login Karo" && <>{fName}</>}
                {lName && <>{lName}</>}
            </div>
            <img src={imageUrl}></img>
        </div>
    )
}

export default Profile;
