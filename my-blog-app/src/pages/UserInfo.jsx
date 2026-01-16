import api from "../api/axios.js";
import { useEffect, useState } from "react"
import styles from "./Page.module.css"

export default function UsersInfo() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserInfo = async () => {
            const res = await api.get("/api/user")
            setUser(res.data.user)
            setLoading(false)
        }
        fetchUserInfo();
    }, [])

    return (
        <div className={styles.userInfo}>
           {loading ? (<h3 style={{margin: "0.7rem 1rem 0"}}>Loading...</h3>) : (

            <ul>
                <h2>Your Information</h2>
                <li><span>firstname</span>{user.firstname}</li>
                <li><span>lastname</span>{user.lastname}</li>
                <li><span>username</span>{user.username}</li>
                <li><span>email</span>{user.email}</li>
            </ul>

           )}
        </div>
    )
}