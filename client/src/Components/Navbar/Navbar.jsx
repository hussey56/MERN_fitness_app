import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Hamburger from "../../Assets/hamburger.svg";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { getalerts, signout } from "../../Api/internal";
import { resetUser, setAlerts } from "../../Store/UserSlice";

const Navbar = () => {
  const user = useSelector((state)=>state.user);

  const  Auth = useSelector((state)=>state.user);
  const [showNavbar, setShowNavbar] = useState(false);
  const header = useNavigate();
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleHome = () => {
    header("/");
  };
  const dispatch = useDispatch();

  const Logout = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={handleHome}>
          <h2 className="text-dark" style={{ fontFamily: "monospace" }}>
            <span
              className="text-primary"
              style={{ fontFamily: "cursive", fontWeight: "bold" }}
            >
              F
            </span>
            Tracker
          </h2>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={Hamburger} alt="men" />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
          <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/workouts">Workouts</NavLink>
            </li>

            <li>
              <NavLink to="/mydiet">My Diet</NavLink>
            </li>
            <li>
              <NavLink to="/alerts">Alerts ( <strong className="text-primary">{user.alerts.length}</strong> )</NavLink>
            </li>
            <li className="button-59" onClick={Logout}>
            Profile
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
