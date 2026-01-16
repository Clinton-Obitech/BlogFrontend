import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "../pages/Page.module.css";
import api from "../api/axios.js";
import { toast } from "react-toastify";

export default function RegisterAdmin() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const HandleData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const SubmitForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await api.post("/api/register/admin", formData)

            if (response.data.success) {
            toast.success(response.data.message)
            localStorage.setItem("admin", JSON.stringify(response.data.admin))
            setTimeout(() => {
                setLoading(false)
                navigate('/admin/Dashboard', {replace: true})
            }, 3000)

            setFormData({
            username: "",
            email: "",
            password: ""
        })

        }

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <form onSubmit={SubmitForm} className={styles.form}>
            <legend>Admin Sign Up</legend>
            <fieldset>
            <legend>Username</legend>
            <input
            type='text'
            name="username"
            value={formData.username}
            onChange={HandleData}
            />
            </fieldset>
            
            <fieldset>
            <legend>Email address</legend>
            <input
            type='email'
            name="email"
            value={formData.email}
            onChange={HandleData}
            />
            </fieldset>

            <fieldset>
            <legend>Password</legend>
            <input
            type='Password'
            name="password"
            value={formData.password}
            onChange={HandleData}
            />
            </fieldset>

            <button disabled={loading} type="submit">{loading ? "Creating account.." : "Register"}</button>
        </form>
        </>
    )
}