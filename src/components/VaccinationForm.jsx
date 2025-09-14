import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle, Calendar, User } from 'lucide-react';
import { API_BASE } from '../config';
import { patients as mockPatients, vaccinationSchedule as mockVaccinations } from '../data/mockData';
import VaccinationCard from './VaccinationCard';

const VaccinationForm = () => {
  const { userId } = useParams();
  const [patient, setPatient] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVaccination, setEditingVaccination] = useState(null);
  const [formData, setFormData] = useState({
    vaccine: '',
    dueDate: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    if (userId) {
      fetchPatientData();
      fetchVaccinations();
    }
  }, [userId,showForm]);

  const fetchPatientData = async () => {
    try {
      // TODO: fetch from ${API_BASE}/api/patients/${userId}
      const response = await fetch(`${API_BASE}/api/users/${userId}`);
      const data = await response.json();
      setPatient(data);
      
      // Fallback to mock data
    //   const mockPatient = mockPatients.find(p => p.id === userId);
    //   setPatient(mockPatient);
    } catch (error) {
      console.error('Error fetching patient:', error);
      const mockPatient = mockPatients.find(p => p.id === userId);
      setPatient(mockPatient);
    }
  };

  const fetchVaccinations = async () => {
    try {
      setLoading(true);
      // TODO: fetch from ${API_BASE}/api/vaccinations/${userId}
      const response = await fetch(`${API_BASE}/api/vaccinations/user/${userId}`);
      const data = await response.json();
      console.log("API vaccinations response:", data);
      if (Array.isArray(data)) {
      setVaccinations(data);
    } else {
      // fallback when API sends { message: "..." }
      setVaccinations([]);
    }
      console.log(vaccinations)
      console.log(vaccinations.length)
      setLoading(false)
      // Fallback to mock data
    //   const userVaccinations = mockVaccinations.filter(v => v.userId === userId);
    //   setVaccinations(userVaccinations);
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
      const userVaccinations = mockVaccinations.filter(v => v.userId === userId);
      setVaccinations(userVaccinations);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVaccination) {
        // console.log(editingVaccination)
        // TODO: connect to backend PUT ${API_BASE}/api/vaccinations/${editingVaccination.id}
        const response = await fetch(`${API_BASE}/api/vaccinations/${editingVaccination._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        // Optimistic update for mock data
        // setVaccinations(prev => prev.map(v => 
        //   v.id === editingVaccination.id ? { ...v, ...formData } : v
        // ));
      } else {
        // TODO: connect to backend POST ${API_BASE}/api/vaccinations/${userId}
        const response = await fetch(`${API_BASE}/api/vaccinations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, userId })
        });
        
        // Optimistic update for mock data
        const newVaccination = {
          id: `vac_${Date.now()}`,
          userId,
          ...formData
        };
        setVaccinations(prev => [...prev, newVaccination]);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving vaccination:', error);
    }
  };

  const handleEdit = (vaccination) => {
    setEditingVaccination(vaccination);
    setFormData({
      vaccine: vaccination.vaccine,
      dueDate: vaccination.dueDate,
      description: vaccination.description,
      status: vaccination.status
    });
    setShowForm(true);
  };

  const handleDelete = async (vaccinationId) => {
    if (!window.confirm('Are you sure you want to delete this vaccination?')) {
      return;
    }
    
    try {
      // TODO: connect to backend DELETE ${API_BASE}/api/vaccinations/${vaccinationId}
      const response = await fetch(`${API_BASE}/api/vaccinations/${vaccinationId}`, {
        method: 'DELETE'
      });
      setShowForm(true);
      // Optimistic update for mock data
      setVaccinations(prev => prev.filter(v => v.id !== vaccinationId));
    } catch (error) {
      console.error('Error deleting vaccination:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      vaccine: '',
      dueDate: '',
      description: '',
      status: 'pending'
    });
    setEditingVaccination(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading vaccinations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Info Header */}
      {patient && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
              <p className="text-sm text-gray-500">Age: {patient.age} | Phone: {patient.phone}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Vaccination Form */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusCircle size={20} />
            <span>Add New Vaccination</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vaccine" className="block text-sm font-medium text-gray-700 mb-2">
                  Vaccine Name
                </label>
                <input
                  type="text"
                  id="vaccine"
                  value={formData.vaccine}
                  onChange={(e) => setFormData(prev => ({ ...prev, vaccine: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any notes or instructions..."
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {editingVaccination ? 'Update Vaccination' : 'Add Vaccination'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Vaccinations List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Vaccination Schedule</h3>
        </div>
        
        <div className="p-6">
          {vaccinations.length == 0 ? (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No vaccinations scheduled</p>
              <p className="text-sm text-gray-400">Click "Add New Vaccination" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vaccinations.map((vaccination) => (
                <VaccinationCard
                  key={vaccination.id}
                  vaccination={vaccination}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaccinationForm;