
import React, { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

interface MoodData {
  date: string;
  mood: number;
  note?: string;
}

interface MoodTrackerProps {
  initialData: MoodData[];
  className?: string;
}

const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Excellent"];

const MoodTracker: React.FC<MoodTrackerProps> = ({ initialData, className = "" }) => {
  const [moodData, setMoodData] = useState<MoodData[]>(initialData);
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [isAddingMood, setIsAddingMood] = useState(false);

  const handleAddMood = () => {
    if (currentMood === null) return;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const newMood: MoodData = {
      date: today,
      mood: currentMood,
      note: note || undefined
    };

    setMoodData([...moodData, newMood]);
    setCurrentMood(null);
    setNote("");
    setIsAddingMood(false);
  };

  return (
    <div className={`health-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Mood Tracker</h3>
        {!isAddingMood && (
          <button 
            onClick={() => setIsAddingMood(true)}
            className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            Record Mood
          </button>
        )}
      </div>

      {isAddingMood ? (
        <div className="animate-fade-in bg-background/50 p-4 rounded-lg border border-border/50 mb-4">
          <h4 className="text-sm font-medium mb-3">How are you feeling today?</h4>
          <div className="flex justify-between mb-6">
            {moodLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => setCurrentMood(index)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  currentMood === index
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                <div className="text-xl">
                  {index === 0 ? "😞" : index === 1 ? "😔" : index === 2 ? "😐" : index === 3 ? "🙂" : "😊"}
                </div>
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="moodNote" className="text-sm font-medium mb-1 block">Add a note (optional)</label>
            <input
              id="moodNote"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full p-2 rounded-md border border-border bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => setIsAddingMood(false)}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMood}
              disabled={currentMood === null}
              className="px-3 py-1.5 bg-primary text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="h-64">
          {moodData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodData}
                margin={{ top: 5, right: 5, left: -30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis
                  domain={[0, 4]}
                  ticks={[0, 1, 2, 3, 4]}
                  tickFormatter={(value) => moodLabels[value]?.charAt(0) || ""}
                  stroke="#888"
                  fontSize={12}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border border-border rounded-md shadow-sm">
                          <p className="font-medium">{data.date}</p>
                          <p className="text-primary">{moodLabels[data.mood]}</p>
                          {data.note && <p className="text-sm text-muted-foreground mt-1">{data.note}</p>}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>No mood data available</p>
              <p className="text-sm mt-1">Start tracking to see your patterns</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
