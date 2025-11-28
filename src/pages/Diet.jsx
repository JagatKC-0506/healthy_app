import { useState } from 'react';
import { getTodaysMealPlan, nepaliDietData, calculateDailyNutrition } from '../data/dietData';
import { Clock, Flame, Dumbbell, IndianRupee, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import './Diet.css';

function Diet() {
  const [todaysMeals, setTodaysMeals] = useState(getTodaysMealPlan());
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  
  const dailyNutrition = calculateDailyNutrition(todaysMeals);

  const mealTimes = {
    breakfast: { label: 'Breakfast', time: '7:00 AM', icon: '🌅', color: '#f59e0b' },
    lunch: { label: 'Lunch', time: '12:00 PM', icon: '☀️', color: '#10b981' },
    snack: { label: 'Snack', time: '4:00 PM', icon: '🍎', color: '#6366f1' },
    dinner: { label: 'Dinner', time: '7:00 PM', icon: '🌙', color: '#8b5cf6' }
  };

  const shuffleMeal = (mealType) => {
    const meals = nepaliDietData[mealType === 'snack' ? 'snacks' : mealType];
    const currentMealId = todaysMeals[mealType].id;
    let newMeal;
    do {
      newMeal = meals[Math.floor(Math.random() * meals.length)];
    } while (newMeal.id === currentMealId && meals.length > 1);
    
    setTodaysMeals(prev => ({
      ...prev,
      [mealType]: newMeal
    }));
  };

  const toggleExpand = (mealType) => {
    setExpandedMeal(expandedMeal === mealType ? null : mealType);
  };

  return (
    <div className="diet-page animate-fade-in">
      <div className="page-header">
        <h1>🍽️ Diet Plan</h1>
        <p>Affordable & healthy Nepali meals</p>
      </div>

      {/* Daily Summary */}
      <div className="nutrition-summary">
        <div className="nutrition-card">
          <Flame size={20} className="icon orange" />
          <div>
            <span className="value">{dailyNutrition.calories}</span>
            <span className="label">Calories</span>
          </div>
        </div>
        <div className="nutrition-card">
          <Dumbbell size={20} className="icon blue" />
          <div>
            <span className="value">{dailyNutrition.protein}g</span>
            <span className="label">Protein</span>
          </div>
        </div>
        <div className="nutrition-card">
          <IndianRupee size={20} className="icon green" />
          <div>
            <span className="value">~Rs.250</span>
            <span className="label">Est. Cost</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="diet-tabs">
        <button 
          className={`tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today's Plan
        </button>
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Meals
        </button>
      </div>

      {activeTab === 'today' ? (
        <div className="meals-list">
          {Object.entries(mealTimes).map(([key, info]) => {
            const meal = todaysMeals[key];
            const isExpanded = expandedMeal === key;
            
            return (
              <div key={key} className="meal-card">
                <div className="meal-header" onClick={() => toggleExpand(key)}>
                  <div className="meal-icon" style={{ background: `${info.color}20` }}>
                    {info.icon}
                  </div>
                  <div className="meal-main-info">
                    <span className="meal-type">{info.label}</span>
                    <h3 className="meal-name">{meal.name}</h3>
                    <span className="meal-name-np">{meal.nameNp}</span>
                  </div>
                  <div className="meal-quick-info">
                    <span className="meal-time-badge">
                      <Clock size={12} /> {info.time}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="meal-details">
                    <p className="meal-description">{meal.description}</p>
                    
                    <div className="meal-stats">
                      <div className="stat">
                        <Flame size={16} />
                        <span>{meal.calories} cal</span>
                      </div>
                      <div className="stat">
                        <Dumbbell size={16} />
                        <span>{meal.protein}g protein</span>
                      </div>
                      <div className="stat">
                        <IndianRupee size={16} />
                        <span>{meal.price}</span>
                      </div>
                    </div>

                    <div className="meal-items">
                      <h4>Ingredients:</h4>
                      <ul>
                        {meal.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="meal-benefits">
                      <h4>Benefits:</h4>
                      <div className="benefit-tags">
                        {meal.benefits.map((benefit, i) => (
                          <span key={i} className="benefit-tag">{benefit}</span>
                        ))}
                      </div>
                    </div>

                    <button className="shuffle-btn" onClick={(e) => { e.stopPropagation(); shuffleMeal(key); }}>
                      <RefreshCw size={16} />
                      Try Different Meal
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="all-meals">
          {Object.entries(nepaliDietData).map(([category, meals]) => (
            <div key={category} className="meal-category">
              <h3 className="category-title">
                {mealTimes[category === 'snacks' ? 'snack' : category]?.icon} {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="category-meals">
                {meals.map((meal) => (
                  <div key={meal.id} className="mini-meal-card">
                    <div className="mini-meal-header">
                      <h4>{meal.name}</h4>
                      <span className="meal-price">{meal.price}</span>
                    </div>
                    <p className="mini-meal-desc">{meal.description}</p>
                    <div className="mini-meal-stats">
                      <span>{meal.calories} cal</span>
                      <span>{meal.protein}g protein</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <div className="tips-section">
        <h3>💡 Healthy Tips</h3>
        <div className="tip-card">
          <p>🥗 Eat more <strong>seasonal vegetables</strong> - they're cheaper and fresher!</p>
        </div>
        <div className="tip-card">
          <p>💧 Drink water <strong>30 minutes before meals</strong> for better digestion.</p>
        </div>
        <div className="tip-card">
          <p>🌙 Try to finish dinner <strong>2-3 hours before sleep</strong>.</p>
        </div>
      </div>
    </div>
  );
}

export default Diet;
