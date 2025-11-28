import { Link } from 'react-router-dom';
import { useApp, getDailyQuests } from '../context/AppContext';
import { getTodaysMealPlan, calculateDailyNutrition } from '../data/dietData';
import { Droplets, Flame, Target, Trophy, Utensils, Dumbbell, TrendingUp, Bell } from 'lucide-react';
import './Dashboard.css';

function Dashboard() {
  const { userData, addWater, removeWater } = useApp();
  const dailyQuests = getDailyQuests(userData.currentDay);
  const todaysMeals = getTodaysMealPlan();
  const dailyNutrition = calculateDailyNutrition(todaysMeals);
  
  const completedQuestsCount = userData.completedQuests.length;
  const totalQuests = dailyQuests.length;
  const questProgress = (completedQuestsCount / totalQuests) * 100;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Every step counts! Keep going 💪",
      "Your body will thank you later!",
      "Consistency is the key to success!",
      "Small progress is still progress!",
      "You're stronger than you think!"
    ];
    return quotes[userData.currentDay % quotes.length];
  };

  return (
    <div className="dashboard animate-fade-in">
      {/* Greeting Section */}
      <div className="greeting-section">
        <h2>{getGreeting()}, {userData.name}!</h2>
        <p>{getMotivationalQuote()}</p>
        <span className="greeting-emoji">🏃‍♂️</span>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">
            <Trophy size={24} />
          </div>
          <div className="stat-value">{userData.currentDay}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <Target size={24} />
          </div>
          <div className="stat-value">{completedQuestsCount}/{totalQuests}</div>
          <div className="stat-label">Quests Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <Flame size={24} />
          </div>
          <div className="stat-value">{dailyNutrition.calories}</div>
          <div className="stat-label">Calories Plan</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <Droplets size={24} />
          </div>
          <div className="stat-value">{userData.waterGlasses}/8</div>
          <div className="stat-label">Water Glasses</div>
        </div>
      </div>

      {/* Water Tracker */}
      <div className="water-tracker">
        <div className="water-header">
          <h3>💧 Water Intake</h3>
          <span className="water-amount">{userData.waterGlasses * 250}ml / 2000ml</span>
        </div>
        <div className="water-glasses">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`water-glass ${i < userData.waterGlasses ? 'filled' : ''}`}
              onClick={() => i < userData.waterGlasses ? removeWater() : addWater()}
            >
              {i < userData.waterGlasses ? '💧' : '○'}
            </div>
          ))}
        </div>
      </div>

      {/* Quest Progress */}
      <div className="section-title">
        <h3>Today's Quests</h3>
        <Link to="/quests">View All →</Link>
      </div>
      <div className="quest-progress-card">
        <div className="quest-progress-header">
          <span className="quest-day">Day {userData.currentDay}</span>
          <span className="quest-status">{completedQuestsCount} of {totalQuests} completed</span>
        </div>
        <div className="progress-bar large">
          <div className="progress-fill" style={{ width: `${questProgress}%` }}></div>
        </div>
        <div className="quest-preview-list">
          {dailyQuests.slice(0, 3).map((quest) => (
            <div key={quest.id} className={`quest-mini ${userData.completedQuests.includes(quest.id) ? 'done' : ''}`}>
              <span className="quest-mini-icon">{quest.icon}</span>
              <span className="quest-mini-name">{quest.name}</span>
              <span className="quest-mini-target">{quest.target} {quest.unit}</span>
              {userData.completedQuests.includes(quest.id) && <span className="check">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-title">
        <h3>Quick Actions</h3>
      </div>
      <div className="quick-actions">
        <Link to="/diet" className="action-btn">
          <div className="icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
            <Utensils size={20} />
          </div>
          <span>View Diet Plan</span>
        </Link>
        <Link to="/quests" className="action-btn">
          <div className="icon" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#6366f1' }}>
            <Dumbbell size={20} />
          </div>
          <span>Start Workout</span>
        </Link>
        <Link to="/progress" className="action-btn">
          <div className="icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
            <TrendingUp size={20} />
          </div>
          <span>View Progress</span>
        </Link>
        <Link to="/settings" className="action-btn">
          <div className="icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
            <Bell size={20} />
          </div>
          <span>Reminders</span>
        </Link>
      </div>

      {/* Today's Meals Preview */}
      <div className="section-title">
        <h3>Today's Diet</h3>
        <Link to="/diet">See All →</Link>
      </div>
      <div className="meal-preview">
        <div className="meal-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>🌅</div>
        <div className="meal-info">
          <h4>{todaysMeals.breakfast.name}</h4>
          <p>{todaysMeals.breakfast.calories} cal • {todaysMeals.breakfast.protein}g protein</p>
        </div>
        <span className="meal-time">{userData.settings.breakfastTime}</span>
      </div>
      <div className="meal-preview">
        <div className="meal-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>☀️</div>
        <div className="meal-info">
          <h4>{todaysMeals.lunch.name}</h4>
          <p>{todaysMeals.lunch.calories} cal • {todaysMeals.lunch.protein}g protein</p>
        </div>
        <span className="meal-time">{userData.settings.lunchTime}</span>
      </div>
    </div>
  );
}

export default Dashboard;
