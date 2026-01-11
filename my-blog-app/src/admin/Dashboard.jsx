import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [admin, setAdmin] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const getAdmin = async () => {
            try {
            const res = await axios.get("/api/admin/dashboard", { withCredentials: true })
            setAdmin(res.data.admin)
            } catch (err) {
            setAdmin(null)
            toast.error(err.response?.data?.message);
            navigate("/", {replace: true})
            }
        }
        getAdmin();
    }, [])

    const logOut = async () => {
        await axios.post("/api/logout", {}, { withCredentials:true })
        setAdmin(null)
        navigate("/admin/Login", {replace: true})
    }

   return (
    <div className={styles.adminHeader}>
    {admin ? <h2>{admin.username} Dashboard</h2> : <h1>Dashboard</h1>}
    <button onClick={logOut}>Logout</button>
    </div>
   )
}