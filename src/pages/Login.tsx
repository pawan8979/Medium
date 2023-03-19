import "./styles/login.css";
import { auth, provider } from "../config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="login-mod">
      <h1>Signin with Google to continue...</h1>
      <br></br>
      <div className="login-btn" onClick={signInWithGoogle}>
        <button>Signin with Google</button>
      </div>
      <br></br>
    </div>
  );
};
