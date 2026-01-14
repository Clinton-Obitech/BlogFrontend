import { NavLink } from "react-router-dom"
import "./Nav.css"

export default function AdminNav() {
    return (
        <nav className="NavLink">
        <NavLink className={({isActive}) => isActive ? "home" : "Links"} to="/admin/Dashboard">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Inside">Manage Inside naija <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Government">Manage Government <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Entertainment">Manage Entertainment <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Culture">Manage Culture / tradition <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Religion">Manage Religion / faith <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Education">Manage Education <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Health">Manage Health <i class="fa-solid fa-pen-to-square"></i></NavLink>
        <NavLink className={({isActive}) => isActive ? "active" : "Links"} to="/admin/Sports">Manage Sports <i class="fa-solid fa-pen-to-square"></i></NavLink>
        </nav>
    )
}