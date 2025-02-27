import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, PlusSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <h1 className="text-xl font-bold text-gray-800">ArtGallery</h1>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/galleries" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/galleries') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
            >
              Galleries
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/favorites" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/favorites') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                >
                  Favorites
                </Link>
                {user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center ml-4">
                  <span className="text-sm font-medium text-gray-700 mr-2">{user?.username}</span>
                  <button 
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/login') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/galleries" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/galleries') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
              onClick={closeMenu}
            >
              Galleries
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/favorites" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/favorites') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                  onClick={closeMenu}
                >
                  Favorites
                </Link>
                {user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                    onClick={closeMenu}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center">
                    <User size={16} className="mr-1 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">{user?.username}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link 
                  to="/login" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/login') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;