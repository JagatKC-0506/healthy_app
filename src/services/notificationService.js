// Notification Service for meal and water reminders
// This uses Capacitor Local Notifications for native mobile support

import { LocalNotifications } from '@capacitor/local-notifications';

// Check if running in Capacitor (native) environment
const isNative = () => {
  return window.Capacitor !== undefined;
};

// Request notification permissions
export async function requestNotificationPermission() {
  if (isNative()) {
    try {
      const permission = await LocalNotifications.requestPermissions();
      return permission.display === 'granted';
    } catch (error) {
      console.log('Native notifications not available:', error);
      return false;
    }
  } else {
    // Web notifications fallback
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }
}

// Schedule meal reminders
export async function scheduleMealReminders(settings) {
  if (!settings.notificationsEnabled) return;
  
  const mealNotifications = [
    {
      id: 1,
      title: '🌅 Breakfast Time!',
      body: 'Time for a healthy breakfast. Check your diet plan!',
      time: settings.breakfastTime
    },
    {
      id: 2,
      title: '☀️ Lunch Time!',
      body: 'Fuel your body with a nutritious lunch.',
      time: settings.lunchTime
    },
    {
      id: 3,
      title: '🍎 Snack Time!',
      body: 'Have a healthy snack to keep your energy up!',
      time: settings.snackTime
    },
    {
      id: 4,
      title: '🌙 Dinner Time!',
      body: 'Time for a light, healthy dinner.',
      time: settings.dinnerTime
    }
  ];

  if (isNative()) {
    try {
      // Cancel existing meal notifications
      await LocalNotifications.cancel({ notifications: mealNotifications.map(n => ({ id: n.id })) });
      
      // Schedule new notifications
      const notifications = mealNotifications.map(meal => {
        const [hours, minutes] = meal.time.split(':').map(Number);
        const now = new Date();
        const scheduleDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        // If time has passed today, schedule for tomorrow
        if (scheduleDate <= now) {
          scheduleDate.setDate(scheduleDate.getDate() + 1);
        }
        
        return {
          id: meal.id,
          title: meal.title,
          body: meal.body,
          schedule: {
            at: scheduleDate,
            repeats: true,
            every: 'day'
          },
          sound: 'default',
          smallIcon: 'ic_stat_icon_config_sample',
          iconColor: '#10b981'
        };
      });
      
      await LocalNotifications.schedule({ notifications });
      console.log('Meal reminders scheduled');
    } catch (error) {
      console.log('Error scheduling notifications:', error);
    }
  } else {
    // Web notification reminder (simplified)
    console.log('Web notifications: Meal reminders configured');
  }
}

// Schedule water reminders
export async function scheduleWaterReminders(intervalMinutes, enabled) {
  if (!enabled) return;
  
  if (isNative()) {
    try {
      // Cancel existing water reminder
      await LocalNotifications.cancel({ notifications: [{ id: 100 }] });
      
      // Schedule recurring water reminder
      const now = new Date();
      const scheduleDate = new Date(now.getTime() + intervalMinutes * 60 * 1000);
      
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 100,
            title: '💧 Water Reminder',
            body: 'Stay hydrated! Time to drink a glass of water.',
            schedule: {
              at: scheduleDate,
              repeats: true,
              every: 'minute',
              count: intervalMinutes
            },
            sound: 'default',
            smallIcon: 'ic_stat_icon_config_sample',
            iconColor: '#6366f1'
          }
        ]
      });
      
      console.log(`Water reminder set for every ${intervalMinutes} minutes`);
    } catch (error) {
      console.log('Error scheduling water reminder:', error);
    }
  }
}

// Cancel all notifications
export async function cancelAllNotifications() {
  if (isNative()) {
    try {
      await LocalNotifications.cancel({
        notifications: [
          { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 100 }
        ]
      });
    } catch (error) {
      console.log('Error canceling notifications:', error);
    }
  }
}

// Show instant notification (for testing)
export async function showTestNotification() {
  if (isNative()) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 999,
            title: '✅ Notifications Working!',
            body: 'You will receive meal and water reminders.',
            schedule: { at: new Date(Date.now() + 1000) },
            sound: 'default'
          }
        ]
      });
    } catch (error) {
      console.log('Error showing test notification:', error);
    }
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('✅ Notifications Working!', {
      body: 'You will receive meal and water reminders.',
      icon: '/vite.svg'
    });
  }
}
