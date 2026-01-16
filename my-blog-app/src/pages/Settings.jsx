import api from "../api/axios.js";
import { useEffect, useState } from "react";
import styles from "./Page.module.css";
import { toast } from "react-toastify";

export default function Settings() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

        const handleInputs = (e) => {
            setUser(prev => ({
                ...prev, [e.target.name]: e.target.value
        }))
    }
    
    if (loading) return (<h3 style={{textAlign: "center", paddingTop: "1rem"}} className={styles.userInfo}>Loading Settings...</h3>)
    return (
        <div className={styles.userInfo}>
            <div>
                <div className={updateInfo}>
                    <form>
                        <fieldset>
                            <legend>firstname</legend>
                            <input
                            type="text"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleInputs}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>lastname</legend>
                            <input
                            type="text"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleInputs}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>username</legend>
                            <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputs}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>email</legend>
                            <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputs}
                            />
                        </fieldset>
                        
                        <button disabled={saving} type="submit">Save</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}