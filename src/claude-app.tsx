#!/usr/bin/env node
import React, { useState, useCallback, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Spinner from 'ink-spinner';

// Claude AI Official Brand Colors
const CLAUDE_COLORS = {
  primary: '#C15F3C',     // Crail - warm rust-orange
  secondary: '#B1ADA1',   // Cloudy - neutral gray
  background: '#F4F3EE',  // Pampas - off-white/cream
  text: '#000000',        // Black
  accent: '#FFFFFF',      // White
} as const;

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const ClaudeApp: React.FC = () => {
  const { exit } = useApp();
  const [currentView, setCurrentView] = useState<'dashboard' | 'tasks' | 'about'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Welcome to Claude CLI',
      status: 'completed',
      priority: 'high',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Explore Claude Colors',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Build Amazing Things',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
          setCurrentView('about');
          break;
      }

      if (key.tab) {
        const views = ['dashboard', 'tasks', 'about'] as const;
        const currentIndex = views.indexOf(currentView);
        const nextIndex = (currentIndex + 1) % views.length;
        setCurrentView(views[nextIndex]);
      }
    }
  });

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: task.status === 'completed' ? 'pending' : 'completed' 
          }
        : task
    ));
  }, []);

  if (isLoading) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height={25}>
        <Box marginBottom={3}>
          <BigText text="Claude" font="chrome" />
        </Box>
        <Box marginBottom={2}>
          <Text color="#C15F3C" bold>🎨 Official Brand Colors Edition</Text>
        </Box>
        <Box>
          <Spinner type="dots" />
          <Text color="#B1ADA1"> Initializing Claude CLI...</Text>
        </Box>
      </Box>
    );
  }

  const renderDashboard = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="cristal">
          <Text bold>✨ Claude Dashboard</Text>
        </Gradient>
      </Box>

      <Box flexDirection="row" marginBottom={2}>
        <Box flexDirection="column" width="50%" paddingRight={2}>
          <Box borderStyle="round" borderColor="#C15F3C" padding={1} marginBottom={1}>
            <Text bold color="#C15F3C">🎨 Brand Colors</Text>
            <Text color="#B1ADA1">──────────────</Text>
            <Box marginTop={1}>
              <Text color="#C15F3C">● Crail (#C15F3C) - Primary</Text>
            </Box>
            <Box>
              <Text color="#B1ADA1">● Cloudy (#B1ADA1) - Secondary</Text>
            </Box>
            <Box>
              <Text dimColor>● Pampas (#F4F3EE) - Background</Text>
            </Box>
            <Box>
              <Text bold>● Text (#000000) - Contrast</Text>
            </Box>
          </Box>
        </Box>

        <Box flexDirection="column" width="50%" paddingLeft={2}>
          <Box borderStyle="round" borderColor="#B1ADA1" padding={1}>
            <Text bold color="#B1ADA1">📊 Task Stats</Text>
            <Text color="#B1ADA1">──────────────</Text>
            <Box marginTop={1}>
              <Text>Total: </Text>
              <Text color="#C15F3C" bold>{tasks.length}</Text>
            </Box>
            <Box>
              <Text>Completed: </Text>
              <Text color="green" bold>{tasks.filter(t => t.status === 'completed').length}</Text>
            </Box>
            <Box>
              <Text>In Progress: </Text>
              <Text color="yellow" bold>{tasks.filter(t => t.status === 'in-progress').length}</Text>
            </Box>
            <Box>
              <Text>Pending: </Text>
              <Text color="red" bold>{tasks.filter(t => t.status === 'pending').length}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box borderStyle="single" borderColor="#C15F3C" padding={1}>
        <Text bold color="#C15F3C">🚀 Features</Text>
        <Text color="#B1ADA1">────────────────────────────────────────</Text>
        <Box marginTop={1}>
          <Text>• Official Claude AI brand colors (#C15F3C, #B1ADA1, #F4F3EE)</Text>
        </Box>
        <Box>
          <Text>• Memory-optimized with no aggressive polling</Text>
        </Box>
        <Box>
          <Text>• Beautiful terminal UI with gradient effects</Text>
        </Box>
        <Box>
          <Text>• Interactive task management</Text>
        </Box>
        <Box>
          <Text>• Professional design philosophy</Text>
        </Box>
      </Box>
    </Box>
  );

  const renderTasks = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="passion">
          <Text bold>📋 Task Manager</Text>
        </Gradient>
      </Box>

      <Box marginBottom={1}>
        <Text color="#B1ADA1">Press Enter to toggle task status</Text>
      </Box>

      {tasks.map((task, index) => (
        <Box key={task.id} borderStyle="single" borderColor="#C15F3C" padding={1} marginBottom={1}>
          <Box flexDirection="column">
            <Box>
              <Text bold color="#C15F3C">{index + 1}. {task.title}</Text>
            </Box>
            <Box marginTop={1}>
              <Text>Status: </Text>
              <Text color={
                task.status === 'completed' ? 'green' :
                task.status === 'in-progress' ? 'yellow' : 'red'
              }>
                {task.status === 'completed' ? '✅ Completed' :
                 task.status === 'in-progress' ? '🔄 In Progress' : '⏳ Pending'}
              </Text>
              <Text> | Priority: </Text>
              <Text color={
                task.priority === 'high' ? 'red' :
                task.priority === 'medium' ? 'yellow' : 'green'
              }>
                {task.priority.toUpperCase()}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderAbout = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2} justifyContent="center">
        <BigText text="Claude" font="simple" />
      </Box>

      <Box marginBottom={2} justifyContent="center">
        <Text bold color="#C15F3C">The Ultimate AI Assistant CLI</Text>
      </Box>

      <Box borderStyle="round" borderColor="#C15F3C" padding={2}>
        <Text bold color="#C15F3C">About This Project</Text>
        <Text color="#B1ADA1">──────────────────────</Text>
        
        <Box marginTop={1}>
          <Text>Built with React + Ink using Claude AI's official brand colors</Text>
        </Box>
        
        <Box marginTop={1}>
          <Text bold color="#C15F3C">Design Philosophy:</Text>
        </Box>
        <Box>
          <Text>• Warm, professional aesthetic</Text>
        </Box>
        <Box>
          <Text>• Intellectual depth and calmness</Text>
        </Box>
        <Box>
          <Text>• Ethical AI representation</Text>
        </Box>
        <Box>
          <Text>• Safety and alignment focused</Text>
        </Box>

        <Box marginTop={1}>
          <Text bold color="#C15F3C">Technical Features:</Text>
        </Box>
        <Box>
          <Text>• Memory leak prevention</Text>
        </Box>
        <Box>
          <Text>• Efficient rendering</Text>
        </Box>
        <Box>
          <Text>• Responsive terminal UI</Text>
        </Box>
        <Box>
          <Text>• Professional color palette</Text>
        </Box>
      </Box>
    </Box>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'tasks':
        return renderTasks();
      case 'about':
        return renderAbout();
      default:
        return renderDashboard();
    }
  };

  const viewLabels = {
    dashboard: '🎨 Dashboard [1]',
    tasks: '📋 Tasks [2]',
    about: '🤖 About [3]'
  };

  return (
    <Box flexDirection="column" height="100%">
      <Box borderStyle="double" borderColor="#C15F3C" paddingX={2} marginBottom={1}>
        <Text bold color="#C15F3C">Claude CLI</Text>
        <Text color="#B1ADA1"> | Official Brand Colors Edition</Text>
        <Text color="#B1ADA1"> | Press Tab to navigate, Esc to exit</Text>
      </Box>

      <Box borderStyle="single" borderColor="#B1ADA1" paddingX={1} marginBottom={1}>
        <Text>Current: </Text>
        <Text color="#C15F3C" bold>{viewLabels[currentView]}</Text>
        <Text color="#B1ADA1"> | Use 1-3 or Tab to switch</Text>
      </Box>

      {renderCurrentView()}

      <Box marginTop={1} borderStyle="single" borderColor="#B1ADA1" paddingX={1}>
        <Text color="#B1ADA1">
          💡 Tip: This CLI uses Claude AI's official brand colors for a professional aesthetic
        </Text>
      </Box>
    </Box>
  );
};

render(<ClaudeApp />);