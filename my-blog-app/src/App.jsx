import { Routes, Route } from 'react-router-dom'
import './App.css'
import Inside from './pages/Inside'
import Home from './pages/Home'
import Government from './pages/Government'
import Entertainment from './pages/Entertainment'
import Education from './pages/Education'
import Culture from './pages/Culture'
import Religion from './pages/Religion'
import Health from './pages/Health'
import Sports from './pages/Sports'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterAdmin from './admin/Register'
import LoginAdmin from './admin/Login'
import Dashboard from './admin/Dashboard'
import AdminLayout from './layout/AdminLayout'
import AdminInside from './admin/Inside'
import AdminGovernment from './admin/Government'
import AdminEntertainment from './admin/Entertainment'
import AdminEducation from './admin/Education'
import AdminCulture from './admin/Culture'
import AdminReligion from './admin/Religion'
import AdminHealth from './admin/Health'
import AdminSport from './admin/Sports'

export default function App() {

  return (
    <>
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/Inside" element={<Inside />} />
      <Route path="/Government" element={<Government />} />
      <Route path="/Entertainment" element={<Entertainment />} />
      <Route path="/Education" element={<Education />} />
      <Route path="/Culture" element={<Culture />} />
      <Route path="/Religion" element={<Religion />} />
      <Route path="/Health" element={<Health />} />
      <Route path="/Sports" element={<Sports />} />
      </Route>

      <Route element={<AuthLayout />}>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/admin/register" element={<RegisterAdmin />} />
      <Route path="/admin/login" element={<LoginAdmin />} />
      </Route>

      <Route element={<AdminLayout />}>
      <Route path="/admin/Dashboard" element={<Dashboard />} />
      <Route path="/admin/Inside" element={<AdminInside />} />
      <Route path="/admin/Government" element={<AdminGovernment />} />
      <Route path="/admin/Entertainment" element={<AdminEntertainment />} />
      <Route path="/admin/Education" element={<AdminEducation />} />
      <Route path="/admin/Culture" element={<AdminCulture />} />
      <Route path="/admin/Religion" element={<AdminReligion />} />
      <Route path="/admin/Health" element={<AdminHealth />} />
      <Route path="/admin/Sports" element={<AdminSport />} />
      </Route>

      </Routes>

    <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}