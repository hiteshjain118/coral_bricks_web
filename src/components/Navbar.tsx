import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Agents', href: '/agents' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isCreatePage = location.pathname === '/demo';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Coral Bricks AI Logo" 
              className="h-8 w-auto"
            />
            <span className="text-lg font-bold text-gray-900">
              {isCreatePage ? 'Agent Builder' : 'Coral Bricks AI'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-coral-600 border-b-2 border-coral-600'
                    : 'text-gray-700 hover:text-coral-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>



          {/* Authentication UI */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <UserIcon className="w-4 h-4" />
                  <span>{user.display_name || user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-coral-600 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-coral-600 to-brick-600 rounded-lg hover:from-coral-700 hover:to-brick-700 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-coral-600 focus:outline-none focus:text-coral-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Navigation links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-coral-600 bg-coral-50'
                      : 'text-gray-700 hover:text-coral-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Authentication in mobile menu */}
              {user ? (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-brick-600 rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                                      <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.display_name || user.email}</p>
                    <p className="text-gray-500">Signed in</p>
                  </div>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-coral-600 hover:text-coral-700 hover:bg-coral-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 