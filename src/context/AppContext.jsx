import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('healthyNepalData');
    return saved ? JSON.parse(saved) : {
      name: 'Friend',
      currentDay: 1,
      waterGlasses: 0,
      completedQuests: [],
      questHistory: [],
      mealHistory: [],
      settings: {
        breakfastTime: '07:00',
        lunchTime: '12:00',
        snackTime: '16:00',
        dinnerTime: '19:00',
        waterReminder: 60,
        notificationsEnabled: true
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('healthyNepalData', JSON.stringify(userData));
  }, [userData]);

  // Reset daily progress at midnight
  useEffect(() => {
    const checkNewDay = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('lastVisitDate');
      
      if (lastVisit !== today) {
        localStorage.setItem('lastVisitDate', today);
        setUserData(prev => ({
          ...prev,
          waterGlasses: 0,
          completedQuests: []
        }));
      }
    };
    
    checkNewDay();
    const interval = setInterval(checkNewDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const addWater = () => {
    if (userData.waterGlasses < 8) {
      setUserData(prev => ({
        ...prev,
        waterGlasses: prev.waterGlasses + 1
      }));
    }
  };

  const removeWater = () => {
    if (userData.waterGlasses > 0) {
      setUserData(prev => ({
        ...prev,
        waterGlasses: prev.waterGlasses - 1
      }));
    }
  };

  const completeQuest = (questId) => {
    if (!userData.completedQuests.includes(questId)) {
      setUserData(prev => ({
        ...prev,
        completedQuests: [...prev.completedQuests, questId]
      }));
    }
  };

  const advanceDay = () => {
    const totalQuestsToday = getDailyQuests(userData.currentDay).length;
    const completedToday = userData.completedQuests.length;
    
    if (completedToday >= totalQuestsToday) {
      setUserData(prev => ({
        ...prev,
        currentDay: Math.min(prev.currentDay + 1, 90),
        questHistory: [...prev.questHistory, {
          day: prev.currentDay,
          completed: completedToday,
          total: totalQuestsToday,
          date: new Date().toISOString()
        }],
        completedQuests: []
      }));
    }
  };

  const updateSettings = (newSettings) => {
    setUserData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const updateName = (name) => {
    setUserData(prev => ({ ...prev, name }));
  };

  return (
    <AppContext.Provider value={{
      userData,
      addWater,
      removeWater,
      completeQuest,
      advanceDay,
      updateSettings,
      updateName
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

// Helper function to get daily quests based on day number
export function getDailyQuests(day) {
  const progressionRate = Math.min(day, 90);
  
  // Push-ups: Start at 10, max 50
  const pushups = Math.min(10 + Math.floor((progressionRate - 1) * 0.5), 50);
  
  // Sit-ups: Start at 10, max 50
  const situps = Math.min(10 + Math.floor((progressionRate - 1) * 0.5), 50);
  
  // Squats: Start at 10, max 50
  const squats = Math.min(10 + Math.floor((progressionRate - 1) * 0.5), 50);
  
  // Running: Start at 1km, max 10km
  const running = Math.min(1 + Math.floor((progressionRate - 1) * 0.1), 10);
  
  // Planks: Start at 30 sec, max 180 sec (3 min)
  const plankSeconds = Math.min(30 + Math.floor((progressionRate - 1) * 2), 180);

  return [
    {
      id: 'pushups',
      name: 'Push-ups',
      target: pushups,
      unit: 'reps',
      icon: '💪',
      color: '#10b981'
    },
    {
      id: 'situps',
      name: 'Sit-ups',
      target: situps,
      unit: 'reps',
      icon: '🏋️',
      color: '#6366f1'
    },
    {
      id: 'squats',
      name: 'Squats',
      target: squats,
      unit: 'reps',
      icon: '🦵',
      color: '#f59e0b'
    },
    {
      id: 'running',
      name: 'Running',
      target: running,
      unit: 'km',
      icon: '🏃',
      color: '#ef4444'
    },
    {
      id: 'plank',
      name: 'Plank Hold',
      target: plankSeconds,
      unit: 'sec',
      icon: '⏱️',
      color: '#8b5cf6'
    }
  ];
}
