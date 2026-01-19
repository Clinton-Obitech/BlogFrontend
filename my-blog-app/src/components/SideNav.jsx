import styles from "./components.module.css";
import { useEffect, useState } from 'react'
import api from "../api/axios.js";
import UserInfo from "../pages/UserInfo.jsx";
import Settings from "../pages/Settings.jsx";
import Terms from "../pages/Terms.jsx";
import About from "../pages/About.jsx";
import Privacy from "../pages/Privacy.jsx";

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
    {key: "user", label: "User Information", openLabel: "Your Information", component: <UserInfo />},
    {key: "settings", label: "User Settings", openLabel: "Change Information", component: <Settings /> },
    {key: "terms", label: "Terms", openLabel: "Terms and Condition", component: <Terms />},
    {key: "privacy", label: "Privacy", openLabel: "Privacy Policy", component: <Privacy />},
    {key: "about", label: "About", openLabel: "About Us", component: <About />}
  ]

  const navOfflineItems = [
    {key: "terms", label: "Terms", openLabel: "Terms and Condition", component: <Terms />},
    {key: "privacy", label: "Privacy", openLabel: "Privacy Policy", component: <Privacy />},
    {key: "about", label: "About", openLabel: "About Us", component: <About />}
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
            <button className={styles.logoutBtn} disabled={loading} onClick={logOut}>{loading ? "Logging Out.." : "Logout"}</button> : null
          }
          
            {navItems.map(item => (
            user && (
                <div key={item.key}>
              <button className={active === item.key ? styles.openLabel : styles.userInfoBtn} type="button" onClick={() => handleToggle(item.key)}>{active === item.key ? item.openLabel : item.label} {active === item.key ? <i style={{color: "teal"}} className="fa-solid fa-circle-xmark"></i> : null}</button>

              {active === item.key && (
                <>
                {item.component}
                </>
              )}
            </div>
            )
  
          ))}

          {navOfflineItems.map(item => (
            !user && (
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