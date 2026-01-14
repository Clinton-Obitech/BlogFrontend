import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from './Page.module.css';
import { toast } from "react-toastify";
import api from "../api/axios.js";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const HandleData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const SubmitForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await api.post("/api/register", formData)
            toast.success(response.data.message)
            if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setTimeout(() => {
                navigate('/', {replace: true})
                setLoading(false)
            }, 3000)

            setFormData({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
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
            <legend>Sign Up</legend>
            <fieldset>
            <legend>Firstname</legend>
            <input
            type='text'
            name="firstname"
            value={formData.firstname}
            onChange={HandleData}
            />
            </fieldset>

            <fieldset>
            <legend>Lastname</legend>
            <input
            type='text'
            name="lastname"
            value={formData.lastname}
            onChange={HandleData}
            />
            </fieldset>
            
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

            <button disabled={loading} type="submit">{loading ? "Creating account" : "Sign Up"}</button>
        </form>
        </>
    )
}