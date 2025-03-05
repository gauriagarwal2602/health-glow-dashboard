
import React from "react";

export type StatusType = "stable" | "attention" | "critical";

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  stable: {
    label: "Stable",
    color: "bg-status-stable",
    textColor: "text-status-stable",
    pulseColor: "bg-status-stable/50",
  },
  attention: {
    label: "Needs Attention",
    color: "bg-status-attention",
    textColor: "text-status-attention",
    pulseColor: "bg-status-attention/50",
  },
  critical: {
    label: "Critical",
    color: "bg-status-critical",
    textColor: "text-status-critical",
    pulseColor: "bg-status-critical/50",
  },
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, className = "" }) => {
  const config = statusConfig[status];

  return (
    <div className={`status-indicator ${config.textColor} ${className}`}>
      <div className="relative">
        <div className={`status-dot ${config.color}`}></div>
        <div className={`absolute inset-0 status-dot ${config.pulseColor} animate-pulse-subtle`}></div>
      </div>
      <span>{config.label}</span>
    </div>
  );
};

export default StatusIndicator;
