import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo1.png" 
                alt="Coral Bricks AI Logo" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold">Coral Bricks AI</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Easily build and deploy secure, compliant and custom AI agents—no code, no drag-and-drop
            </p>
                          <div className="flex space-x-4">
                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0vbwue-yijz8oFHbva5O43LxTSwfJviXFF0QGJp103NtjiayqYDNowpm990S8ALCbi8yNNCMfF?gv=true" className="text-gray-400 hover:text-coral-400 transition-colors flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-sm font-medium">Schedule a Meeting</span>
                </a>
              </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-coral-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-coral-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-coral-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-coral-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Coral Bricks AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 