import {auth, provider} from '../config/Firebase';
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router-dom";

export const Login= ()=>{
    const navigate= useNavigate();

    const signInWithGoogle= async () =>{
        const result= await signInWithPopup(auth, provider)
        console.log(result);
        navigate('/');
    };

    return(
        <div>
            <p className="sign-in">Sign In With Google To Continue</p>
            <button className="sign-in-btn" onClick= {signInWithGoogle}>Sign In WIth Google</button>
        </div>
    );
};