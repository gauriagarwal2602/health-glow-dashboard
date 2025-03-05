
import React from "react";
import { Download, Share2, ArrowRight } from "lucide-react";

interface HealthSummaryProps {
  lastUpdated: string;
  className?: string;
}

const HealthSummary: React.FC<HealthSummaryProps> = ({ lastUpdated, className = "" }) => {
  return (
    <div className={`health-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Health Summary</h3>
        <span className="text-xs text-muted-foreground">Last updated: {lastUpdated}</span>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background hover:border-primary/30 hover:bg-primary/5 transition-all">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-md mr-3">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-medium">Download Full Report</h4>
              <p className="text-sm text-muted-foreground">Get your complete health data</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
        </button>

        <button className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background hover:border-primary/30 hover:bg-primary/5 transition-all">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-md mr-3">
              <Share2 className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-medium">Share with Caregiver</h4>
              <p className="text-sm text-muted-foreground">Send report to doctor or family</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default HealthSummary;
