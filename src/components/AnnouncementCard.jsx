import React from 'react';
import { Edit2, Trash2, Calendar, MapPin } from 'lucide-react';

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="text-lg font-medium text-gray-900">{announcement.title}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
              {announcement.priority.toUpperCase()}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3">{announcement.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(announcement.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>{announcement.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(announcement)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            title="Edit Announcement"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(announcement.id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Delete Announcement"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;