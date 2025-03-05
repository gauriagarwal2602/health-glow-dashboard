
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Heart, Calendar, MessageSquare, Download } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: <Heart className="w-5 h-5" /> },
    { name: "Dashboard", path: "/dashboard", icon: <Activity className="w-5 h-5" /> },
    { name: "Insights", path: "/insights", icon: <Download className="w-5 h-5" /> },
    { name: "Communication", path: "/communication", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Appointments", path: "/appointments", icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto bg-white border-t md:border-b border-border/50 shadow-sm backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-start md:space-x-10 h-16">
          <Link to="/" className="hidden md:flex items-center space-x-2">
            <Heart className="w-7 h-7 text-primary" />
            <span className="text-xl font-medium text-primary">HealthGlow</span>
          </Link>
          
          <div className="flex items-center justify-around w-full md:justify-end md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-1 px-2 py-1 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="text-xs md:text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
