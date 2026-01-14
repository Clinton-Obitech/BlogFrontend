import { useState } from 'react';
import './Newsletter.css';
import api from "../api/axios.js";
import { toast } from 'react-toastify';

export default function Newsletter() {
    const [email, setEmail] = useState({
        email: ""
    });
    const [loading, setLoading] = useState(false);

    const HandleEmail = (e) => {
        setEmail({...email, [e.target.name]: e.target.value})
    }

    const SubmitEmail = async (e) => {

        e.preventDefault();
        try {
            setLoading(true)
            const response = await api.post("/api/newsletter", email);
            toast.success(response.data.message)
        } catch (err) {
            toast.error(err.response?.data?.message)
        } finally {
            setLoading(false)
            setEmail({
            email: ""
            })
    }
    }
    return (
        <section className="newsletter">
         <h3>subscribe to our newsletter</h3>
         <form onSubmit={SubmitEmail}>
         <input 
         type="email" 
         name="email" 
         value={email.email}
         placeholder="enter your email" 
         onChange={HandleEmail}
         />

         <input type="submit" disabled={loading} value={loading ? "Subscribing.." : "Subscribe"} />

         </form>
        </section>
    )
}