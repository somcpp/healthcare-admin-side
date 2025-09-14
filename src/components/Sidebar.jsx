import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Syringe, Bell, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/patients', icon: Users, label: 'Patients' },
    { path: '/announcements', icon: Bell, label: 'Announcements' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="bg-white w-64 min-h-screen fixed left-0 top-16 border-r border-gray-200 z-40">
      <nav className="mt-6">
        <div className="px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;