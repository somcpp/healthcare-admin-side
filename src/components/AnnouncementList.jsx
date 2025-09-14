import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { announcements as mockAnnouncements } from '../data/mockData';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementList = ({ refreshTrigger }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, [refreshTrigger]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      // TODO: fetch from ${API_BASE}/api/announcements
      // const response = await fetch(`${API_BASE}/api/announcements`);
      // const data = await response.json();
      // setAnnouncements(data);
      
      // Fallback to mock data
      setAnnouncements(mockAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements(mockAnnouncements);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    // This will be handled by parent component
    console.log('Edit announcement:', announcement.id);
  };

  const handleDelete = async (announcementId) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      // TODO: connect to backend DELETE ${API_BASE}/api/announcements/${announcementId}
      // const response = await fetch(`${API_BASE}/api/announcements/${announcementId}`, {
      //   method: 'DELETE'
      // });
      
      // Optimistic update for mock data
      setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Loading announcements...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">All Announcements</h3>
      </div>
      
      <div className="p-6">
        {announcements.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">No announcements found</div>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
