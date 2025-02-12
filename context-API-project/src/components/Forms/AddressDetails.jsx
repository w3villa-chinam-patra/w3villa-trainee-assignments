import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import {  CHECKOUT_FORM_ROUTE } from '../../routes';

function AddressDetails() {
    const navigate = useNavigate()
    const [user, setUser] = useUser();
    const [addressDetails, setAddressDetails] = useState({
        phone: "",
        bank: "",
        bankAccountNumber: "",
        IFSCCode: "",
        address: ""
    })
    const onChangeHandler = (event, key) => {
        setAddressDetails({ ...addressDetails, [key]: event.target.value })
    }
    const submitHandler = (event) => {
        event.preventDefault()
        setUser({ ...user, ...addressDetails });
        navigate("/" + CHECKOUT_FORM_ROUTE)
    }
    return (
        <section className='form-container container mx-auto flex justify-center'>
            <div className="bg-white/20 rounded-2xl p-4">
                <form action="">
                    <label className='px-2' htmlFor="phone">Phone</label><br />
                    <input value={addressDetails.phone} onChange={(event) => onChangeHandler(event, "phone")} type="text" name="phone" id="phone" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="bank">Bank Name</label><br />
                    <input value={addressDetails.bank} onChange={(event) => onChangeHandler(event, "bank")} type="text" name="bank" id="bank" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="bankAccountNumber">Account Number</label><br />
                    <input value={addressDetails.bankAccountNumber} onChange={(event) => onChangeHandler(event, "bankAccountNumber")} type="text" name="bankAccountNumber" id="bankAccountNumber" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="IFSCCode">IFSC Code</label><br />
                    <input value={addressDetails.IFSCCode} onChange={(event) => onChangeHandler(event, "IFSCCode")} type="number" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="address">Address</label><br />
                    <input value={addressDetails.address} onChange={(event) => onChangeHandler(event, "address")} type="text" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <div className="button-container text-center">
                        <button onClick={submitHandler} className='cursor-pointer bg-indigo-600 border-2 border-indigo-700 px-4 py-1 rounded-xl hover:bg-indigo-700'>Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddressDetails