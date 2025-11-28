# 🏃‍♂️ Healthy Nepal

A comprehensive health and fitness mobile application designed specifically for Nepali users. Track your daily workouts, follow affordable Nepali diet plans, monitor water intake, and achieve your fitness goals with a 90-day progressive workout program.

![Made with Love in Nepal](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20in-Nepal-DC143C)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Capacitor](https://img.shields.io/badge/Capacitor-7.4.4-119EFF?logo=capacitor)
![License](https://img.shields.io/badge/License-MIT-green)

## 📱 Screenshots

| Dashboard | Diet Plan | Workouts | Progress |
|-----------|-----------|----------|----------|
| Daily overview with stats | Nepali meal suggestions | 90-day progressive quests | Track your journey |

## ✨ Features

### 🎯 90-Day Progressive Workout Program
- **Push-ups**: Start at 10 reps, progress to 50
- **Sit-ups**: Start at 10 reps, progress to 50
- **Squats**: Start at 10 reps, progress to 50
- **Running**: Start at 1km, progress to 10km
- **Plank Hold**: Start at 30 seconds, progress to 3 minutes

### 🍽️ Affordable Nepali Diet Plans
- Traditional Nepali meals (Dal Bhat, Dhindo, Momo, etc.)
- Budget-friendly options with prices in NPR
- Daily meal plans for breakfast, lunch, snacks, and dinner
- Calorie and protein tracking
- Both Nepali (नेपाली) and English names

### 💧 Water Intake Tracker
- Track 8 glasses (2000ml) daily
- Visual glass indicators
- Easy tap to add/remove

### 📊 Progress Tracking
- Day streak counter
- Quest completion history
- Visual progress charts

### ⏰ Meal & Water Reminders
- Customizable meal times
- Water reminder intervals (30 min - 2 hours)
- Push notifications on Android

### 🌙 Additional Features
- Personalized greetings
- Motivational quotes
- Local storage for offline use
- Beautiful, responsive UI

## 🛠️ Tech Stack

- **Frontend**: React 19.2 + Vite 7
- **Mobile**: Capacitor 7.4.4 (Android)
- **Routing**: React Router DOM 7
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Notifications**: @capacitor/local-notifications

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Android Studio](https://developer.android.com/studio) (for building APK)
- [Java JDK 17+](https://adoptium.net/) (for Android builds)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JagatKC-0506/healthy_app.git
   cd healthy_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Building APK for Android

### Step 1: Build the Web App
```bash
npm run build
```

### Step 2: Sync with Capacitor
```bash
npx cap sync android
```

### Step 3: Build the APK

**Option A: Using Command Line**
```bash
cd android
./gradlew assembleDebug
```

**Option B: Using Android Studio**
1. Open the `android` folder in Android Studio
2. Wait for Gradle sync to complete
3. Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**

### Step 4: Find Your APK
The APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 📲 Installing on Your Phone

### Method 1: Direct Transfer
1. Connect your phone to computer via USB
2. Copy `app-debug.apk` to your phone
3. On your phone, go to **Settings → Security**
4. Enable **"Install from unknown sources"** or **"Install unknown apps"**
5. Open the APK file and tap **Install**

### Method 2: Using ADB (Android Debug Bridge)
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Method 3: Share via Cloud
1. Upload the APK to Google Drive, Dropbox, or send via email
2. Download on your phone
3. Enable unknown sources and install

## 🔧 Configuration

### Android SDK Setup
If you encounter SDK location errors, create/edit `android/local.properties`:
```properties
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```

### Customizing App Settings
Edit `capacitor.config.json` to change:
```json
{
  "appId": "com.healthynepal.app",
  "appName": "Healthy Nepal",
  "webDir": "dist"
}
```

## 📁 Project Structure

```
healthy-nepal/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── context/         # React Context for state management
│   │   └── AppContext.jsx
│   ├── data/            # Static data (diet plans)
│   │   └── dietData.js
│   ├── pages/           # App screens
│   │   ├── Dashboard.jsx
│   │   ├── Diet.jsx
│   │   ├── Quests.jsx
│   │   ├── Progress.jsx
│   │   └── Settings.jsx
│   ├── services/        # Notification services
│   │   └── notificationService.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── android/             # Capacitor Android project
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── capacitor.config.json # Capacitor configuration
└── package.json         # Dependencies
```

## 🍛 Included Nepali Diet Options

### Breakfast
- चिउरा दही (Chiura with Dahi)
- रोटी तरकारी (Roti with Tarkari)
- ओट्स केरा (Oats with Banana)
- अण्डा सिधाउने (Eggs with Bread)
- सत्तु (Sattu Drink)

### Lunch
- दाल भात तरकारी (Dal Bhat Tarkari)
- खिचडी दही (Khichdi with Dahi)
- थुक्पा (Thukpa)
- चिउरा सेट (Chiura Set)

### Snacks
- मौसमी फलफूल (Seasonal Fruits)
- चना चटपटे (Chana Chatpate)
- मुरी/भुजा (Muri/Bhuja)
- लस्सी/मही (Lassi/Mahi)
- भटमास सदेको (Bhatmas Sadeko)

### Dinner
- हल्का दाल भात (Light Dal Bhat)
- रोटी सब्जी (Roti Sabji)
- मःम (Steamed Momo)
- ढिँडो (Dhindo)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the traditional Nepali lifestyle and diet
- Icons by [Lucide](https://lucide.dev/)
- Built with [Capacitor](https://capacitorjs.com/) for native mobile experience

## 📞 Contact

**Jagat KC** - [@JagatKC-0506](https://github.com/JagatKC-0506)

Project Link: [https://github.com/JagatKC-0506/healthy_app](https://github.com/JagatKC-0506/healthy_app)

---

<p align="center">Made with ❤️ in Nepal 🇳🇵</p>
