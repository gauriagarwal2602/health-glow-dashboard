
import React from "react";
import { Calendar, Clock, Check } from "lucide-react";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  confirmed: boolean;
}

interface AppointmentReminderProps {
  appointments: Appointment[];
  className?: string;
}

const AppointmentReminder: React.FC<AppointmentReminderProps> = ({ appointments, className = "" }) => {
  return (
    <div className={`health-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Upcoming Appointments</h3>
        <button className="text-sm text-primary">View Calendar</button>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
          <Calendar className="w-10 h-10 mb-2 text-muted-foreground" />
          <p>No upcoming appointments</p>
          <button className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
            Schedule One
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="card-hover p-4 rounded-lg bg-background border border-border/50">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-md mr-3">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{appointment.doctorName}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="mr-3">{appointment.date}</span>
                    <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                {appointment.confirmed ? (
                  <div className="flex items-center text-status-stable text-sm">
                    <Check className="w-4 h-4 mr-1" />
                    <span>Confirmed</span>
                  </div>
                ) : (
                  <button className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors">
                    Confirm
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentReminder;
