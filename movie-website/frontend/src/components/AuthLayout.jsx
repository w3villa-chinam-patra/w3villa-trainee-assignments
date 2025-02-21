import { Outlet } from 'react-router-dom'
import Logo from './Logo'

function AuthLayout() {
    return (
        <div className='bg-neutral-950 text-neutral-300 min-h-screen pb-4 flex flex-col font-poppins'>
            <div className="logo-wrapper m-10">
                <Logo />
            </div>
            <div className="outlet-container flex justify-center items-center w-full flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout