import { useState } from 'react';
import { useApp, getDailyQuests } from '../context/AppContext';
import { Check, Trophy, Flame, Clock, ChevronRight } from 'lucide-react';
import './Quests.css';

function Quests() {
  const { userData, completeQuest, advanceDay } = useApp();
  const dailyQuests = getDailyQuests(userData.currentDay);
  const [activeQuest, setActiveQuest] = useState(null);
  
  const completedCount = userData.completedQuests.length;
  const totalQuests = dailyQuests.length;
  const allCompleted = completedCount >= totalQuests;
  const progress = (completedCount / totalQuests) * 100;

  const handleCompleteQuest = (questId) => {
    completeQuest(questId);
    setActiveQuest(null);
  };

  const getMotivation = () => {
    if (completedCount === 0) return "Let's crush it today! 💪";
    if (completedCount < totalQuests / 2) return "Great start! Keep going! 🔥";
    if (completedCount < totalQuests) return "Almost there! You got this! 🚀";
    return "Amazing! You completed all quests! 🏆";
  };

  return (
    <div className="quests-page animate-fade-in">
      <div className="page-header">
        <h1>🎯 Daily Quests</h1>
        <p>Day {userData.currentDay} - Progressive Training</p>
      </div>

      {/* Progress Overview */}
      <div className="quest-overview">
        <div className="overview-header">
          <div className="day-badge">
            <Trophy size={20} />
            <span>Day {userData.currentDay}</span>
          </div>
          <div className="completion-badge">
            {completedCount}/{totalQuests} Done
          </div>
        </div>
        
        <div className="progress-ring-container">
          <div className="progress-ring">
            <svg viewBox="0 0 100 100">
              <circle
                className="progress-ring-bg"
                cx="50"
                cy="50"
                r="45"
              />
              <circle
                className="progress-ring-fill"
                cx="50"
                cy="50"
                r="45"
                strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
              />
            </svg>
            <div className="progress-ring-text">
              <span className="progress-percent">{Math.round(progress)}%</span>
              <span className="progress-label">Complete</span>
            </div>
          </div>
        </div>
        
        <p className="motivation-text">{getMotivation()}</p>
      </div>

      {/* Quest List */}
      <div className="quest-list">
        {dailyQuests.map((quest, index) => {
          const isCompleted = userData.completedQuests.includes(quest.id);
          const isActive = activeQuest === quest.id;
          
          return (
            <div 
              key={quest.id} 
              className={`quest-card ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              onClick={() => !isCompleted && setActiveQuest(isActive ? null : quest.id)}
            >
              <div className="quest-number">{index + 1}</div>
              
              <div className="quest-content">
                <div className="quest-header">
                  <span className="quest-icon">{quest.icon}</span>
                  <div className="quest-info">
                    <h3>{quest.name}</h3>
                    <span className="quest-target" style={{ color: quest.color }}>
                      {quest.target} {quest.unit}
                    </span>
                  </div>
                  
                  {isCompleted ? (
                    <div className="quest-complete-badge">
                      <Check size={20} />
                    </div>
                  ) : (
                    <ChevronRight size={20} className="quest-arrow" />
                  )}
                </div>
                
                {isActive && !isCompleted && (
                  <div className="quest-action">
                    <div className="quest-tips">
                      <p>💡 {getQuestTip(quest.id)}</p>
                    </div>
                    <button 
                      className="complete-btn"
                      onClick={(e) => { e.stopPropagation(); handleCompleteQuest(quest.id); }}
                    >
                      <Check size={18} />
                      Mark as Complete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day Completion */}
      {allCompleted && (
        <div className="day-complete-section">
          <div className="celebration">🎉</div>
          <h3>Congratulations!</h3>
          <p>You've completed all quests for Day {userData.currentDay}!</p>
          <button className="advance-btn" onClick={advanceDay}>
            <Trophy size={20} />
            Advance to Day {userData.currentDay + 1}
          </button>
        </div>
      )}

      {/* Today's Summary */}
      <div className="quest-summary">
        <h3>📊 Today's Workout Summary</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <Flame size={20} className="orange" />
            <div>
              <span className="value">~{calculateCaloriesBurned(dailyQuests, userData.completedQuests)}</span>
              <span className="label">Calories Burned</span>
            </div>
          </div>
          <div className="summary-stat">
            <Clock size={20} className="blue" />
            <div>
              <span className="value">~{calculateWorkoutTime(dailyQuests)} min</span>
              <span className="label">Est. Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Info */}
      <div className="progress-info">
        <h3>📈 Your Progress</h3>
        <p className="info-text">
          You started on <strong>Day 1</strong> with basic exercises. 
          Now on <strong>Day {userData.currentDay}</strong>, your targets have increased:
        </p>
        <div className="progress-comparison">
          {dailyQuests.slice(0, 3).map(quest => {
            const day1Quest = getDailyQuests(1).find(q => q.id === quest.id);
            return (
              <div key={quest.id} className="comparison-item">
                <span className="comp-icon">{quest.icon}</span>
                <span className="comp-name">{quest.name}</span>
                <div className="comp-values">
                  <span className="old-value">{day1Quest.target}</span>
                  <span className="arrow">→</span>
                  <span className="new-value">{quest.target} {quest.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getQuestTip(questId) {
  const tips = {
    pushups: "Keep your body straight. Go slow for better results!",
    situps: "Don't pull your neck. Engage your core throughout.",
    squats: "Keep knees behind toes. Go parallel for best results.",
    running: "Start slow, maintain steady pace. Breathe rhythmically.",
    plank: "Keep your body in a straight line. Don't hold your breath!"
  };
  return tips[questId] || "Focus on proper form over speed!";
}

function calculateCaloriesBurned(quests, completed) {
  const caloriesPerQuest = {
    pushups: 0.5, // per rep
    situps: 0.3,
    squats: 0.4,
    running: 60, // per km
    plank: 0.1 // per second
  };
  
  return quests.reduce((total, quest) => {
    if (completed.includes(quest.id)) {
      return total + Math.round(quest.target * (caloriesPerQuest[quest.id] || 1));
    }
    return total;
  }, 0);
}

function calculateWorkoutTime(quests) {
  const timePerQuest = {
    pushups: 2, // minutes for target
    situps: 2,
    squats: 3,
    running: 8, // per km
    plank: 1
  };
  
  return quests.reduce((total, quest) => {
    if (quest.id === 'running') {
      return total + quest.target * timePerQuest[quest.id];
    }
    return total + (timePerQuest[quest.id] || 2);
  }, 0);
}

export default Quests;
