import React, { useState, useCallback, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Spinner from 'ink-spinner';

import Dashboard from './views/Dashboard.js';
import TaskManager from './views/TaskManager.js';
import SystemMonitor from './views/SystemMonitor.js';
import Terminal from './views/Terminal.js';
import Settings from './views/Settings.js';
import Help from './views/Help.js';

import { View, Task, Settings as SettingsType, Notification } from './types/index.js';
import { generateId } from './utils/system.js';

const App: React.FC = () => {
  const { exit } = useApp();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: generateId(),
      title: 'Welcome to DevHub CLI',
      description: 'Explore all the features of this powerful developer dashboard',
      status: 'completed',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['welcome', 'tutorial']
    }
  ]);
  
  const [settings, setSettings] = useState<SettingsType>({
    theme: 'dark',
    showNotifications: true,
    autoRefresh: true,
    refreshInterval: 5000,
    maxTasks: 100,
    enableAnimations: true,
    enableSounds: false,
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: generateId(),
      type: 'success',
      title: 'Welcome!',
      message: 'DevHub CLI is ready to use',
      timestamp: new Date(),
      read: false
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === 'c')) {
      exit();
    }

    if (!isLoading) {
      switch (input) {
        case '1':
          setCurrentView('dashboard');
          break;
        case '2':
          setCurrentView('tasks');
          break;
        case '3':
          setCurrentView('monitor');
          break;
        case '4':
          setCurrentView('terminal');
          break;
        case '5':
          setCurrentView('settings');
          break;
        case '6':
        case '?':
        case 'h':
          setCurrentView('help');
          break;
      }

      if (key.tab) {
        const views: View[] = ['dashboard', 'tasks', 'monitor', 'terminal', 'settings', 'help'];
        const currentIndex = views.indexOf(currentView);
        const nextIndex = (currentIndex + 1) % views.length;
        setCurrentView(views[nextIndex]);
      }

      if (key.shift && key.tab) {
        const views: View[] = ['dashboard', 'tasks', 'monitor', 'terminal', 'settings', 'help'];
        const currentIndex = views.indexOf(currentView);
        const prevIndex = currentIndex === 0 ? views.length - 1 : currentIndex - 1;
        setCurrentView(views[prevIndex]);
      }
    }
  });

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
    
    setNotifications(prev => [...prev, {
      id: generateId(),
      type: 'success',
      title: 'Task Created',
      message: `Task "${task.title}" has been created`,
      timestamp: new Date(),
      read: false
    }]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTasks(prev => prev.filter(t => t.id !== id));
      setNotifications(prev => [...prev, {
        id: generateId(),
        type: 'info',
        title: 'Task Deleted',
        message: `Task "${task.title}" has been deleted`,
        timestamp: new Date(),
        read: false
      }]);
    }
  }, [tasks]);

  if (isLoading) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height={20}>
        <Box marginBottom={2}>
          <BigText text="DevHub" font="chrome" />
        </Box>
        <Box>
          <Spinner type="dots" />
          <Text color="cyan"> Initializing developer environment...</Text>
        </Box>
      </Box>
    );
  }

  const viewLabels = {
    dashboard: '📊 Dashboard [1]',
    tasks: '✅ Tasks [2]',
    monitor: '📈 Monitor [3]',
    terminal: '💻 Terminal [4]',
    settings: '⚙️ Settings [5]',
    help: '❓ Help [6]'
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} notifications={notifications} settings={settings} />;
      case 'tasks':
        return <TaskManager tasks={tasks} onAddTask={addTask} onUpdateTask={updateTask} onDeleteTask={deleteTask} />;
      case 'monitor':
        return <SystemMonitor settings={settings} />;
      case 'terminal':
        return <Terminal />;
      case 'settings':
        return <Settings settings={settings} onUpdateSettings={setSettings} />;
      case 'help':
        return <Help />;
      default:
        return <Dashboard tasks={tasks} notifications={notifications} settings={settings} />;
    }
  };

  return (
    <Box flexDirection="column" height="100%">
      <Box borderStyle="round" borderColor="cyan" paddingX={1} marginBottom={1}>
        <Gradient name="cristal">
          <Text bold>DevHub CLI - Ultimate Developer Dashboard</Text>
        </Gradient>
        <Text color="gray"> | </Text>
        <Text color="yellow">Press Tab to navigate, Esc to exit</Text>
      </Box>

      <Box borderStyle="single" borderColor="blue" paddingX={1} marginBottom={1}>
        <Text bold>Current View: </Text>
        <Text color="cyan">{viewLabels[currentView]}</Text>
        <Text color="gray"> | Use 1-6 or Tab to switch views</Text>
      </Box>

      {renderCurrentView()}

      <Box marginTop={1} borderStyle="single" borderColor="gray" paddingX={1}>
        <Text dimColor>
          Notifications: {notifications.filter(n => !n.read).length} unread | 
          Tasks: {tasks.length} total ({tasks.filter(t => t.status === 'pending').length} pending) | 
          View: {currentView}
        </Text>
      </Box>
    </Box>
  );
};

export default App;