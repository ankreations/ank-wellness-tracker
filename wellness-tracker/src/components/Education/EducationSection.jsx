import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, Circle, TrendingUp, Calendar, Award, 
  Download, Upload, AlertCircle, Clock, Smile, 
  SmilePlus, Meh, Frown, Heart, Sun, Shield,
  Trophy, Target, TrendingDown, BarChart, 
  Calendar as CalendarIcon, Fire, Star,
  BookOpen, Info, LifeBuoy, Zap, Video,
  ArrowRight, Lightbulb, MessageCircle
} from 'lucide-react';

// Previous imports and constants remain...

// Educational Content Database
const EDUCATIONAL_CONTENT = {
  ingredients: [
    {
      name: "Honey",
      benefits: [
        "Natural energy booster",
        "Antibacterial properties",
        "Supports immune system",
        "Enhances nutrient absorption"
      ],
      usage: "Take 1-2 tablespoons with warm water or milk",
      science: "Honey contains natural enzymes and antioxidants that support overall health."
    },
    {
      name: "Chyawanprash",
      benefits: [
        "Immune system enhancement",
        "Vitality boost",
        "Digestive health",
        "Cellular rejuvenation"
      ],
      usage: "1-2 tablespoons daily, preferably with milk",
      science: "Contains over 40 herbs and minerals that support holistic health."
    },
    // Add more ingredients...
  ],
  exercises: [
    {
      name: "Morning Walk",
      duration: "20-30 minutes",
      benefits: [
        "Improves circulation",
        "Boosts metabolism",
        "Enhances mental clarity",
        "Supports weight management"
      ],
      technique: "Maintain steady pace, practice deep breathing",
      tips: "Best done early morning on empty stomach"
    },
    // Add more exercises...
  ],
  healthTips: [
    {
      category: "General Health",
      tips: [
        "Stay hydrated throughout the day",
        "Practice deep breathing exercises",
        "Maintain consistent sleep schedule",
        "Listen to your body's signals"
      ]
    },
    {
      category: "Sexual Health",
      tips: [
        "Regular exercise improves stamina",
        "Proper nutrition supports hormonal balance",
        "Adequate sleep enhances vitality",
        "Stress management is crucial"
      ]
    },
    {
      category: "Skin Health",
      tips: [
        "Stay hydrated for skin health",
        "Protect from sun exposure",
        "Maintain healthy diet rich in antioxidants",
        "Get adequate sleep for cell renewal"
      ]
    }
  ]
};

// Emergency Motivation Content
const EMERGENCY_MOTIVATION = {
  quickBoosts: [
    {
      title: "Remember Your Why",
      message: "You started this journey for a reason. That reason is still valid and waiting for you.",
      action: "Take a deep breath and visualize your goal."
    },
    {
      title: "Look How Far You've Come",
      message: "Every step counts. You've already made progress - don't let it slip away.",
      action: "Review your journey in the progress tracker."
    },
    {
      title: "Small Steps Matter",
      message: "You don't have to be perfect. Just do one small thing right now.",
      action: "Pick the easiest task and complete it."
    },
    {
      title: "Future Self Thanks You",
      message: "Your future self will be grateful for the effort you put in today.",
      action: "Write a quick note to your future self."
    },
    {
      title: "Break The Pattern",
      message: "Feeling stuck? Change your environment or routine for a fresh start.",
      action: "Take a 5-minute walk or change your location."
    }
  ],
  successStories: [
    {
      title: "90 Day Transformation",
      story: "Started just like you, stayed consistent, saw amazing results in energy and vitality.",
      keyLearning: "Consistency over perfection."
    },
    {
      title: "From Skeptic to Believer",
      story: "Doubted the process initially, stuck with it, experienced remarkable improvements.",
      keyLearning: "Trust the process, results will follow."
    },
    // Add more success stories...
  ]
};

// Add to the main component
const WellnessTracker = () => {
  // Previous state variables remain...
  const [showingEducational, setShowingEducational] = useState(false);
  const [selectedEducationalContent, setSelectedEducationalContent] = useState(null);
  const [showingEmergencyMotivation, setShowingEmergencyMotivation] = useState(false);
  const [dailyTip, setDailyTip] = useState(() => {
    const allTips = EDUCATIONAL_CONTENT.healthTips.flatMap(category => category.tips);
    return allTips[Math.floor(Math.random() * allTips.length)];
  });

  // Update daily tip
  useEffect(() => {
    const updateDailyTip = () => {
      const allTips = EDUCATIONAL_CONTENT.healthTips.flatMap(category => category.tips);
      setDailyTip(allTips[Math.floor(Math.random() * allTips.length)]);
    };
    
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilTomorrow = tomorrow - now;

    const timer = setTimeout(updateDailyTip, timeUntilTomorrow);
    return () => clearTimeout(timer);
  }, []);

  // Render educational content section
  const renderEducationalContent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Health Education Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Daily Tip */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="text-blue-500" />
              <h3 className="font-semibold">Tip of the Day</h3>
            </div>
            <p className="text-gray-700">{dailyTip}</p>
          </div>

          {/* Content Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ingredients Knowledge */}
            <button
              onClick={() => {
                setShowingEducational(true);
                setSelectedEducationalContent('ingredients');
              }}
              className="p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              <h3 className="font-semibold flex items-center gap-2">
                <Info className="w-4 h-4" />
                Ingredients Guide
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Learn about the benefits and proper usage of each ingredient
              </p>
            </button>

            {/* Exercise Knowledge */}
            <button
              onClick={() => {
                setShowingEducational(true);
                setSelectedEducationalContent('exercises');
              }}
              className="p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              <h3 className="font-semibold flex items-center gap-2">
                <Video className="w-4 h-4" />
                Exercise Guide
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Detailed exercise instructions and benefits
              </p>
            </button>

            {/* Health Tips */}
            <button
              onClick={() => {
                setShowingEducational(true);
                setSelectedEducationalContent('tips');
              }}
              className="p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              <h3 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Health Tips Library
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Comprehensive collection of health and wellness tips
              </p>
            </button>
          </div>

          {/* Educational Content Modal */}
          {showingEducational && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {selectedEducationalContent === 'ingredients' && 'Ingredients Guide'}
                    {selectedEducationalContent === 'exercises' && 'Exercise Guide'}
                    {selectedEducationalContent === 'tips' && 'Health Tips Library'}
                  </h2>
                  <button
                    onClick={() => setShowingEducational(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  {selectedEducationalContent === 'ingredients' && (
                    EDUCATIONAL_CONTENT.ingredients.map((ingredient, index) => (
                      <div key={index} className="border-t pt-4">
                        <h3 className="font-semibold mb-2">{ingredient.name}</h3>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <strong>Benefits:</strong>
                            <ul className="list-disc pl-5">
                              {ingredient.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="text-sm">
                            <strong>Usage:</strong> {ingredient.usage}
                          </div>
                          <div className="text-sm">
                            <strong>Science:</strong> {ingredient.science}
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {selectedEducationalContent === 'exercises' && (
                    EDUCATIONAL_CONTENT.exercises.map((exercise, index) => (
                      <div key={index} className="border-t pt-4">
                        <h3 className="font-semibold mb-2">{exercise.name}</h3>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <strong>Duration:</strong> {exercise.duration}
                          </div>
                          <div className="text-sm">
                            <strong>Benefits:</strong>
                            <ul className="list-disc pl-5">
                              {exercise.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="text-sm">
                            <strong>Technique:</strong> {exercise.technique}
                          </div>
                          <div className="text-sm">
                            <strong>Tips:</strong> {exercise.tips}
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {selectedEducationalContent === 'tips' && (
                    EDUCATIONAL_CONTENT.healthTips.map((category, index) => (
                      <div key={index} className="border-t pt-4">
                        <h3 className="font-semibold mb-2">{category.category}</h3>
                        <ul className="list-disc pl-5">
                          {category.tips.map((tip, i) => (
                            <li key={i} className="text-sm">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Render emergency motivation section
  const renderEmergencyMotivation = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LifeBuoy className="w-5 h-5" />
          Emergency Motivation Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Boost Button */}
          <button
            onClick={() => setShowingEmergencyMotivation(true)}
            className="w-full p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Need Motivation Now!
          </button>

          {/* Emergency Motivation Modal */}
          {showingEmergencyMotivation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Emergency Motivation</h2>
                  <button
                    onClick={() => setShowingEmergencyMotivation(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Quick Boosts */}
                  <div>
                    <h3 className="font-semibold mb-4">Quick Motivation Boosts</h3>
                    <div className="space-y-4">
                      {EMERGENCY_MOTIVATION.quickBoosts.map((boost, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-700">{boost.title}</h4>
                          <p className="text-gray-700 mt-2">{boost.message}</p>
                          <div className="mt-2 text-sm text-blue-600 flex items-center gap-1">
                            <ArrowRight className="w-4 h-4" />
                            {boost.action}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Stories */}
                  <div>
                    <h3 className="font-semibold mb-4">Success Stories</h3>
                    <div className="space-y-4">
                      {EMERGENCY_MOTIVATION.successStories.map((story, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-700">{story.title}</h4>
                          {/* Continuing from success stories section */}
                          <p className="text-gray-700 mt-2">{story.story}</p>
                          <div className="mt-2 bg-green-100 p-2 rounded">
                            <strong className="text-green-700">Key Learning:</strong>
                            <span className="text-green-600 ml-2">{story.keyLearning}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Reminder */}
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700">Your Journey</h3>
                    <div className="mt-2">
                      <p className="text-gray-700">
                        You've completed {stats.totalDays} days with an average completion rate of {stats.averageCompletion}%
                      </p>
                      <p className="text-purple-600 mt-2">
                        Your dedication has brought you this far. Keep going!
                      </p>
                    </div>
                  </div>

                  {/* Action Steps */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Take Action Now</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setShowingEmergencyMotivation(false);
                          setShowingEducational(true);
                          setSelectedEducationalContent('ingredients');
                        }}
                        className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                      >
                        <h4 className="font-medium">Review Health Benefits</h4>
                        <p className="text-sm text-gray-600">
                          Remind yourself why each ingredient matters
                        </p>
                      </button>

                      <button
                        onClick={() => {
                          setShowingEmergencyMotivation(false);
                          // Scroll to journal section
                        }}
                        className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                      >
                        <h4 className="font-medium">Write Your Feelings</h4>
                        <p className="text-sm text-gray-600">
                          Express your thoughts in your journal
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Update main return statement to include new sections
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Previous sections remain (Header, Daily Progress, etc.) */}
      
      {/* Add Emergency Motivation Button for Quick Access */}
      <button
        onClick={() => setShowingEmergencyMotivation(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 flex items-center justify-center gap-2"
      >
        <Zap className="w-5 h-5" />
        <span className="hidden md:inline">Need Motivation</span>
      </button>

      {/* Educational Content Section */}
      {renderEducationalContent()}

      {/* Emergency Motivation Section */}
      {renderEmergencyMotivation()}

      {/* Previous sections continue (Analytics, Achievements, etc.) */}
    </div>
  );
};

export default WellnessTracker;