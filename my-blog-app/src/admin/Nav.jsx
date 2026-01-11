import { NavLink } from "react-router-dom"
import "./Nav.css"

export default function AdminNav() {
    return (
        <nav className="NavLink">
        <NavLink className={({isActive}) => isActive ? "home" : "Links"} to="/admin/Dashboard">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Inside">Inside naija <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Government">Government <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Entertainment">Entertainment <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Culture">Culture / tradition <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Religion">Religion / faith <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Education">Education <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Health">Health <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Sports">Sports <i class="fa-solid fa-pen-to-square"></i></NavLink>
        </nav>
    )
}