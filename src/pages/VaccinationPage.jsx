import React from 'react';
import VaccinationForm from '../components/VaccinationForm';

const VaccinationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Vaccinations</h1>
        <p className="text-gray-600">Schedule and manage patient vaccinations</p>
      </div>
      
      <VaccinationForm />
    </div>
  );
};

export default VaccinationPage;