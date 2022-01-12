import React from 'react'

function Profile() {
    const fName = sessionStorage.getItem('fName')
    const lName = sessionStorage.getItem('lName')
    const imageUrl = sessionStorage.getItem('imageUrl')
    return (
        <div>
            {fName ?
                <div>
                    This is my Profile <br />
                    Welcome {fName} {lName}
                    <img src={imageUrl} alt='Profile Picture'></img>
                </div>
                :
                <div>
                    Login to view your profile
                </div>
            }
        </div>
    )
}

export default Profile;
