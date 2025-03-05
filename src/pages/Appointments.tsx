
import React, { useState } from "react";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Check, X } from "lucide-react";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  confirmed: boolean;
}

const Appointments: React.FC = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Primary Care Physician",
      date: "May 20, 2023",
      time: "10:30 AM",
      location: "Main Street Medical Center",
      notes: "Annual physical checkup. Bring list of current medications.",
      confirmed: true,
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "May 28, 2023",
      time: "2:15 PM",
      location: "Heart Health Clinic",
      notes: "Follow-up appointment. Discuss recent test results.",
      confirmed: false,
    },
    {
      id: "3",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Nutritionist",
      date: "June 5, 2023",
      time: "11:00 AM",
      location: "Wellness Center",
      notes: "Dietary consultation. Bring food journal.",
      confirmed: true,
    },
    {
      id: "4",
      doctorName: "Dr. James Wilson",
      specialty: "Dermatologist",
      date: "June 12, 2023",
      time: "3:45 PM",
      location: "Dermatology Associates",
      confirmed: false,
    },
  ]);

  // Month navigation
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const confirmAppointment = (id: string) => {
    // Would normally update the state with confirmation
    console.log("Confirming appointment:", id);
  };

  const cancelAppointment = (id: string) => {
    // Would normally update the state with cancellation
    console.log("Cancelling appointment:", id);
  };

  return (
    <div className="pt-4 pb-20 md:pt-20 md:pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Appointments</h1>
          <p className="text-muted-foreground">Manage your upcoming healthcare appointments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-border/40 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Calendar</h2>
                <div className="flex items-center">
                  <button 
                    onClick={prevMonth}
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="mx-2 font-medium">{formatMonth(currentMonth)}</span>
                  <button 
                    onClick={nextMonth}
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar would go here - simplified for this example */}
              <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-muted-foreground text-sm py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 35 }).map((_, i) => {
                  const isToday = i === 14;
                  const hasAppointment = i === 19 || i === 27;
                  return (
                    <div 
                      key={i} 
                      className={`
                        aspect-square flex items-center justify-center rounded-md text-sm 
                        ${isToday ? 'bg-primary text-white' : ''}
                        ${hasAppointment && !isToday ? 'bg-primary/10 text-primary' : ''}
                        ${i < 3 || i > 31 ? 'text-muted-foreground/50' : ''}
                        hover:bg-muted transition-colors cursor-pointer
                      `}
                    >
                      {i < 3 ? 28 + i : i > 31 ? i - 31 : i}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Today</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-primary/20"></div>
                  <span>Appointment Scheduled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-border/40">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Upcoming Appointments</h2>
                <button className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                  Schedule New
                </button>
              </div>

              {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mb-3 text-muted-foreground" />
                  <p className="mb-1">No upcoming appointments</p>
                  <p className="text-sm">Schedule a visit with your healthcare provider</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-border/50 rounded-lg overflow-hidden animate-fade-in">
                      <div className={`px-4 py-3 flex justify-between items-center border-l-4 ${
                        appointment.confirmed ? "border-l-status-stable" : "border-l-status-attention"
                      }`}>
                        <div>
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                        <div className="flex items-center">
                          {appointment.confirmed ? (
                            <span className="text-sm text-status-stable flex items-center">
                              <Check className="w-4 h-4 mr-1" />
                              Confirmed
                            </span>
                          ) : (
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => confirmAppointment(appointment.id)} 
                                className="px-3 py-1 bg-status-stable/10 text-status-stable text-sm rounded-md hover:bg-status-stable/20 transition-colors"
                              >
                                Confirm
                              </button>
                              <button 
                                onClick={() => cancelAppointment(appointment.id)} 
                                className="px-3 py-1 bg-status-critical/10 text-status-critical text-sm rounded-md hover:bg-status-critical/20 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-4 bg-background/50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-sm">{appointment.notes}</p>
                          </div>
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
    </div>
  );
};

export default Appointments;
