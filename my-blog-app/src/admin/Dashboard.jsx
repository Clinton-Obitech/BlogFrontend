import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
import api from "../api/axios.js";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [admin, setAdmin] = useState({});
    const [username, setUsername] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setUsername(JSON.parse(localStorage.getItem("admin")));
        const getAdmin = async () => {
            try {
            const res = await api.get("/api/admin/dashboard");
            setAdmin(res.data.admin)
            } catch (err) {
            console.error(err);
            navigate("/", {replace: true})
            toast.error(err.response?.data?.message)
            }
        }
        getAdmin();
    }, [username])

    const logOut = async () => {
        setLoading(true)
        try {
        await api.post("/api/logout", {})
        setAdmin(null)
        navigate("/admin/login", {replace: true})
        localStorage.removeItem("admin")
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

   return (
    <div className={styles.adminHeader}>
    {admin ? <h2>{username.username} Dashboard</h2> : <h2>Loading...</h2>}
    <button disabled={loading} onClick={logOut}>Logout</button>
    </div>
   )
}