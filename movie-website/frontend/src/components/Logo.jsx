import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_ROUTE } from '../routes'

function Logo() {
    return (
        <Link to={HOME_ROUTE} className="logo-container flex gap-1 md:gap-2 items-center">
            <img src="/assets/logo.png" alt="logo" className='w-6 md:w-10' />
            <div className="app-name text-lg md:text-2xl">
                <span className='font-bold darK:text-white'>Prime</span>
                <span className='font-light'>Vision</span>
            </div>
        </Link>
    )
}

export default Logo