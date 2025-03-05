
import React, { useState } from "react";
import StatusIndicator from "@/components/StatusIndicator";
import SymptomTracker from "@/components/SymptomTracker";
import MoodTracker from "@/components/MoodTracker";
import AppointmentReminder from "@/components/AppointmentReminder";
import HealthSummary from "@/components/HealthSummary";
import { AlertCircle, Bell, Info } from "lucide-react";

const Dashboard: React.FC = () => {
  // Sample data
  const [symptoms] = useState([
    {
      id: "1",
      name: "Headache",
      severity: 3,
      date: "Today, 2:30 PM",
      isRecent: true,
    },
    {
      id: "2",
      name: "Fatigue",
      severity: 2,
      date: "Yesterday, 10:15 AM",
      isRecent: false,
    },
    {
      id: "3",
      name: "Nausea",
      severity: 1,
      date: "May 15, 9:00 AM",
      isRecent: false,
    },
  ]);

  const [moodData] = useState([
    { date: "May 10", mood: 2 },
    { date: "May 11", mood: 3 },
    { date: "May 12", mood: 3 },
    { date: "May 13", mood: 4 },
    { date: "May 14", mood: 2 },
    { date: "May 15", mood: 3 },
  ]);

  const [appointments] = useState([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Primary Care Physician",
      date: "May 20, 2023",
      time: "10:30 AM",
      confirmed: true,
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "May 28, 2023",
      time: "2:15 PM",
      confirmed: false,
    },
  ]);

  return (
    <div className="pt-4 pb-20 md:pt-20 md:pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Health Dashboard</h1>
            <p className="text-muted-foreground">Track your health status and manage your care</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <StatusIndicator status="stable" />
            <div className="ml-4 relative">
              <button className="p-2 rounded-full bg-background hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mb-6 bg-status-attention/10 border border-status-attention/30 rounded-lg p-4 animate-slide-down">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">
              <AlertCircle className="w-5 h-5 text-status-attention" />
            </div>
            <div>
              <h3 className="font-medium text-status-attention">Medication Reminder</h3>
              <p className="text-sm">You have 2 medications scheduled for today at 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SymptomTracker symptoms={symptoms} />

          <div className="bg-white rounded-xl shadow-sm p-6 border border-border/40 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Medication Side Effects</h3>
              <button className="text-sm text-primary">View All</button>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-background border border-border/50">
                <div className="flex items-start">
                  <div className="p-2 bg-orange-100 rounded-md mr-3">
                    <Info className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mild Drowsiness</h4>
                    <p className="text-sm text-muted-foreground">From Lisinopril - Started May 12</p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-background border border-border/50">
                <div className="flex items-start">
                  <div className="p-2 bg-orange-100 rounded-md mr-3">
                    <Info className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dry Mouth</h4>
                    <p className="text-sm text-muted-foreground">From Metformin - Ongoing for 3 weeks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MoodTracker initialData={moodData} />

          <AppointmentReminder appointments={appointments} />

          <HealthSummary lastUpdated="May 15, 2023" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
