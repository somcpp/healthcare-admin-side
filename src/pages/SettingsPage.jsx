import React from 'react';
import { Settings, Shield, Users } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">System configuration and preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">
          <Settings size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Settings Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            Authentication, user roles, and system settings will be added in the next phase.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Shield size={32} className="mx-auto text-gray-400 mb-2" />
              <h4 className="font-medium text-gray-700">Authentication</h4>
              <p className="text-sm text-gray-500 mt-1">Login & security settings</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users size={32} className="mx-auto text-gray-400 mb-2" />
              <h4 className="font-medium text-gray-700">User Roles</h4>
              <p className="text-sm text-gray-500 mt-1">Manage admin permissions</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Settings size={32} className="mx-auto text-gray-400 mb-2" />
              <h4 className="font-medium text-gray-700">System Config</h4>
              <p className="text-sm text-gray-500 mt-1">Application preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;