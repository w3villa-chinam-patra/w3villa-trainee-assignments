import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebase';
import toast from 'react-hot-toast';
import { LuLoaderCircle } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/features/user/userSlice';
import SocialSignIn from '../socialLogin/SocialLogin';

function Login() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setLoginDetails({ ...loginDetails, [event.target.name]: event.target.value });
    }

    const loginHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const data = await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
            toast.success("Logged In Successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.message.split("Firebase: "));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={loginHandler} className='flex flex-col gap-4 bg-neutral-700 p-6 max-w-lg md:p-8 rounded-2xl border border-neutral-600 mx-2' >
            <h1 className='font-black text-2xl my-4'>Login to your account</h1>
            <SocialSignIn />
            <div className="email-input-field flex flex-col gap-2 my-1">
                <label htmlFor="email" className='text-sm font-medium'>Your Email</label>
                <input value={loginDetails.email} onChange={onChangeHandler} type="text" name="email" id="email" placeholder='name@company.com' className='outline-none w-full bg-neutral-800 border border-neutral-600 rounded-md p-2 md:min-w-md' />
            </div>
            <div className="password-input-field flex flex-col gap-2 my-1">
                <label htmlFor="password" className='text-sm font-medium'>Password</label>
                <input value={loginDetails.password} onChange={onChangeHandler} type="password" name="password" id="password" placeholder='••••••••' className='outline-none w-full bg-neutral-800 border border-neutral-600 rounded-md p-2 md:min-w-md' />
            </div>
            <button type='submit' className='bg-emerald-600 p-2 rounded-md my-2 font-medium cursor-pointer hover:bg-emerald-700 flex gap-2 justify-center items-center'>Login {isLoading ? <LuLoaderCircle className='text-xl animate-spin' /> : ""} </button>
            <div className='flex flex-wrap gap-1 text-sm text-neutral-400'>
                <div className='text-nowrap'>Don't have an account yet?</div>
                <Link to={"/register"}><span className='text-emerald-600 font-medium hover:underline cursor-pointer' >Register</span></Link>
            </div>
        </form>
    )
}

export default Login