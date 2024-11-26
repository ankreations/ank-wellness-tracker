import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, Circle, TrendingUp, Calendar, Award, 
  Download, Upload, AlertCircle, Clock, Smile, 
  SmilePlus, Meh, Frown, Heart, Sun, Shield,
  Trophy, Target, TrendingDown, BarChart, 
  Calendar as CalendarIcon, Fire, Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Previous constants remain (MOTIVATION_QUOTES, MOOD_OPTIONS)

// Achievement Definitions
const ACHIEVEMENTS = {
  streaks: [
    { id: 'streak-7', name: '7 Day Warrior', description: 'Complete 7 days in a row', days: 7 },
    { id: 'streak-30', name: 'Monthly Master', description: 'Complete 30 days in a row', days: 30 },
    { id: 'streak-90', name: 'Quarterly Champion', description: 'Complete 90 days in a row', days: 90 }
  ],
  completion: [
    { id: 'completion-50', name: 'Halfway Hero', description: 'Achieve 50% completion for 7 days', percentage: 50 },
    { id: 'completion-80', name: 'Excellence Achiever', description: 'Achieve 80% completion for 7 days', percentage: 80 },
    { id: 'completion-100', name: 'Perfection Seeker', description: 'Achieve 100% completion for 3 days', percentage: 100 }
  ]
};

// Level System
const LEVELS = [
  { level: 1, name: "Beginner", pointsNeeded: 0 },
  { level: 2, name: "Dedicated", pointsNeeded: 100 },
  { level: 3, name: "Committed", pointsNeeded: 300 },
  { level: 4, name: "Expert", pointsNeeded: 600 },
  { level: 5, name: "Master", pointsNeeded: 1000 }
];

// Mini Challenges
const MINI_CHALLENGES = [
  {
    id: 'morning-streak',
    name: 'Morning Glory',
    description: 'Complete all morning tasks for 3 days straight',
    duration: 3,
    type: 'morning'
  },
  {
    id: 'full-day',
    name: 'Perfect Day',
    description: 'Complete 100% of tasks in one day',
    duration: 1,
    type: 'all'
  },
  {
    id: 'consistent-entry',
    name: 'Journaling Master',
    description: 'Add detailed journal entries for 5 days straight',
    duration: 5,
    type: 'journal'
  }
];

const WellnessTracker = () => {
  // Previous state variables remain
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('points');
    return saved ? JSON.parse(saved) : 0;
  });

  const [activeChallenges, setActiveChallenges] = useState(() => {
    const saved = localStorage.getItem('activeChallenges');
    return saved ? JSON.parse(saved) : [];
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stats');
    return saved ? JSON.parse(saved) : {
      totalDays: 0,
      averageCompletion: 0,
      bestStreak: 0,
      tasksCompleted: 0
    };
  });

  // Calculate current level
  const getCurrentLevel = () => {
    return LEVELS.reduce((acc, level) => {
      if (points >= level.pointsNeeded) return level;
      return acc;
    }, LEVELS[0]);
  };

  // Update achievements
  useEffect(() => {
    const checkAchievements = () => {
      const newAchievements = [];
      
      // Check streak achievements
      ACHIEVEMENTS.streaks.forEach(achievement => {
        if (streak >= achievement.days && !achievements.includes(achievement.id)) {
          newAchievements.push(achievement.id);
        }
      });

      // Check completion achievements
      const recentCompletions = journal.slice(-7).map(entry => entry.completion);
      ACHIEVEMENTS.completion.forEach(achievement => {
        const qualifyingDays = recentCompletions.filter(
          completion => completion >= achievement.percentage
        ).length;
        
        if (qualifyingDays >= (achievement.percentage === 100 ? 3 : 7) 
            && !achievements.includes(achievement.id)) {
          newAchievements.push(achievement.id);
        }
      });

      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
        // Award points for new achievements
        setPoints(prev => prev + (newAchievements.length * 50));
      }
    };

    checkAchievements();
  }, [journal, streak]);

  // Update statistics
  useEffect(() => {
    const updateStats = () => {
      const completions = journal.map(entry => entry.completion);
      const averageCompletion = completions.length > 0 
        ? completions.reduce((a, b) => a + b, 0) / completions.length 
        : 0;

      setStats({
        totalDays: journal.length,
        averageCompletion: Math.round(averageCompletion),
        bestStreak: streak > stats.bestStreak ? streak : stats.bestStreak,
        tasksCompleted: journal.reduce((acc, entry) => {
          const completed = Object.values(entry.tasks)
            .flat()
            .filter(Boolean)
            .length;
          return acc + completed;
        }, 0)
      });
    };

    updateStats();
  }, [journal, streak]);

  // Generate analytics data
  const getAnalyticsData = () => {
    return journal.slice(-30).map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      completion: entry.completion,
      mood: entry.mood
    }));
  };

  // Add a new section for rendering analytics
  const renderAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Chart */}
          <div className="h-64">
            <LineChart data={getAnalyticsData()} width={600} height={250}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completion" stroke="#8884d8" />
              <Line type="monotone" dataKey="mood" stroke="#82ca9d" />
            </LineChart>
          </div>

          {/* Statistics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-blue-600 text-sm">Total Days</div>
              <div className="text-2xl font-bold">{stats.totalDays}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 text-sm">Average Completion</div>
              <div className="text-2xl font-bold">{stats.averageCompletion}%</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-purple-600 text-sm">Best Streak</div>
              <div className="text-2xl font-bold">{stats.bestStreak} days</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-yellow-600 text-sm">Tasks Completed</div>
              <div className="text-2xl font-bold">{stats.tasksCompleted}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Add a new section for achievements and level
  const renderAchievements = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievements & Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Level {getCurrentLevel().level}</h3>
                <p className="text-sm text-gray-600">{getCurrentLevel().name}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{points} points</div>
                <div className="text-sm text-gray-500">
                  Next level: {LEVELS[getCurrentLevel().level]?.pointsNeeded - points} points needed
                </div>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-purple-500 rounded-full"
                style={{
                  width: `${(points / LEVELS[getCurrentLevel().level]?.pointsNeeded) * 100}%`
                }}
              ></div>
            </div>
          </div>

          {/* Achievements List */}
          <div className="space-y-4">
            <h3 className="font-semibold">Unlocked Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACHIEVEMENTS.streaks.concat(ACHIEVEMENTS.completion).map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievements.includes(achievement.id)
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {achievements.includes(achievement.id) ? (
                      <Star className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-sm text-gray-600">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Add sections to the main return statement
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Previous sections remain */}
      {renderAnalytics()}
      {renderAchievements()}
    </div>
  );
};

export default WellnessTracker;