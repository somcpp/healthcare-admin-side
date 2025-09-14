import React from 'react';
import { Edit2, Trash2, Calendar, Check } from 'lucide-react';

const VaccinationCard = ({ vaccination, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate, status) => {
    const today = new Date();
    const due = new Date(dueDate);
    return status === 'pending' && due < today;
  };

  return (
    <div className={`border rounded-lg p-4 ${isOverdue(vaccination.dueDate, vaccination.status) ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="text-lg font-medium text-gray-900">{vaccination.vaccine}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vaccination.status)}`}>
              {vaccination.status.charAt(0).toUpperCase() + vaccination.status.slice(1)}
            </span>
            {isOverdue(vaccination.dueDate, vaccination.status) && (
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                Overdue
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <Calendar size={14} />
            <span>Due: {formatDate(vaccination.dueDate)}</span>
          </div>
          
          {vaccination.description && (
            <p className="text-sm text-gray-600">{vaccination.description}</p>
          )}
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(vaccination)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            title="Edit Vaccination"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(vaccination.id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Delete Vaccination"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaccinationCard;
