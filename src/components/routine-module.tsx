import { useState } from 'react';
import { Check, Clock, Sun, Moon, Utensils, Brush, BookOpen, Play, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';

export function RoutineModule() {
  const [selectedDay, setSelectedDay] = useState('today');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const routines = {
    today: [
      { id: '1', time: '7:00 AM', activity: 'Wake Up', icon: Sun, color: 'text-yellow-500', completed: false },
      { id: '2', time: '7:30 AM', activity: 'Brush Teeth', icon: Brush, color: 'text-blue-500', completed: false },
      { id: '3', time: '8:00 AM', activity: 'Breakfast', icon: Utensils, color: 'text-green-500', completed: false },
      { id: '4', time: '9:00 AM', activity: 'Learning Time', icon: BookOpen, color: 'text-purple-500', completed: false },
      { id: '5', time: '10:30 AM', activity: 'Play Time', icon: Play, color: 'text-pink-500', completed: false },
      { id: '6', time: '12:00 PM', activity: 'Lunch', icon: Utensils, color: 'text-orange-500', completed: false },
      { id: '7', time: '2:00 PM', activity: 'Quiet Time', icon: BookOpen, color: 'text-indigo-500', completed: false },
      { id: '8', time: '6:00 PM', activity: 'Dinner', icon: Utensils, color: 'text-red-500', completed: false },
      { id: '9', time: '8:00 PM', activity: 'Bedtime', icon: Moon, color: 'text-purple-600', completed: false }
    ],
    tomorrow: [
      { id: '10', time: '7:00 AM', activity: 'Wake Up', icon: Sun, color: 'text-yellow-500', completed: false },
      { id: '11', time: '7:30 AM', activity: 'Brush Teeth', icon: Brush, color: 'text-blue-500', completed: false },
      { id: '12', time: '8:00 AM', activity: 'Breakfast', icon: Utensils, color: 'text-green-500', completed: false },
      { id: '13', time: '10:00 AM', activity: 'Doctor Visit', icon: Plus, color: 'text-red-500', completed: false },
      { id: '14', time: '12:00 PM', activity: 'Lunch', icon: Utensils, color: 'text-orange-500', completed: false },
      { id: '15', time: '2:00 PM', activity: 'Park Time', icon: Play, color: 'text-green-600', completed: false },
      { id: '16', time: '6:00 PM', activity: 'Dinner', icon: Utensils, color: 'text-red-500', completed: false },
      { id: '17', time: '8:00 PM', activity: 'Bedtime', icon: Moon, color: 'text-purple-600', completed: false }
    ]
  };

  const currentRoutine = routines[selectedDay as keyof typeof routines];
  const completedCount = currentRoutine.filter(task => completedTasks.has(task.id)).length;
  const progressPercentage = (completedCount / currentRoutine.length) * 100;

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const getCurrentTimeSlot = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Find the next upcoming task based on current time
    for (let i = 0; i < currentRoutine.length; i++) {
      const taskTime = currentRoutine[i].time;
      const taskHour = parseInt(taskTime.split(':')[0]);
      const isPM = taskTime.includes('PM');
      const hour24 = isPM && taskHour !== 12 ? taskHour + 12 : taskHour;
      
      if (hour24 >= currentHour) {
        return i;
      }
    }
    return currentRoutine.length - 1;
  };

  const currentTaskIndex = getCurrentTimeSlot();

  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-purple-600 mb-2">My Schedule</h1>
        <p className="text-gray-600">Keep track of daily activities</p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-3 mb-6">
        {[
          { key: 'today', label: 'Today' },
          { key: 'tomorrow', label: 'Tomorrow' }
        ].map((day) => (
          <button
            key={day.key}
            onClick={() => setSelectedDay(day.key)}
            className={`
              flex-1 py-3 px-4 rounded-2xl border-2 transition-all duration-200
              ${selectedDay === day.key 
                ? 'bg-purple-100 border-purple-300 text-purple-700' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
            `}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Progress Card */}
      <Card className="p-6 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-200 mb-6">
        <div className="text-center">
          <div className="text-2xl mb-2">
            {progressPercentage === 100 ? '🎉' : '⭐'}
          </div>
          <h3 className="text-lg text-gray-800 mb-2">Today's Progress</h3>
          <div className="text-3xl text-green-600 mb-2">
            {completedCount}/{currentRoutine.length}
          </div>
          <div className="w-full bg-white rounded-full h-3 mb-2">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {progressPercentage === 100 
              ? 'Amazing! All tasks completed!' 
              : `${currentRoutine.length - completedCount} tasks remaining`}
          </p>
        </div>
      </Card>

      {/* Schedule List */}
      <div className="space-y-3">
        {currentRoutine.map((task, index) => {
          const Icon = task.icon;
          const isCompleted = completedTasks.has(task.id);
          const isCurrent = index === currentTaskIndex && selectedDay === 'today';
          
          return (
            <Card 
              key={task.id}
              className={`
                p-4 transition-all duration-200 border-2
                ${isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : isCurrent 
                    ? 'bg-yellow-50 border-yellow-300 shadow-lg' 
                    : 'bg-white border-gray-200'}
                ${isCurrent ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
              `}
            >
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <div className="flex-shrink-0">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="h-6 w-6"
                  />
                </div>
                
                {/* Icon */}
                <div className={`flex-shrink-0 p-2 rounded-full bg-gray-100`}>
                  <Icon size={20} className={task.color} />
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className={`
                      ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}
                    `}>
                      {task.activity}
                    </h4>
                    {isCurrent && (
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                        Now
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {task.time}
                  </p>
                </div>
                
                {/* Completion indicator */}
                {isCompleted && (
                  <div className="flex-shrink-0">
                    <div className="bg-green-500 rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Motivational Message */}
      <div className="mt-8 p-6 bg-purple-100 rounded-3xl border-2 border-purple-200 text-center">
        <h3 className="text-lg text-purple-700 mb-2">
          {progressPercentage === 100 
            ? 'Fantastic Work!' 
            : progressPercentage >= 50 
              ? 'You\'re Doing Great!' 
              : 'Keep Going!'}
        </h3>
        <p className="text-purple-600 text-sm">
          {progressPercentage === 100 
            ? 'You completed all your tasks today! 🌟' 
            : 'Every task completed is a step forward! 💪'}
        </p>
      </div>
    </div>
  );
}