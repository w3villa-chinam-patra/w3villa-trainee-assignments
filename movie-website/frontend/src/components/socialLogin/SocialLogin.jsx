import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, db } from '../../service/firebase'
import { useDispatch } from 'react-redux'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../../routes'
import { setUser } from '../../app/features/user/userSlice'

function SocialLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const googleLogin = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result)
            try {
                if (result.user) {
                    const docRef = doc(db, "Users", result.user.uid)
                    const docSnapshot = await getDoc(docRef)
                    if (docSnapshot.exists()) {
                        dispatch(setUser({ uid: result.user.uid, email: result.user.email, ...docSnapshot.data() }));
                    } else {
                        await setDoc(doc(db, "Users", result.user.uid), {
                            email: result.user.email,
                            firstName: result.user.displayName,
                            lastName: "",
                            username: result.user.email.split("@")[0],
                            favorites: []
                        })
                    }
                    
                }
                toast.success("Logged In Successfully")
                navigate(HOME_ROUTE)
            } catch (error) {
                toast.error(error.message)
            }

        })
    }
    // github client ID -> Ov23liQxtgtuDHLmWjgB
    // github secret key -> 0e4ce5ce00f66293ddc57e09d95f86c4e1de53e3
    const githubLogin = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result)
            try {
                if (result.user) {
                    const docRef = doc(db, "Users", result.user.uid)
                    const docSnapshot = await getDoc(docRef)
                    if (docSnapshot.exists()) {
                        dispatch(setUser({ uid: result.user.uid, email: result.user.email, ...docSnapshot.data() }));
                    } else {
                        await setDoc(doc(db, "Users", result.user.uid), {
                            email: result.user.email,
                            firstName: result.user.displayName,
                            lastName: "",
                            username: result.user.email.split("@")[0],
                            favorites: []
                        })
                    }
                    
                }
                toast.success("Logged In Successfully")
                navigate(HOME_ROUTE)
            } catch (error) {
                toast.error(error.message)
            }
        })
    }

    return (
        <>
            <div className="social-login flex justify-center gap-4">
                <button onClick={googleLogin} className='text-sm text-neutral-400 bg-neutral-800 w-full py-4 flex gap-2 justify-center items-center rounded-md border border-neutral-600 hover:bg-neutral-600 cursor-pointer'>
                    <img src="/assets/google.png" alt="google logo" className='w-6 h-6' />
                    <div className="button-text">Sign in with Google</div>
                </button>
                <button onClick={githubLogin} className='text-sm text-neutral-400 bg-neutral-800 w-full py-4 flex gap-2 justify-center items-center rounded-md border border-neutral-600 hover:bg-neutral-600 cursor-pointer'>
                    <img src="/assets/github.png" alt="github logo" className='w-6 h-6' />
                    <div className="button-text">Sign in with GitHub</div>
                </button>
            </div>
            <div className="divider text-xs flex items-center gap-2 text-neutral-400 my-2">
                <div className="horizontal-line w-full py-[1px] rounded-full bg-neutral-500"></div>
                <div>OR</div>
                <div className="horizontal-line w-full py-[1px] rounded-full bg-neutral-500"></div>
            </div>
        </>
    )
}

export default SocialLogin