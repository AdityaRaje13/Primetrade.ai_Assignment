import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

export const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const token = Cookies.get("token");

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    toast.success("Logged out successfully");
    navigate('/');
  }

  // Don't show navbar on login and register pages
  if (location.pathname === '/' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="text-2xl font-bold flex items-center">
              📝 Notes App
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user && token ? (
              <>
                <span className="text-sm">Welcome, {user.username}</span>
                <span className="text-xs bg-blue-500 px-2 py-1 rounded">{user.role}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <Link to="/" className="hover:bg-blue-500 px-3 py-2 rounded transition">
                  Login
                </Link>
                <Link to="/register" className="hover:bg-blue-500 px-3 py-2 rounded transition">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
