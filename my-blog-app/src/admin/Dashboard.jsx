import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
import api from "../api/axios.js";
import { toast } from "react-toastify";

export default function Dashboard() {
    const cachedAdmin = JSON.parse(localStorage.getItem("admin"));
    const [admin, setAdmin] = useState(cachedAdmin);

    const navigate = useNavigate();

    useEffect(() => {
        if (cachedAdmin) return;

        let ignore = false; 

        const getAdmin = async () => {
            try {
            const res = await api.get("/api/admin/dashboard")
            if (!ignore) {
            setAdmin(res.data.admin)
            localStorage.setItem("admin", JSON.stringify(res.data.admin))
            }
            } catch (err) {
            console.error(err);
            navigate("/", {replace: true})
            toast.error(err.response?.data?.message)
            if (!ignore) setAdmin({username: "Admin"})
            }
        }
        getAdmin();

        return () => {
        ignore = true;
        }
    }, [])

    const logOut = async () => {
        await api.post("/api/logout", {})
        setAdmin(null)
        navigate("/admin/login", {replace: true})
        localStorage.removeItem("admin")
    }

   return (
    <div className={styles.adminHeader}>
    {admin ? <h2>{admin.username} Dashboard</h2> : <h2>Loading...</h2>}
    <button onClick={logOut}>Logout</button>
    </div>
   )
}