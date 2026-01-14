import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
import api from "../api/axios.js";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
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
    }, [])

    const logOut = async () => {
        setLoading(true)
        try {
        await api.post("/api/logout", {})
        setAdmin(null)
        setLoading(false)
        navigate("/admin/login", {replace: true})
        } catch (err) {
            console.error(err)
        }
    }

   return (
    <div className={styles.adminHeader}>
    {admin ? <h2>{admin.username} Dashboard</h2> : <h2>Loading...</h2>}
    <button disabled={loading} onClick={logOut}>{loading ? "Logging out..." : "Logout"}</button>
    </div>
   )
}