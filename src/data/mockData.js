export const patients = [
  {
    id: "user1",
    name: "Asha Rao",
    age: 34,
    phone: "9876543210",
    email: "asha@example.com",
    bloodType: "A+",
    address: "Area X, City Y"
  },
  {
    id: "user2",
    name: "Rajesh Kumar",
    age: 45,
    phone: "9123456789",
    email: "rajesh@example.com",
    bloodType: "B-",
    address: "Sector 5, New Delhi"
  },
  {
    id: "user3",
    name: "Priya Sharma",
    age: 28,
    phone: "9234567890",
    email: "priya@example.com",
    bloodType: "O+",
    address: "MG Road, Bangalore"
  },
  {
    id: "user4",
    name: "Amit Patel",
    age: 52,
    phone: "9345678901",
    email: "amit@example.com",
    bloodType: "AB+",
    address: "Andheri West, Mumbai"
  }
];

export const vaccinationSchedule = [
  {
    id: "vac1",
    userId: "user1",
    vaccine: "COVID-19 Booster",
    dueDate: "2024-10-15",
    status: "pending",
    description: "Annual COVID-19 booster shot recommended."
  },
  {
    id: "vac2",
    userId: "user1",
    vaccine: "Flu Shot",
    dueDate: "2024-11-01",
    status: "pending",
    description: "Seasonal influenza vaccination."
  },
  {
    id: "vac3",
    userId: "user2",
    vaccine: "Hepatitis B",
    dueDate: "2024-09-30",
    status: "done",
    description: "Second dose of Hepatitis B series."
  },
  {
    id: "vac4",
    userId: "user3",
    vaccine: "MMR",
    dueDate: "2024-12-15",
    status: "pending",
    description: "Measles, Mumps, Rubella vaccination."
  }
];

export const announcements = [
  {
    id: "ann1",
    title: "New Vaccination Drive",
    description: "Free flu shots available next Monday. Please bring ID and previous vaccination records.",
    date: "2024-09-20",
    priority: "high",
    location: "All"
  },
  {
    id: "ann2",
    title: "Clinic Hours Extended",
    description: "Our clinic will now be open until 8 PM on weekdays starting next month.",
    date: "2024-09-18",
    priority: "medium",
    location: "All"
  },
  {
    id: "ann3",
    title: "Health Checkup Camp",
    description: "Free health checkup camp for senior citizens this weekend.",
    date: "2024-09-15",
    priority: "low",
    location: "Community Center"
  }
];
