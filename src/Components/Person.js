import axios  from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Person() {
    const [person,setPerson]=useState()
    const [error,setError]=useState(null)
    const {idForPerson}=useParams()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PORT}/people/${idForPerson}`,{
            headers:{
                'auth-token':sessionStorage.getItem('auth-token')
            }
        }).then((res)=>{
            console.log(res.data)
            if(res.data==="Invalid token"){
                setError('Login to see their profile')
            }else{
                setPerson(res.data)
            }
        })
    }, [idForPerson])
    return (
        <div>
            {
                error &&
                <>
                    {error}
                </>
            }
            {person &&
                <>
                    {person.fName} {person.lName}
                </>
            }
        </div>
    )
}
