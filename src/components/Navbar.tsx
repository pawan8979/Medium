import {Link} from "react-router-dom";
import {auth} from '../config/Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {signOut} from "firebase/auth";

export const Navbar= ()=>{
    const [user]= useAuthState(auth);

    const signUserOut= async() =>{
        await signOut(auth);
    };

    return(
        <div className= "navbar">
            <nav className="main-nav">
                <div className="logo">PostHub</div>
                <div className="links">
                    <Link to="/">Home</Link>
                    <div>
                    {!user ? (<Link to="/login">Login</Link>):<Link to= "/createpost">Create Post</Link>
                    }
                    </div>
            
                </div>
                <div className= "user">
                    {user && (
                        <>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || ""} width="20" height="20"/>
                        <button onClick={signUserOut}>Log Out</button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};