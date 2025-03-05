
import React, { useState } from "react";
import { MessageSquare, Send, Calendar, Clock, Paperclip, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "doctor";
  content: string;
  timestamp: string;
  read: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Communication: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"messages" | "notes">("messages");
  const [newMessage, setNewMessage] = useState("");
  
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      content: "Hello! How have you been feeling since our last appointment? Any new symptoms to report?",
      timestamp: "Today, 10:30 AM",
      read: true,
    },
    {
      id: "2",
      sender: "user",
      content: "Hi Dr. Johnson, I've been doing better! The new medication seems to be helping with my headaches.",
      timestamp: "Today, 10:45 AM",
      read: true,
    },
    {
      id: "3",
      sender: "doctor",
      content: "That's great to hear! Any side effects from the medication that you've noticed?",
      timestamp: "Today, 11:00 AM",
      read: true,
    },
  ]);

  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Follow-up Appointment",
      content: "Discussed headache frequency, prescribed new medication. Follow up in 2 weeks to assess effectiveness.",
      date: "May 10, 2023",
    },
    {
      id: "2",
      title: "Blood Test Results",
      content: "All values within normal range. Vitamin D slightly low, recommend supplementation.",
      date: "April 28, 2023",
    },
    {
      id: "3",
      title: "Treatment Plan",
      content: "1. Continue current medication\n2. Increase water intake\n3. Practice relaxation techniques daily\n4. Track headache frequency",
      date: "April 15, 2023",
    },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // Here you would normally send the message to the backend
    // For now, we'll just clear the input
    setNewMessage("");
  };

  return (
    <div className="pt-4 pb-20 md:pt-20 md:pb-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Doctor Communication</h1>
          <p className="text-muted-foreground">Stay connected with your healthcare providers</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border/40 overflow-hidden">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === "messages"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </div>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === "notes"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                Appointment Notes
              </div>
            </button>
          </div>

          {activeTab === "messages" ? (
            <div className="flex flex-col h-[calc(100vh-300px)] md:h-[600px]">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">DJ</span>
                  </div>
                  <div>
                    <h2 className="font-medium">Dr. Sarah Johnson</h2>
                    <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center">
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 py-2 px-3 bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary mx-2"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ""}
                    className="p-2 bg-primary text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Typical response time: Within 24 hours</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[calc(100vh-300px)] md:h-[600px] overflow-y-auto p-6">
              <div className="mb-6 bg-muted/30 border border-border/50 rounded-lg p-3 flex items-start">
                <AlertCircle className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  These notes are written by your healthcare providers during appointments. 
                  They help track your treatment progress and plan next steps.
                </p>
              </div>

              <div className="space-y-6">
                {notes.map((note) => (
                  <div key={note.id} className="bg-white border border-border/50 rounded-lg overflow-hidden">
                    <div className="bg-muted/30 px-4 py-3 border-b border-border/50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{note.title}</h3>
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="whitespace-pre-line">{note.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communication;
