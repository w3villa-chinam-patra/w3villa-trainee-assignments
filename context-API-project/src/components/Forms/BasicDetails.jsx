import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import {  ADDRESS_DETAILS_ROUTE } from '../../routes';

function BasicDetails() {
    const navigate = useNavigate()
    const [user, setUser] = useUser();
    const [basicDetails, setBasicDetails] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    })
    const onChangeHandler = (event, key) => {
        setBasicDetails({ ...basicDetails, [key]: event.target.value })
    }
    const submitHandler = (event) => {
        event.preventDefault()
        setUser({ ...user, ...basicDetails });
        navigate("/" + ADDRESS_DETAILS_ROUTE)
    }
    return (
        <section className='form-container container mx-auto flex justify-center'>
            <div className="bg-white/20 rounded-2xl p-4">
                <form action="">
                    <label className='px-2' htmlFor="first-name">First Name</label><br />
                    <input value={basicDetails.firstName} onChange={(event) => onChangeHandler(event, "firstName")} type="text" name="first-name" id="first-name" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="last-name">Last Name</label><br />
                    <input value={basicDetails.lastName} onChange={(event) => onChangeHandler(event, "lastName")} type="text" name="last-name" id="last-name" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="username">Username</label><br />
                    <input value={basicDetails.username} onChange={(event) => onChangeHandler(event, "username")} type="text" name="username" id="username" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="password">Password</label><br />
                    <input value={basicDetails.password} onChange={(event) => onChangeHandler(event, "password")} type="password" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <div className="button-container text-center">
                        <button onClick={submitHandler} className='cursor-pointer bg-indigo-600 border-2 border-indigo-700 px-4 py-1 rounded-xl hover:bg-indigo-700'>Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default BasicDetails