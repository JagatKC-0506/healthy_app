import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useApp, getDailyQuests } from '../context/AppContext';
import { Trophy, TrendingUp, Flame, Target, Calendar, Award } from 'lucide-react';
import './Progress.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Progress() {
  const { userData } = useApp();
  
  // Generate mock historical data based on current day
  const generateHistoricalData = () => {
    const days = Math.min(userData.currentDay, 14);
    const labels = [];
    const questCompletions = [];
    const waterIntake = [];
    
    for (let i = Math.max(1, userData.currentDay - 13); i <= userData.currentDay; i++) {
      labels.push(`Day ${i}`);
      // Simulate completion rates (higher as days progress)
      const baseCompletion = 60 + (i * 2);
      questCompletions.push(Math.min(baseCompletion + Math.random() * 20, 100));
      waterIntake.push(Math.floor(4 + Math.random() * 4));
    }
    
    return { labels, questCompletions, waterIntake };
  };

  const historicalData = generateHistoricalData();

  // Line chart for quest completion
  const lineChartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Quest Completion %',
        data: historicalData.questCompletions,
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10b981',
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#94a3b8',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      }
    }
  };

  // Doughnut chart for today's progress
  const todayQuests = getDailyQuests(userData.currentDay);
  const completedToday = userData.completedQuests.length;
  
  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completedToday, todayQuests.length - completedToday],
        backgroundColor: ['#10b981', '#334155'],
        borderWidth: 0,
        cutout: '75%',
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  // Bar chart for water intake
  const barChartData = {
    labels: historicalData.labels.slice(-7),
    datasets: [
      {
        label: 'Glasses',
        data: historicalData.waterIntake.slice(-7),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 8,
        barThickness: 20,
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      y: {
        min: 0,
        max: 8,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      }
    }
  };

  // Calculate stats
  const avgCompletion = Math.round(
    historicalData.questCompletions.reduce((a, b) => a + b, 0) / historicalData.questCompletions.length
  );

  const currentStreak = userData.currentDay;
  const totalWorkouts = userData.questHistory.length;

  // Get exercise progression data
  const day1Quests = getDailyQuests(1);
  const currentQuests = getDailyQuests(userData.currentDay);

  return (
    <div className="progress-page animate-fade-in">
      <div className="page-header">
        <h1>📊 Progress</h1>
        <p>Track your fitness journey</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-item">
          <div className="stat-icon-wrap green">
            <Trophy size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">{currentStreak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon-wrap blue">
            <Target size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">{avgCompletion}%</span>
            <span className="stat-label">Avg Completion</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon-wrap orange">
            <Flame size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">{totalWorkouts}</span>
            <span className="stat-label">Workouts Done</span>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Today's Progress</h3>
          <span className="chart-badge">Day {userData.currentDay}</span>
        </div>
        <div className="today-progress-container">
          <div className="doughnut-container">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="doughnut-center">
              <span className="doughnut-value">{completedToday}/{todayQuests.length}</span>
              <span className="doughnut-label">Quests</span>
            </div>
          </div>
          <div className="today-quests-list">
            {todayQuests.map((quest) => (
              <div 
                key={quest.id} 
                className={`today-quest-item ${userData.completedQuests.includes(quest.id) ? 'done' : ''}`}
              >
                <span className="quest-emoji">{quest.icon}</span>
                <span className="quest-name">{quest.name}</span>
                {userData.completedQuests.includes(quest.id) && <span className="check">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quest Completion Trend */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Completion Trend</h3>
          <TrendingUp size={18} className="text-primary" />
        </div>
        <div className="line-chart-container">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Water Intake Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>💧 Water Intake</h3>
          <span className="chart-subtitle">Last 7 days</span>
        </div>
        <div className="bar-chart-container">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Exercise Progression */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>💪 Exercise Progression</h3>
          <span className="chart-subtitle">Day 1 vs Now</span>
        </div>
        <div className="progression-list">
          {currentQuests.map((quest) => {
            const day1Quest = day1Quests.find(q => q.id === quest.id);
            const increase = quest.target - day1Quest.target;
            const percentIncrease = Math.round((increase / day1Quest.target) * 100);
            
            return (
              <div key={quest.id} className="progression-item">
                <div className="prog-icon">{quest.icon}</div>
                <div className="prog-info">
                  <span className="prog-name">{quest.name}</span>
                  <div className="prog-bar">
                    <div 
                      className="prog-fill" 
                      style={{ 
                        width: `${Math.min((quest.target / (quest.id === 'running' ? 10 : 50)) * 100, 100)}%`,
                        background: quest.color
                      }}
                    ></div>
                  </div>
                </div>
                <div className="prog-values">
                  <span className="prog-current">{quest.target} {quest.unit}</span>
                  {increase > 0 && (
                    <span className="prog-increase">+{percentIncrease}%</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="chart-card achievements-card">
        <div className="chart-header">
          <h3>🏆 Achievements</h3>
        </div>
        <div className="achievements-grid">
          <div className={`achievement ${userData.currentDay >= 1 ? 'unlocked' : ''}`}>
            <Award size={24} />
            <span>First Step</span>
          </div>
          <div className={`achievement ${userData.currentDay >= 7 ? 'unlocked' : ''}`}>
            <Award size={24} />
            <span>Week Warrior</span>
          </div>
          <div className={`achievement ${userData.currentDay >= 30 ? 'unlocked' : ''}`}>
            <Award size={24} />
            <span>Month Master</span>
          </div>
          <div className={`achievement ${userData.currentDay >= 90 ? 'unlocked' : ''}`}>
            <Award size={24} />
            <span>Legend</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
