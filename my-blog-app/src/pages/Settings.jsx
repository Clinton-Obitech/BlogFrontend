import api from "../api/axios.js";
import { useEffect, useState } from "react";
import styles from "./Page.module.css";
import { toast } from "react-toastify";

export default function Settings() {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
    })

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const handleInputs = (e) => {
        setUserData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
       e.preventDefault();
       try {
        setSaving(true)
        const res = await api.put("/api/update/user", userData)
        toast.success(res.data.message)
        setUserData({
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
            username: res.data.user.username,
            email: res.data.user.email,
                })
       } catch (err) {
        console.error(err)
        toast.error(err.response?.data?.message || "Update failed");
        setSaving(false)
       } finally {
        setSaving(false)
       }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/api/user");
                setUserData({
                    firstname: res.data.user.firstname,
                    lastname: res.data.user.lastname,
                    username: res.data.user.username,
                    email: res.data.user.email,
                })
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [])
    
    if (loading) return (<p>Loading...</p>);
    return (
        <>
        <h1>Settings</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleInputs}
            />

             <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleInputs}
            />

             <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputs}
            />

             <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputs}
            />

            <button style={{backgroundColor: "teal"}} disabled={saving} type="submit">Save</button>
        </form>
        </>
    )
}