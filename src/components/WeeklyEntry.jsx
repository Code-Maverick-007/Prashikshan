import React, { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle, Target } from 'lucide-react';

const WeeklyEntry = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskInput, setTaskInput] = useState('');
  const [hoursInput, setHoursInput] = useState('');

  const weeklyTasks = [
    {
      id: 1,
      task: 'Complete React project',
      hours: 8,
      status: 'completed',
      date: '2025-09-22'
    },
    {
      id: 2,
      task: 'Study Data Structures',
      hours: 5,
      status: 'completed',
      date: '2025-09-23'
    },
    {
      id: 3,
      task: 'Work on portfolio website',
      hours: 6,
      status: 'in-progress',
      date: '2025-09-24'
    }
  ];

  const learningOutcomes = [
    "Learned advanced React hooks and state management",
    "Improved understanding of algorithm complexity",
    "Gained experience with responsive design principles"
  ];

  const addTask = () => {
    if (taskInput && hoursInput) {
      // Add task logic here
      setTaskInput('');
      setHoursInput('');
    }
  };

  const totalHours = weeklyTasks.reduce((sum, task) => sum + task.hours, 0);
  const completedTasks = weeklyTasks.filter(task => task.status === 'completed').length;

  return (
    // FIX: Added layout classes for correct positioning within the app shell
    <div className="lg:ml-64 p-6 pt-20 lg:pt-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Weekly Entry</h1>
        <p className="text-gray-400">Log your learning progress and track your hours</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-[#00C4CC]" size={24} />
              <h3 className="text-lg font-semibold">This Week</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Total Hours</span>
                  <span className="text-2xl font-bold text-[#00C4CC]">{totalHours}h</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-[#00C4CC] h-2 rounded-full"
                    style={{ width: `${Math.min((totalHours / 40) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Goal: 40 hours</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Completed Tasks</span>
                  <span className="text-2xl font-bold text-[#10B981]">{completedTasks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Task */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task description..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00C4CC]"
              />
              
              <input
                type="number"
                placeholder="Hours spent"
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00C4CC]"
              />
              
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00C4CC]"
              />
              
              <button
                onClick={addTask}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#00C4CC] text-white rounded-lg hover:bg-[#00B8C2] transition-colors duration-200"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Task List and Logs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task List */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Tasks</h3>
            
            <div className="space-y-3">
              {weeklyTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle 
                      size={20}
                      className={task.status === 'completed' ? 'text-[#10B981]' : 'text-gray-500'}
                    />
                    <div>
                      <h4 className="font-medium text-white">{task.task}</h4>
                      <p className="text-sm text-gray-400">{task.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[#00C4CC] font-semibold">{task.hours}h</span>
                    <p className="text-xs text-gray-500 capitalize">
                      {task.status.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-[#F59E0B]" size={20} />
              <h3 className="text-lg font-semibold">Learning Outcomes</h3>
            </div>
            
            <div className="space-y-3">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-1.5 flex-shrink-0"></div>
                  <p className="text-gray-300">{outcome}</p>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200">
              Add Learning Outcome
            </button>
          </div>

          {/* Submit Button */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold">Weekly Submission</h3>
                <p className="text-gray-400 text-sm">Submit your weekly progress report</p>
              </div>
              <button className="px-6 py-3 bg-[#00C4CC] text-white rounded-lg hover:bg-[#00B8C2] transition-colors duration-200">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyEntry;