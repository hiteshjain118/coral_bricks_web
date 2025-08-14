import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const BookMeeting: React.FC = () => {
  useEffect(() => {
    // Redirect to Google Calendar appointment scheduling
    const calendarUrl = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0vbwue-yijz8oFHbva5O43LxTSwfJviXFF0QGJp103NtjiayqYDNowpm990S8ALCbi8yNNCMfF?gv=true';
    
    // Small delay to show the loading message
    const timer = setTimeout(() => {
      window.location.href = calendarUrl;
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 to-brick-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-coral-500 to-brick-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Meeting with Hitesh
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Redirecting you to schedule a meeting...
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-coral-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-coral-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-coral-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            If you're not redirected automatically, click the button below:
          </p>
          
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0vbwue-yijz8oFHbva5O43LxTSwfJviXFF0QGJp103NtjiayqYDNowpm990S8ALCbi8yNNCMfF?gv=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-coral-600 to-brick-600 text-white rounded-lg font-medium hover:from-coral-700 hover:to-brick-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Schedule Meeting</span>
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>You'll be redirected to Google Calendar to book your appointment.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BookMeeting; 