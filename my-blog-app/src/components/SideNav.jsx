import styles from "./components.module.css";
import { useEffect, useState } from 'react'
import api from "../api/axios.js";
import UserInfo from "../pages/UserInfo.jsx";

export default function SideNav({user, setUser}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState(null);

    useEffect(() => {
    if(menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen])

    const logOut = async () => {
      await api.post("/api/logout", {});
      setMenuOpen(false)
      setUser(null)
    }
  const navItems = [
    {key: "user", label: "User Information", component: <UserInfo />},
  ]

  const handleToggle = (key) => {
      setActive(prev => (prev === key ? null : key))
    }
    return (
        <>
        <div className={styles.sideNav}>
        <i onClick={() => setMenuOpen(!menuOpen)} className={!menuOpen ? "fa-solid fa-bars" : "fa-solid fa-xmark"}></i>
        {menuOpen && (
          <div className={styles.dropDiv}>
          {user ?  
            <button className={styles.logoutBtn} onClick={logOut}>Logout</button> : null
          }
          
          
            {navItems.map(item => (
            user && (
                <div key={item.key}>
              <button className={styles.userInfoBtn} type="button" onClick={() => handleToggle(item.key)}>{item.label}</button>

              {active === item.key && (
                <>
                {item.component}
                </>
              )}
            </div>
            )
  
          ))}

        </div>
        )}
        </div>
        </>
    )
}