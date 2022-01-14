import axios  from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Person() {
    const [person,setPerson]=useState()
    const {idForPerson}=useParams()
    useEffect(() => {
        axios.get(`http://localhost:5000/people/${idForPerson}`).then((res)=>{
            setPerson(res.data)
        })
    }, [])
    return (
        <div>
            {person &&
                <>
                    {person.fName} {person.lName}
                </>
            }
        </div>
    )
}
