// File: src/pages/PatientsPage.jsx
import React from 'react';
import PatientList from '../components/PatientList';

const PatientsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-600">Manage all registered patients</p>
      </div>
      
      <PatientList />
    </div>
  );
};

export default PatientsPage;