import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function AuthLayout() {
    return (
        <>
        <AuthHeader />
        <Outlet />
        </>
    )
}

export function AuthHeader() {
    const navigate = useNavigate();
    const navHome = () => {
    navigate("/", {replace: true})
    }

    const header = {
        width: "97%",
        border: "1.5px solid teal",
        position: "relative",
        margin: "0.5rem auto",
        borderRadius: "5px",
        fontSize: "0.8rem"
    }
    return (
        <header style={header}>
            <h2 onClick={navHome}><i className="fa-solid fa-tv"></i> Blog Website</h2>
        </header>
    )
}