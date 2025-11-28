import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Clock, User, Moon, Sun, Volume2, Smartphone, ChevronRight, Save, Check } from 'lucide-react';
import './Settings.css';

function Settings() {
  const { userData, updateSettings, updateName } = useApp();
  const [name, setName] = useState(userData.name);
  const [settings, setSettings] = useState(userData.settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateName(name);
    updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    
    // Request notification permission if enabled
    if (settings.notificationsEnabled && 'Notification' in window) {
      Notification.requestPermission();
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="settings-page animate-fade-in">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Customize your app experience</p>
      </div>

      {/* Profile Section */}
      <div className="settings-section">
        <h3 className="section-title-small">
          <User size={18} />
          Profile
        </h3>
        <div className="setting-item">
          <div className="setting-label">
            <span>Your Name</span>
            <span className="setting-desc">How we address you</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="setting-input"
          />
        </div>
      </div>

      {/* Meal Reminders */}
      <div className="settings-section">
        <h3 className="section-title-small">
          <Clock size={18} />
          Meal Reminder Times
        </h3>
        
        <div className="setting-item">
          <div className="setting-label">
            <span>🌅 Breakfast</span>
          </div>
          <input
            type="time"
            value={settings.breakfastTime}
            onChange={(e) => handleSettingChange('breakfastTime', e.target.value)}
            className="setting-input time-input"
          />
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <span>☀️ Lunch</span>
          </div>
          <input
            type="time"
            value={settings.lunchTime}
            onChange={(e) => handleSettingChange('lunchTime', e.target.value)}
            className="setting-input time-input"
          />
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <span>🍎 Snack</span>
          </div>
          <input
            type="time"
            value={settings.snackTime}
            onChange={(e) => handleSettingChange('snackTime', e.target.value)}
            className="setting-input time-input"
          />
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <span>🌙 Dinner</span>
          </div>
          <input
            type="time"
            value={settings.dinnerTime}
            onChange={(e) => handleSettingChange('dinnerTime', e.target.value)}
            className="setting-input time-input"
          />
        </div>
      </div>

      {/* Water Reminder */}
      <div className="settings-section">
        <h3 className="section-title-small">
          <Bell size={18} />
          Water Reminder
        </h3>
        
        <div className="setting-item">
          <div className="setting-label">
            <span>💧 Remind every</span>
            <span className="setting-desc">Minutes between reminders</span>
          </div>
          <select
            value={settings.waterReminder}
            onChange={(e) => handleSettingChange('waterReminder', Number(e.target.value))}
            className="setting-input select-input"
          >
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-section">
        <h3 className="section-title-small">
          <Smartphone size={18} />
          Notifications
        </h3>
        
        <div className="setting-item toggle-item">
          <div className="setting-label">
            <span>Enable Notifications</span>
            <span className="setting-desc">Meal & water reminders</span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* Current Progress */}
      <div className="settings-section info-section">
        <h3 className="section-title-small">
          <Volume2 size={18} />
          Your Progress Info
        </h3>
        
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Current Day</span>
            <span className="info-value">{userData.currentDay}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Water Today</span>
            <span className="info-value">{userData.waterGlasses}/8</span>
          </div>
          <div className="info-item">
            <span className="info-label">Quests Done</span>
            <span className="info-value">{userData.completedQuests.length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Sessions</span>
            <span className="info-value">{userData.questHistory.length}</span>
          </div>
        </div>
      </div>

      {/* Notification Setup Guide */}
      <div className="settings-section guide-section">
        <h3 className="section-title-small">
          📱 How Notifications Work
        </h3>
        <div className="guide-content">
          <p>To receive push notifications on your phone:</p>
          <ol>
            <li>Build the app for Android using Capacitor</li>
            <li>Install the APK on your phone</li>
            <li>Allow notification permissions when prompted</li>
            <li>Notifications will remind you about meals and water!</li>
          </ol>
          <div className="guide-note">
            <strong>Note:</strong> Web notifications work in browser but may be limited. For best experience, install the app on your Android device.
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
        {saved ? (
          <>
            <Check size={20} />
            Saved!
          </>
        ) : (
          <>
            <Save size={20} />
            Save Settings
          </>
        )}
      </button>

      {/* App Info */}
      <div className="app-info">
        <p>Healthy Nepal v1.0.0</p>
        <p className="made-in">Made with ❤️ in Nepal</p>
      </div>
    </div>
  );
}

export default Settings;
