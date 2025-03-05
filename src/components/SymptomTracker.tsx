
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  severity: number;
  date: string;
  isRecent: boolean;
}

interface SymptomTrackerProps {
  symptoms: Symptom[];
  className?: string;
}

const SymptomTracker: React.FC<SymptomTrackerProps> = ({ symptoms, className = "" }) => {
  return (
    <div className={`health-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Recent Symptoms</h3>
        <button className="text-sm text-primary">View All</button>
      </div>

      {symptoms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
          <CheckCircle className="w-10 h-10 mb-2 text-status-stable" />
          <p>No recent symptoms recorded</p>
          <button className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
            Add Symptom
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {symptoms.map((symptom) => (
            <li key={symptom.id} className="flex items-center p-3 rounded-lg bg-background border border-border/50">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium">{symptom.name}</h4>
                  {symptom.isRecent && (
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">New</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{symptom.date}</div>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-1 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-4 rounded-sm ${
                        i < symptom.severity ? "bg-primary" : "bg-muted"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SymptomTracker;
