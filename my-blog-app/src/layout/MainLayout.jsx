import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Socials from '../components/Socials'
import Newsletter from '../components/Newsletter'

export default function MainLayout() {
    return (
        <>
        <Header />
        <Outlet />
        <Newsletter />
        <Socials />
        <Footer />
        </>
    )
}