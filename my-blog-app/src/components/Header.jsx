import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import styles from "./Header.module.css";
import SideNav from './SideNav.jsx';
import api from "../api/axios.js";

function Header() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const res = await api.get("/api/home");
      setUser(res.data.user)
    }
  getUser();
}, []);

  const navHome = () => {
    navigate("/", {replace: true})
  }

  const userStyle = {
    display: "flex", 
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "0px 0px 2px teal",
    borderRadius: "50px 5px 5px 50px",
    padding: "0.2rem",
  }

    return (
        <>
        <header>

          <h2 onClick={navHome}><i className="fa-solid fa-tv"></i> Blog Website</h2>

          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <div>
          {user ? 
          <div style={userStyle}>
            <div style={{height: "25px", width: "25px", borderRadius: "100%", backgroundColor: "green"}}></div>
            <h3 style={{marginLeft: "0.2rem"}}>{user.username}</h3> 
          </div>
           : 
          <NavLink style={{fontSize: "1.2rem", textDecoration: "none", color: "black"}} to='/Login'><i style={{color: "teal"}} className="fa-solid fa-user"></i> Sign in</NavLink>}
          </div>
          </div>

        </header>

        <div className={styles.navs}>
        <nav className="Nav">
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Inside">Inside naija</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Government">Government</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Entertainment">Entertainment</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Culture">Culture / tradition</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Religion">Religion / faith</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Education">Education</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Health">Health</NavLink>
        <NavLink className={({isActive}) => isActive ? "NavLinks-active" : "NavLinks"} to="/Sports">Sports</NavLink>
        </nav>
        <SideNav user={user} setUser={setUser}/>
        </div>
        </>
    )
}

export default Header