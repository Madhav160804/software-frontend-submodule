import React, { useState } from 'react';

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    'New student preferences submitted.',
    'System maintenance scheduled for October 25th.',
    'Deadline for preference selection approaching.',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button onClick={toggleDropdown} className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405a2.032 2.032 0 01-.595-1.405V11a7.002 7.002 0 00-5-6.71V4a3 3 0 10-6 0v.29A7.002 7.002 0 004 11v3.19c0 .518-.214 1.014-.595 1.405L2 17h5m5 0v1a3 3 0 01-6 0v-1m6 0H9"
          />
        </svg>
        {/* Notification badge */}
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Notifications
            </h2>
            <ul className="divide-y divide-gray-200">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index} className="py-2 text-gray-700">
                    {notification}
                  </li>
                ))
              ) : (
                <li className="py-2 text-gray-700">No new notifications</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
