import api from "../api/axios.js";
import { useEffect, useState } from "react"
import styles from "./Page.module.css"

export default function Settings() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchInfo = async () => {
            try {
                const res = await api.get("/api/user")
                setLoading(false)
                setUser(res.data.user)
            } catch (err) {
                console.error(err)
            } 
        }
        fetchInfo();
        }, [])
    

    
    if (loading) return (<h3 style={{textAlign: "center", paddingTop: "1rem"}} className={styles.userInfo}>Loading Settings...</h3>)
    return (
        <div className={styles.userInfo}>
            <h2>Settings</h2>
            <div>
                <div>
                    <form>
                        <fieldset>
                            <legend>firstname</legend>
                            <input
                            type="text"
                            value={user.firstname}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>lastname</legend>
                            <input
                            type="text"
                            value={user.lastname}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>username</legend>
                            <input
                            type="text"
                            value={user.username}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>email</legend>
                            <input
                            type="email"
                            value={user.email}
                            />
                        </fieldset>
                        
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}