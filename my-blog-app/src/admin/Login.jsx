import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "../pages/Page.module.css";
import { toast } from "react-toastify";
import api from "../api/axios.js"

export default function LoginAdmin() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const navigate = useNavigate();

    const HandleData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const SubmitForm = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/api/login/admin", formData)
            toast.success(response.data.message)

            if (response.data.success) {
            
            setTimeout(() => {
                navigate('/admin/Dashboard', {replace: true})
            }, 3000)

            setFormData({
            username: "",
            password: ""
        })

        }

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <>
        <form onSubmit={SubmitForm} className={styles.form}>
            <legend>Admin Login</legend>
            
            <input
            type='text'
            name="username"
            value={formData.username}
            placeholder="Username..."
            onChange={HandleData}
            />
            
            <input
            type='Password'
            name="password"
            value={formData.password}
            placeholder="Password..."
            onChange={HandleData}
            />

            <button type="submit">Login</button>
        </form>
        </>
    )
}