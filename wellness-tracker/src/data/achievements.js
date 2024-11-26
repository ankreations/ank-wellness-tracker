export const ACHIEVEMENTS = {
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

export const LEVELS = [
  { level: 1, name: "Beginner", pointsNeeded: 0 },
  { level: 2, name: "Dedicated", pointsNeeded: 100 },
  { level: 3, name: "Committed", pointsNeeded: 300 },
  { level: 4, name: "Expert", pointsNeeded: 600 },
  { level: 5, name: "Master", pointsNeeded: 1000 }
];

export const MINI_CHALLENGES = [
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
  }
];