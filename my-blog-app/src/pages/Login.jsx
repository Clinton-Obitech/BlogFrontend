import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./Page.module.css"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import api from "../api/axios.js"

export default function LoginPage() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })

    const navigate = useNavigate();

    const HandleData = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/login", loginData);
            
            if (response.data.success) { 
                setUser(response.data.user)
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate("/", {replace: true})
                }, 3000)

                setLoginData({
                    username: "",
                    password: "",
                })
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <legend>Login</legend>
            <input
            type='text'
            name="username"
            value={loginData.username}
            placeholder='Username...'
            onChange={HandleData}
            />

            <input
            type='Password'
            name="password"
            value={loginData.password}
            placeholder='Password...'
            onChange={HandleData}
            />
            <button type='submit'>Login</button>
        </form>
        <button style={{display: "block", margin: "auto", color: "teal", fontSize: "1rem", border: "none", backgroundColor: "transparent"}} type="button">
            <NavLink style={{color: "teal"}} to="/Register">create account</NavLink>
        </button>
        </>
    )
}