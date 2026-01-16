import styles from "./components.module.css";
import { useEffect, useState } from 'react'
import api from "../api/axios.js";
import UserInfo from "../pages/UserInfo.jsx";
import Settings from "../pages/Settings.jsx";

export default function SideNav({user, setUser}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState(null);
    const [loading, setLoading] = useState(false);

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
      try {
      setLoading(true)
      await api.post("/api/logout", {});
      setMenuOpen(false)
      setUser(null)
      localStorage.removeItem("user")
      } catch (err) {
      console.error(err)
      } finally {
        setLoading(false)
      }
    }
  const navItems = [
    {key: "user", label: "User Information", component: <UserInfo />},
    {key: "setting", label: "User Settings", component: <Settings /> }
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
            <button className={styles.logoutBtn} onClick={logOut}>{loading ? "Logging Out.." : "Logout"}</button> : null
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