import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./Page.module.css"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import api from "../api/axios.js";

export default function LoginPage() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const HandleData = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await api.post("/api/login", loginData);
            
            if (response.data.success) { 
                localStorage.setItem("user", JSON.stringify(response.data.user))
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate("/", {replace: true})
                    setLoading(false)
                }, 3000)

                setLoginData({
                    username: "",
                    password: "",
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
        <form className={styles.form} onSubmit={handleSubmit}>
            <legend>Login</legend>
            <div className={styles.loginContent}>
            <div>
              <span>Don't have an account?</span><NavLink to="/Register">Create account</NavLink>  
            </div>
            <button type="button"><i className="fa-brands fa-google"></i></button>
            <span>OR</span>
            </div>
            <fieldset>
            <legend>Username</legend>
            <input
            type='text'
            name="username"
            value={loginData.username}
            onChange={HandleData}
            />
            </fieldset>
            
            <fieldset>
            <legend>Password</legend>
            <input
            type='Password'
            name='password'
            value={loginData.password}
            onChange={HandleData}
            />
            </fieldset>
            <NavLink to="/forgetPassword">Forgot your password?</NavLink>
            <button disabled={loading} type='submit'>{loading ? "Logging in..." : "Login"}</button>
        </form>
        <button style={{display: "block", margin: "auto", color: "teal", fontSize: "1rem", border: "none", backgroundColor: "transparent"}} type="button">
            
        </button>
        </>
    )
}