import React from 'react'
import Menubar from './components/Menubar/Menubar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Explore from './pages/Explore/Explore'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageItems from './pages/ManageItems/ManageItems'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import {Toaster} from 'react-hot-toast'
import Login from './pages/login/Login'
import OrderHistory from './pages/OrderHistory/OrderHistory'

const App = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname != "/login" && <Menubar />}
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App