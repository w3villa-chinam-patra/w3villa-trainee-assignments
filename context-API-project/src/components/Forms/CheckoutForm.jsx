import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { CHECKOUT_FORM_ROUTE } from '../../routes';

function CheckoutForm() {
    const [user] = useUser();
    const navigate = useNavigate();
    const checkoutHandler = () => {
        alert("Order Placed Successfully !!");
        navigate("/");
    }
    return (
        <section className='form-container container mx-auto flex justify-center'>
            <div className="bg-white/20 rounded-2xl p-4">
                <form action="">
                    <label className='px-2' htmlFor="first-name">First Name</label><br />
                    <input value={user.firstName} readOnly={true} type="text" name="first-name" id="first-name" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="last-name">Last Name</label><br />
                    <input value={user.lastName} readOnly={true} type="text" name="last-name" id="last-name" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="username">Username</label><br />
                    <input value={user.username} readOnly={true} type="text" name="username" id="username" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="password">Password</label><br />
                    <input value={user.password} readOnly={true} type="password" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="phone">Phone</label><br />
                    <input value={user.phone} readOnly={true} type="text" name="phone" id="phone" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="bank">Bank Name</label><br />
                    <input value={user.bank} readOnly={true} type="text" name="bank" id="bank" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="bankAccountNumber">Account Number</label><br />
                    <input value={user.bankAccountNumber} readOnly={true} type="text" name="bankAccountNumber" id="bankAccountNumber" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="IFSCCode">IFSC Code</label><br />
                    <input value={user.IFSCCode} readOnly={true} type="number" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <label className='px-2' htmlFor="address">Address</label><br />
                    <input value={user.address} readOnly={true} type="text" className='bg-white/20 rounded-md outline-none p-1 m-2' /><br />

                    <div className='p-2 flex flex-col gap-2 items-center'>
                        <div className='text-2xl font-bold'>Your Order</div>
                        <div className="flex justify-center">
                            <img src={user.product[1]} alt="" className='w-40' />
                        </div>
                        <div className="product-name text-xl text-center">{user.product[0]}</div>
                        <button onClick={checkoutHandler} className='cursor-pointer bg-indigo-600 border-2 border-indigo-700 px-4 py-1 rounded-xl hover:bg-indigo-700'>Check Out</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CheckoutForm