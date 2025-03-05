
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StatusIndicator from "@/components/StatusIndicator";

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">HealthGlow</h1>
          <p className="text-lg text-muted-foreground">Your personal health companion</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-border/40 mb-6">
          <h2 className="text-xl font-medium mb-6">Current Health Status</h2>
          
          <div className="flex justify-center mb-6">
            <StatusIndicator status="stable" className="text-lg" />
          </div>
          
          <p className="text-muted-foreground mb-8">
            Your health metrics are within normal ranges. Keep up the good work!
          </p>
          
          <button 
            onClick={() => navigate("/dashboard")} 
            className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
          <button 
            onClick={() => navigate("/insights")}
            className="py-2 px-4 rounded-lg hover:bg-background hover:text-foreground transition-colors"
          >
            Health Insights
          </button>
          <button 
            onClick={() => navigate("/communication")}
            className="py-2 px-4 rounded-lg hover:bg-background hover:text-foreground transition-colors"
          >
            Doctor Communication
          </button>
          <button className="py-2 px-4 rounded-lg hover:bg-background hover:text-foreground transition-colors">
            Emergency Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
