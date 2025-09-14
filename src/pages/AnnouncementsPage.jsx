import React, { useState } from 'react';
import AnnouncementList from '../components/AnnouncementList';
import AnnouncementForm from '../components/AnnouncementForm';

const AnnouncementsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAnnouncementAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-600">Create and manage announcements for patients</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnnouncementForm onAnnouncementAdded={handleAnnouncementAdded} />
        <AnnouncementList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default AnnouncementsPage;
