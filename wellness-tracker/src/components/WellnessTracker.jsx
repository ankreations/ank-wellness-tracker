import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, Circle, TrendingUp, Calendar, Award, 
  Download, Upload, AlertCircle, Clock, Smile, 
  SmilePlus, Meh, Frown, Heart, Sun, Shield
} from 'lucide-react';

// Motivation quotes for each day
const MOTIVATION_QUOTES = [
  {
    quote: "Every positive choice today builds the foundation of your stronger tomorrow.",
    category: "general"
  },
  {
    quote: "Your body is a temple of vitality. Nourish it with care and watch it flourish.",
    category: "general"
  },
  {
    quote: "Natural vigor comes from consistent, mindful habits. Keep going!",
    category: "sexual"
  },
  {
    quote: "Your skin reflects your dedication. Each healthy choice radiates through.",
    category: "skin"
  },
  {
    quote: "Energy flows where attention goes. Stay focused on your wellness journey.",
    category: "general"
  },
  {
    quote: "Peak performance requires patience and persistence. You're building both.",
    category: "sexual"
  },
  {
    quote: "Inner health creates outer glow. Your commitment shows through your skin.",
    category: "skin"
  }
];

const MOOD_OPTIONS = [
  { icon: SmilePlus, label: 'Excellent', value: 5 },
  { icon: Smile, label: 'Good', value: 4 },
  { icon: Meh, label: 'Neutral', value: 3 },
  { icon: Frown, label: 'Poor', value: 2 }
];

const WellnessTracker = () => {
  // Core state management
  const [routineChecks, setRoutineChecks] = useState(() => {
    const saved = localStorage.getItem('routineChecks');
    return saved ? JSON.parse(saved) : {
      morning: Array(3).fill(false),
      afternoon: Array(2).fill(false),
      evening: Array(3).fill(false),
      night: Array(2).fill(false)
    };
  });

  const [lastEntryDate, setLastEntryDate] = useState(() => {
    const saved = localStorage.getItem('lastEntryDate');
    return saved ? JSON.parse(saved) : null;
  });

  const [journal, setJournal] = useState(() => {
    const saved = localStorage.getItem('journal');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentMood, setCurrentMood] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(() => {
    const today = new Date();
    const dayIndex = today.getDay();
    return MOTIVATION_QUOTES[dayIndex];
  });

  const [lastExport, setLastExport] = useState(() => {
    const saved = localStorage.getItem('lastExport');
    return saved ? JSON.parse(saved) : new Date().toISOString();
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? JSON.parse(saved) : 0;
  });

  const [canAddEntry, setCanAddEntry] = useState(true);

  // Check if 24 hours have passed since last entry
  useEffect(() => {
    if (lastEntryDate) {
      const lastEntry = new Date(lastEntryDate);
      const now = new Date();
      const hoursSinceLastEntry = (now - lastEntry) / (1000 * 60 * 60);
      setCanAddEntry(hoursSinceLastEntry >= 24);
    }
  }, [lastEntryDate]);

  // Update motivation quote daily
  useEffect(() => {
    const now = new Date();
    const dayIndex = now.getDay();
    setCurrentQuote(MOTIVATION_QUOTES[dayIndex]);
  }, []);

  // Calculate completion percentage
  const calculateCompletion = () => {
    let total = 0;
    let completed = 0;
    Object.values(routineChecks).forEach(timeSlot => {
      total += timeSlot.length;
      completed += timeSlot.filter(Boolean).length;
    });
    return Math.round((completed / total) * 100);
  };

  // Add journal entry with mood and completion status
  const addJournalEntry = (event) => {
    event.preventDefault();
    
    if (!canAddEntry) {
      alert('Please wait 24 hours between entries');
      return;
    }

    if (!currentMood) {
      alert('Please select your mood for the day');
      return;
    }

    const entry = event.target.entry.value;
    if (entry.trim()) {
      const completionPercentage = calculateCompletion();
      const newEntry = {
        date: new Date().toISOString(),
        text: entry,
        mood: currentMood,
        completion: completionPercentage,
        tasks: { ...routineChecks }
      };

      setJournal(prev => [...prev, newEntry]);
      setLastEntryDate(new Date().toISOString());
      setCurrentMood(null);
      event.target.entry.value = '';

      // Reset routine checks for next day
      setRoutineChecks({
        morning: Array(3).fill(false),
        afternoon: Array(2).fill(false),
        evening: Array(3).fill(false),
        night: Array(2).fill(false)
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with Motivation Quote */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            {currentQuote.category === 'general' && <Heart className="text-red-500" />}
            {currentQuote.category === 'sexual' && <Shield className="text-blue-500" />}
            {currentQuote.category === 'skin' && <Sun className="text-yellow-500" />}
            <h2 className="text-xl font-semibold">Daily Motivation</h2>
          </div>
          <p className="text-gray-700 italic">"{currentQuote.quote}"</p>
        </CardContent>
      </Card>

      {/* Time Lock Indicator */}
      {!canAddEntry && (
        <Card>
          <CardContent className="p-4 flex items-center gap-4 bg-yellow-50">
            <Clock className="text-yellow-500" />
            <div>
              <p className="font-medium">Next Entry Available In:</p>
              <p className="text-sm text-gray-600">
                {lastEntryDate && new Date(lastEntryDate).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Entry Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Daily Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mood Selection */}
            <div>
              <h3 className="font-medium mb-2">How are you feeling today?</h3>
              <div className="flex gap-4">
                {MOOD_OPTIONS.map(({ icon: Icon, label, value }) => (
                  <button
                    key={value}
                    onClick={() => setCurrentMood(value)}
                    className={`p-2 rounded-lg flex flex-col items-center ${
                      currentMood === value ? 'bg-blue-100 text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Journal Entry */}
            <form onSubmit={addJournalEntry}>
              <textarea
                name="entry"
                className="w-full p-3 border rounded-lg"
                placeholder="How was your day? Any observations or feelings to note?"
                rows="4"
                disabled={!canAddEntry}
              ></textarea>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Completion: {calculateCompletion()}%
                </div>
                <button
                  type="submit"
                  disabled={!canAddEntry}
                  className={`px-4 py-2 rounded-lg ${
                    canAddEntry
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Journal History */}
      <Card>
        <CardHeader>
          <CardTitle>Journal History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journal.slice().reverse().map((entry, index) => (
              <div key={index} className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  {MOOD_OPTIONS.find(m => m.value === entry.mood)?.icon && (
                    <MOOD_OPTIONS.find(m => m.value === entry.mood).icon 
                      className="w-4 h-4 text-blue-500"
                    />
                  )}
                  <div className="text-sm text-gray-500">
                    Completion: {entry.completion}%
                  </div>
                </div>
                <p className="text-gray-700">{entry.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessTracker;