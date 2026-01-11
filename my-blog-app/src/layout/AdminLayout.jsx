import { Outlet } from "react-router-dom";
import AdminNav from "../admin/Nav";
import { AuthHeader } from "./AuthLayout";

export default function AdminLayout() {
    return (
        <>
        <AuthHeader />
        <AdminNav />
        <Outlet />
        </>
    )
}