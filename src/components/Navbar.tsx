import { Link } from "react-router-dom";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const triggerToggle = () => {
    document.querySelector(".dropdown-menu")?.classList.toggle("open");

    const isOpen = document
      .querySelector(".dropdown-menu")
      ?.classList.contains("open");
  };
  return (
    <div className="nav">
      <nav className={user ? "navbar-logout" : "navbar-login"}>
        <div className="logo">PostHub</div>
        <ul className="links">
          <li>
            <Link to="/" className="a">
              Home
            </Link>
          </li>
          {user ? (
            <li>
              <Link to="/createpost" className="a">
                Create Post
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="a">
                Login
              </Link>
            </li>
          )}
          {user && (
            <div className="afterLoginNav">
              <img src={user?.photoURL || ""} alt="profile_picture" />
              <button className="logout-btn" onClick={signUserOut}>
                Log out
              </button>
            </div>
          )}
        </ul>
        <div className="toggle-btn" onClick={triggerToggle}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="dropdown-menu">
          <li>
            <Link to="/" className="a">
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/createpost" className="a">
                  Create Post
                </Link>
              </li>
              <li>
                <div className="afterLoginNav">
                  <img src={user?.photoURL || ""} alt="profile_picture" />
                  <button className="logout-btn" onClick={signUserOut}>
                    Log out
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="a">
                Login
              </Link>
            </li>
          )}
        </div>
      </nav>
    </div>
  );
};
