
import React from "react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Info, Download } from "lucide-react";

const sleepData = [
  { day: "Mon", hours: 7.2 },
  { day: "Tue", hours: 6.8 },
  { day: "Wed", hours: 7.5 },
  { day: "Thu", hours: 6.9 },
  { day: "Fri", hours: 7.7 },
  { day: "Sat", hours: 8.2 },
  { day: "Sun", hours: 7.9 },
];

const bloodPressureData = [
  { date: "May 10", systolic: 125, diastolic: 82 },
  { date: "May 11", systolic: 128, diastolic: 84 },
  { date: "May 12", systolic: 130, diastolic: 86 },
  { date: "May 13", systolic: 127, diastolic: 83 },
  { date: "May 14", systolic: 122, diastolic: 80 },
  { date: "May 15", systolic: 124, diastolic: 81 },
];

const medicationComplianceData = [
  { name: "Taken", value: 85 },
  { name: "Missed", value: 15 },
];

const COLORS = ["hsl(var(--primary))", "#dddddd"];

const Insights: React.FC = () => {
  return (
    <div className="pt-4 pb-20 md:pt-20 md:pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Health Insights</h1>
          <p className="text-muted-foreground">Visualize your health data and track your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="health-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Sleep Pattern</h2>
              <button className="text-sm text-primary flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} hours`, 'Sleep']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm flex items-start">
              <Info className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              <p>You've averaged 7.5 hours of sleep this week, which is within the recommended range.</p>
            </div>
          </div>

          <div className="health-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Blood Pressure</h2>
              <button className="text-sm text-primary flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bloodPressureData}
                  margin={{ top: 5, right: 5, left: -30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[60, 140]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                    name="Systolic"
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "hsl(var(--secondary))" }}
                    name="Diastolic"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm flex items-start">
              <Info className="w-4 h-4 mr-2 mt-0.5 text-primary" />
              <p>Your blood pressure has been stable. Last reading: 124/81 mmHg</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="health-card md:col-span-1">
            <h2 className="text-lg font-medium mb-4">Medication Compliance</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={medicationComplianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {medicationComplianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <p className="font-medium">85% Adherence Rate</p>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </div>
          </div>

          <div className="health-card md:col-span-2">
            <h2 className="text-lg font-medium mb-4">Health Risk Assessment</h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <h3 className="font-medium">Cardiovascular Health</h3>
                      <p className="text-sm text-muted-foreground">Low Risk</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary">Details</button>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-10 bg-yellow-500 rounded-full mr-3"></div>
                    <div>
                      <h3 className="font-medium">Metabolic Health</h3>
                      <p className="text-sm text-muted-foreground">Moderate Risk</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary">Details</button>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <h3 className="font-medium">Respiratory Health</h3>
                      <p className="text-sm text-muted-foreground">Low Risk</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
