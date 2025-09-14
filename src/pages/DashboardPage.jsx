import React, { useState, useEffect } from 'react';
import { Users, Calendar, Bell, CheckCircle } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { API_BASE } from '../config';
import { patients as mockPatients, vaccinationSchedule as mockVaccinations, announcements as mockAnnouncements } from '../data/mockData';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    scheduledVaccinations: 0,
    pendingVaccinations: 0,
    completedVaccinations: 0
  });
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);
  const [topPendingVaccinations, setTopPendingVaccinations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: replace with fetch calls to ${API_BASE}/api/dashboard or individual endpoints
      const [patientsRes, vaccinationsRes, announcementsRes] = await Promise.all([
        fetch(`${API_BASE}/api/users`),
        fetch(`${API_BASE}/api/vaccinations`),
        fetch(`${API_BASE}/api/announcements`)
      ]);
      
      // Fallback to mock data
      const patients = await patientsRes.json();
      const vaccinations = await vaccinationsRes.json();
      const announcements = await announcementsRes.json();
      console.log(patients,vaccinations,announcements)
      // Calculate stats
      setStats({
        totalPatients: patients.length,
        scheduledVaccinations: vaccinations.length,
        pendingVaccinations: vaccinations.filter(v => v.status === 'pending').length,
        completedVaccinations: vaccinations.filter(v => v.status === 'done').length
      });

      // Get recent announcements (last 3)
      const sortedAnnouncements = announcements
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
      setRecentAnnouncements(sortedAnnouncements);

      // Get top pending vaccinations with patient names
      const pendingVaccinations = vaccinations
        .filter(v => v.status === 'pending')
        .map(v => ({
          ...v,
          patientName: patients.find(p => p.id === v.userId)?.name || 'Unknown'
        }))
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);
      setTopPendingVaccinations(pendingVaccinations);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Healthcare management system overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="blue"
        />
        <DashboardCard
          title="Scheduled Vaccinations"
          value={stats.scheduledVaccinations}
          icon={Calendar}
          color="green"
        />
        <DashboardCard
          title="Pending Vaccinations"
          value={stats.pendingVaccinations}
          icon={Bell}
          color="yellow"
        />
        <DashboardCard
          title="Completed Vaccinations"
          value={stats.completedVaccinations}
          icon={CheckCircle}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
          </div>
          <div className="p-6">
            {recentAnnouncements.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent announcements</p>
            ) : (
              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{announcement.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(announcement.date)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Pending Vaccinations */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Vaccinations</h3>
          </div>
          <div className="p-6">
            {topPendingVaccinations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending vaccinations</p>
            ) : (
              <div className="space-y-3">
                {topPendingVaccinations.map((vaccination) => (
                  <div key={vaccination._id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">{vaccination.userId.name}</p>
                      <p className="text-sm text-gray-600">{vaccination.vaccine}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${isOverdue(vaccination.dueDate) ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatDate(vaccination.dueDate)}
                      </p>
                      {isOverdue(vaccination.dueDate) && (
                        <p className="text-xs text-red-500">Overdue</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;