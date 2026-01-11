import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from './Page.module.css'
import axios from "axios";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate();

    const HandleData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const SubmitForm = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("/api/register", formData, { withCredentials: true})
            toast.success(response.data.message)

            if (response.data.success) {
            
            setTimeout(() => {
                navigate('/', {replace: true})
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
            <input
            type='text'
            name="firstname"
            value={formData.firstname}
            placeholder="Firstname..."
            onChange={HandleData}
            />

            <input
            type='text'
            name="lastname"
            value={formData.lastname}
            placeholder="Lastname..."
            onChange={HandleData}
            />
            
            <input
            type='text'
            name="username"
            value={formData.username}
            placeholder="Username..."
            onChange={HandleData}
            />
            
            <input
            type='email'
            name="email"
            value={formData.email}
            placeholder="Email address..."
            onChange={HandleData}
            />
            
            <input
            type='Password'
            name="password"
            value={formData.password}
            placeholder="Password..."
            onChange={HandleData}
            />

            <button type="submit">Register</button>
        </form>
        </>
    )
}