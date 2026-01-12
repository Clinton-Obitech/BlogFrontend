import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
import api from "../api/axios.js";

export default function Dashboard() {
    const cachedAdmin = JSON.parse(localStorage.getItem("admin"));
    const [admin, setAdmin] = useState(cachedAdmin)

    const navigate = useNavigate();

    useEffect(() => {
        if (cachedAdmin) return;

        let ignore = false; 

        const getAdmin = async () => {
            try {
            const res = await api.get("/api/admin/dashboard")
            if (!ignore) {
            setUser(res.data.admin)
            localStorage.setItem("user", JSON.stringify(res.data.admin))
            }
            } catch (err) {
            console.error(err);
            if (!ignore) setAdmin({username: "Admin"})
            }
        }
        getAdmin();
    }, [])

    const logOut = async () => {
        await api.post("/api/logout", {})
        setAdmin(null)
        navigate("/admin/login", {replace: true})
    }

   return (
    <div className={styles.adminHeader}>
    {admin ? <h2>{admin.username} Dashboard</h2> : <h1>Dashboard</h1>}
    <button onClick={logOut}>Logout</button>
    </div>
   )
}