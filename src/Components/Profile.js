import React from 'react'
import axios from 'axios'
function Profile() {
    const fName = sessionStorage.getItem('fName')
    const lName = sessionStorage.getItem('lName')
    const imageUrl = sessionStorage.getItem('imageUrl')
    const checkFunc=()=>{
        const token=localStorage.getItem('auth-token')
        axios.get('http://localhost:5000/check',{
            headers: {
                'auth-token': token
              }
        }).then((res)=>{
            console.log(res.data)
        })
    }
    return (
        <div>
            {fName ?
                <div>
                    This is my Profile <br />
                    Welcome {fName} {lName}
                    <img src={imageUrl} alt='Profile Picture'></img>
                    <p onClick={checkFunc}>click to check</p>
                </div>
                :
                <div>
                    <p onClick={checkFunc}>click to check</p>
                    Login to view your profile
                </div>
            }
        </div>
    )
}

export default Profile;
