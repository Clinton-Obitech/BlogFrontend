import axios from "axios";
import { useEffect, useState } from "react"
import styles from "./Page.module.css"

export default function UsersInfo() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            const res = await axios.get("/api/user", { withCredentials: true})
            setUser(res.data.user)
        }
        fetchUserInfo();
    }, [])
    return (
        <div className={styles.userInfo}>
            <ul>
                <h2>Your Information</h2>
                <li><span>firstname</span>{user.firstname}</li>
                <li><span>lastname</span>{user.lastname}</li>
                <li><span>username</span>{user.username}</li>
                <li><span>email</span>{user.email}</li>
            </ul>
        </div>
    )
}