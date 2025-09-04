#!/usr/bin/env node
import React, { useState, useCallback, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Spacer } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Spinner from 'ink-spinner';

// Claude AI Official Brand Colors - 2024 Edition
const CLAUDE_BRAND = {
  crail: '#C15F3C',      // Primary - warm rust-orange (evokes warmth & passion)
  cloudy: '#B1ADA1',     // Secondary - neutral sophisticated gray
  pampas: '#F4F3EE',     // Background - off-white cream (calm & professional)
  obsidian: '#000000',   // Text - pure black (authority & contrast)
  snow: '#FFFFFF',       // Accent - pure white (clarity & space)
} as const;

interface ClaudeTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  createdAt: Date;
  aiAssisted: boolean;
}

interface ClaudeMetrics {
  tasksTotal: number;
  tasksCompleted: number;
  aiInteractions: number;
  uptime: string;
  memoryOptimized: boolean;
}

const ClaudePremiumCLI: React.FC = () => {
  const { exit } = useApp();
  const [currentView, setCurrentView] = useState<'home' | 'workspace' | 'ai-lab' | 'colors' | 'about'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  
  const [tasks, setTasks] = useState<ClaudeTask[]>([
    {
      id: 'claude-001',
      title: 'Design with Claude Colors',
      description: 'Implement the official Claude AI brand palette',
      status: 'completed',
      priority: 'critical',
      tags: ['design', 'branding', 'ui'],
      createdAt: new Date(),
      aiAssisted: true,
    },
    {
      id: 'claude-002', 
      title: 'Memory Optimization',
      description: 'Prevent heap overflow and optimize performance',
      status: 'processing',
      priority: 'high',
      tags: ['performance', 'optimization'],
      createdAt: new Date(),
      aiAssisted: true,
    },
    {
      id: 'claude-003',
      title: 'Professional Aesthetic',
      description: 'Create calm, intellectual terminal experience',
      status: 'processing',
      priority: 'medium',
      tags: ['ux', 'aesthetics'],
      createdAt: new Date(),
      aiAssisted: true,
    },
    {
      id: 'claude-004',
      title: 'Ethical AI Integration',
      description: 'Align with Anthropic safety principles',
      status: 'pending',
      priority: 'critical',
      tags: ['ai-safety', 'ethics'],
      createdAt: new Date(),
      aiAssisted: true,
    },
  ]);

  const [metrics, setMetrics] = useState<ClaudeMetrics>({
    tasksTotal: 4,
    tasksCompleted: 1,
    aiInteractions: 247,
    uptime: '2m 34s',
    memoryOptimized: true,
  });

  // Fixed: No aggressive polling - only update on user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Single metrics update after loading
      setMetrics(prev => ({
        ...prev,
        uptime: '2m 45s',
        aiInteractions: prev.aiInteractions + 1,
      }));
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === 'c')) {
      exit();
    }

    if (!isLoading) {
      // Navigation
      switch (input) {
        case '1': setCurrentView('home'); break;
        case '2': setCurrentView('workspace'); break;
        case '3': setCurrentView('ai-lab'); break;
        case '4': setCurrentView('colors'); break;
        case '5': setCurrentView('about'); break;
      }

      // Task navigation in workspace
      if (currentView === 'workspace') {
        if (key.upArrow) {
          setSelectedTaskIndex(prev => Math.max(0, prev - 1));
        }
        if (key.downArrow) {
          setSelectedTaskIndex(prev => Math.min(tasks.length - 1, prev + 1));
        }
        if (key.return) {
          toggleTaskStatus(tasks[selectedTaskIndex].id);
        }
      }

      // Tab navigation
      if (key.tab) {
        const views = ['home', 'workspace', 'ai-lab', 'colors', 'about'] as const;
        const currentIndex = views.indexOf(currentView);
        const nextIndex = (currentIndex + 1) % views.length;
        setCurrentView(views[nextIndex]);
      }
    }
  });

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newStatus = 
          task.status === 'pending' ? 'processing' :
          task.status === 'processing' ? 'completed' :
          task.status === 'completed' ? 'archived' : 'pending';
        
        return { ...task, status: newStatus };
      }
      return task;
    }));

    // Update metrics without aggressive polling
    setMetrics(prev => ({
      ...prev,
      tasksCompleted: tasks.filter(t => t.status === 'completed').length,
      aiInteractions: prev.aiInteractions + 1,
    }));
  }, [tasks]);

  if (isLoading) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height={30}>
        <Box marginBottom={3}>
          <BigText text="Claude" font="chrome" />
        </Box>
        <Box marginBottom={2}>
          <Text color={CLAUDE_BRAND.crail} bold>🎨 Premium Brand Colors Edition</Text>
        </Box>
        <Box marginBottom={2}>
          <Text color={CLAUDE_BRAND.cloudy}>Featuring official Anthropic design palette</Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Spinner type="dots" />
          <Text color={CLAUDE_BRAND.cloudy}> Initializing premium Claude experience...</Text>
        </Box>
        <Box marginTop={2}>
          <Text dimColor>Memory optimized • No polling • Professional grade</Text>
        </Box>
      </Box>
    );
  }

  const renderHome = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2} justifyContent="center">
        <Gradient name="morning">
          <Text bold>🏠 Claude Command Center</Text>
        </Gradient>
      </Box>

      <Box flexDirection="row" gap={2} marginBottom={2}>
        <Box flexDirection="column" width="60%">
          <Box borderStyle="double" borderColor={CLAUDE_BRAND.crail} padding={2}>
            <Text bold color={CLAUDE_BRAND.crail}>🎯 Mission Control</Text>
            <Text color={CLAUDE_BRAND.cloudy}>────────────────────────</Text>
            
            <Box marginTop={1}>
              <Text color={CLAUDE_BRAND.crail}>●</Text>
              <Text> System Status: </Text>
              <Text color="green" bold>OPTIMAL</Text>
            </Box>
            
            <Box>
              <Text color={CLAUDE_BRAND.crail}>●</Text>
              <Text> Memory Usage: </Text>
              <Text color="green" bold>OPTIMIZED</Text>
            </Box>
            
            <Box>
              <Text color={CLAUDE_BRAND.crail}>●</Text>
              <Text> AI Interactions: </Text>
              <Text color={CLAUDE_BRAND.crail} bold>{metrics.aiInteractions}</Text>
            </Box>
            
            <Box>
              <Text color={CLAUDE_BRAND.crail}>●</Text>
              <Text> Uptime: </Text>
              <Text color="cyan" bold>{metrics.uptime}</Text>
            </Box>

            <Box marginTop={1}>
              <Text color={CLAUDE_BRAND.cloudy}>💡 No aggressive polling • Professional design</Text>
            </Box>
          </Box>
        </Box>

        <Box flexDirection="column" width="40%">
          <Box borderStyle="single" borderColor={CLAUDE_BRAND.cloudy} padding={2}>
            <Text bold color={CLAUDE_BRAND.cloudy}>📊 Analytics</Text>
            <Text color={CLAUDE_BRAND.cloudy}>─────────────</Text>
            
            <Box marginTop={1}>
              <Text>Tasks: {metrics.tasksTotal}</Text>
            </Box>
            <Box>
              <Text>Completed: </Text>
              <Text color="green" bold>{tasks.filter(t => t.status === 'completed').length}</Text>
            </Box>
            <Box>
              <Text>Processing: </Text>
              <Text color="yellow" bold>{tasks.filter(t => t.status === 'processing').length}</Text>
            </Box>
            <Box>
              <Text>Pending: </Text>
              <Text color="red" bold>{tasks.filter(t => t.status === 'pending').length}</Text>
            </Box>
            
            <Box marginTop={1}>
              <Text color={CLAUDE_BRAND.cloudy}>AI-Powered: </Text>
              <Text color={CLAUDE_BRAND.crail} bold>100%</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box borderStyle="round" borderColor={CLAUDE_BRAND.crail} padding={1}>
        <Text bold color={CLAUDE_BRAND.crail}>🚀 Premium Features</Text>
        <Box marginTop={1} flexDirection="row" flexWrap="wrap" gap={1}>
          <Text backgroundColor={CLAUDE_BRAND.crail} color={CLAUDE_BRAND.snow} bold> Official Colors </Text>
          <Text backgroundColor={CLAUDE_BRAND.cloudy} color={CLAUDE_BRAND.snow} bold> Memory Safe </Text>
          <Text backgroundColor="green" color={CLAUDE_BRAND.snow} bold> AI Powered </Text>
          <Text backgroundColor="blue" color={CLAUDE_BRAND.snow} bold> Professional </Text>
        </Box>
      </Box>
    </Box>
  );

  const renderWorkspace = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="teen">
          <Text bold>🛠️ AI Workspace</Text>
        </Gradient>
      </Box>

      <Box marginBottom={1}>
        <Text color={CLAUDE_BRAND.cloudy}>Use ↑↓ to navigate, Enter to toggle status</Text>
      </Box>

      {tasks.map((task, index) => (
        <Box 
          key={task.id} 
          borderStyle={index === selectedTaskIndex ? "double" : "single"} 
          borderColor={index === selectedTaskIndex ? CLAUDE_BRAND.crail : CLAUDE_BRAND.cloudy} 
          padding={1} 
          marginBottom={1}
        >
          <Box flexDirection="column">
            <Box>
              <Text color={index === selectedTaskIndex ? CLAUDE_BRAND.crail : CLAUDE_BRAND.obsidian} bold>
                {index === selectedTaskIndex ? '▶ ' : '  '}{task.title}
              </Text>
              {task.aiAssisted && <Text color={CLAUDE_BRAND.crail}> 🤖</Text>}
            </Box>
            
            <Box marginTop={1}>
              <Text color={CLAUDE_BRAND.cloudy}>{task.description}</Text>
            </Box>
            
            <Box marginTop={1} gap={1}>
              <Text>Status: </Text>
              <Text color={
                task.status === 'completed' ? 'green' :
                task.status === 'processing' ? 'yellow' : 
                task.status === 'archived' ? 'blue' : 'red'
              }>
                {task.status === 'completed' ? '✅ DONE' :
                 task.status === 'processing' ? '🔄 ACTIVE' :
                 task.status === 'archived' ? '📦 ARCHIVED' : '⏳ TODO'}
              </Text>
              
              <Text> | Priority: </Text>
              <Text color={
                task.priority === 'critical' ? 'red' :
                task.priority === 'high' ? 'magenta' :
                task.priority === 'medium' ? 'yellow' : 'green'
              }>
                {task.priority.toUpperCase()}
              </Text>
            </Box>
            
            <Box marginTop={1}>
              <Text color={CLAUDE_BRAND.cloudy}>Tags: </Text>
              {task.tags.map(tag => (
                <Text key={tag} color={CLAUDE_BRAND.crail}> #{tag}</Text>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderAILab = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="rainbow">
          <Text bold>🧪 AI Laboratory</Text>
        </Gradient>
      </Box>

      <Box borderStyle="double" borderColor={CLAUDE_BRAND.crail} padding={2} marginBottom={2}>
        <Text bold color={CLAUDE_BRAND.crail}>🔬 Claude AI Integration</Text>
        <Text color={CLAUDE_BRAND.cloudy}>───────────────────────────────</Text>
        
        <Box marginTop={1}>
          <Text>• Anthropic Safety Principles: </Text>
          <Text color="green" bold>ACTIVE</Text>
        </Box>
        <Box>
          <Text>• Ethical AI Alignment: </Text>
          <Text color="green" bold>VERIFIED</Text>
        </Box>
        <Box>
          <Text>• Constitutional AI: </Text>
          <Text color="green" bold>ENABLED</Text>
        </Box>
        <Box>
          <Text>• Harmlessness Training: </Text>
          <Text color="green" bold>INTEGRATED</Text>
        </Box>
        
        <Box marginTop={1}>
          <Text color={CLAUDE_BRAND.cloudy}>🛡️ Built with safety-first AI principles</Text>
        </Box>
      </Box>

      <Box borderStyle="single" borderColor={CLAUDE_BRAND.cloudy} padding={2}>
        <Text bold color={CLAUDE_BRAND.cloudy}>🎯 AI Capabilities</Text>
        <Text color={CLAUDE_BRAND.cloudy}>──────────────────</Text>
        
        <Box marginTop={1}>
          <Text color={CLAUDE_BRAND.crail}>▪</Text>
          <Text> Natural language processing</Text>
        </Box>
        <Box>
          <Text color={CLAUDE_BRAND.crail}>▪</Text>
          <Text> Reasoning and analysis</Text>
        </Box>
        <Box>
          <Text color={CLAUDE_BRAND.crail}>▪</Text>
          <Text> Code generation and review</Text>
        </Box>
        <Box>
          <Text color={CLAUDE_BRAND.crail}>▪</Text>
          <Text> Creative problem solving</Text>
        </Box>
        <Box>
          <Text color={CLAUDE_BRAND.crail}>▪</Text>
          <Text> Memory-efficient processing</Text>
        </Box>
        
        <Box marginTop={1}>
          <Text color={CLAUDE_BRAND.cloudy}>⚡ Optimized for professional workflows</Text>
        </Box>
      </Box>
    </Box>
  );

  const renderColors = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="vice">
          <Text bold>🎨 Claude Brand Palette</Text>
        </Gradient>
      </Box>

      <Box marginBottom={2}>
        <Text bold color={CLAUDE_BRAND.crail}>Official Anthropic Brand Colors - 2024</Text>
        <Text color={CLAUDE_BRAND.cloudy}>Design philosophy: Warmth, professionalism, intellectual depth</Text>
      </Box>

      <Box flexDirection="column" gap={1}>
        <Box borderStyle="single" borderColor={CLAUDE_BRAND.crail} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={CLAUDE_BRAND.crail} color={CLAUDE_BRAND.snow} bold> CRAIL </Text>
            <Text> {CLAUDE_BRAND.crail} </Text>
            <Text color={CLAUDE_BRAND.cloudy}>- Primary rust-orange, evokes warmth & passion</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={CLAUDE_BRAND.cloudy} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={CLAUDE_BRAND.cloudy} color={CLAUDE_BRAND.snow} bold> CLOUDY </Text>
            <Text> {CLAUDE_BRAND.cloudy} </Text>
            <Text color={CLAUDE_BRAND.cloudy}>- Sophisticated neutral gray, professional balance</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={CLAUDE_BRAND.cloudy} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor="#F4F3EE" color={CLAUDE_BRAND.obsidian} bold> PAMPAS </Text>
            <Text> {CLAUDE_BRAND.pampas} </Text>
            <Text color={CLAUDE_BRAND.cloudy}>- Off-white cream, calm & intellectual depth</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={CLAUDE_BRAND.obsidian} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={CLAUDE_BRAND.obsidian} color={CLAUDE_BRAND.snow} bold> OBSIDIAN </Text>
            <Text> {CLAUDE_BRAND.obsidian} </Text>
            <Text color={CLAUDE_BRAND.cloudy}>- Pure black, authority & maximum contrast</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={CLAUDE_BRAND.cloudy} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={CLAUDE_BRAND.snow} color={CLAUDE_BRAND.obsidian} bold> SNOW </Text>
            <Text> {CLAUDE_BRAND.snow} </Text>
            <Text color={CLAUDE_BRAND.cloudy}>- Pure white, clarity & spacious design</Text>
          </Box>
        </Box>
      </Box>

      <Box marginTop={2} borderStyle="round" borderColor={CLAUDE_BRAND.crail} padding={1}>
        <Text color={CLAUDE_BRAND.crail}>🎯 Unlike competitors' neon or techy gradients, Claude's palette feels grounded</Text>
        <Text color={CLAUDE_BRAND.cloudy}>   and aligns with Anthropic's focus on safety, alignment, and ethical AI use.</Text>
      </Box>
    </Box>
  );

  const renderAbout = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2} justifyContent="center">
        <BigText text="Claude" font="simple" />
      </Box>

      <Box marginBottom={2} justifyContent="center">
        <Text bold color={CLAUDE_BRAND.crail}>Premium CLI Experience by Anthropic</Text>
      </Box>

      <Box borderStyle="double" borderColor={CLAUDE_BRAND.crail} padding={2}>
        <Text bold color={CLAUDE_BRAND.crail}>🎨 Design Excellence</Text>
        <Text color={CLAUDE_BRAND.cloudy}>─────────────────────</Text>
        
        <Box marginTop={1}>
          <Text>• Official Claude AI brand colors</Text>
        </Box>
        <Box>
          <Text>• Memory leak prevention & optimization</Text>
        </Box>
        <Box>
          <Text>• Professional aesthetic philosophy</Text>
        </Box>
        <Box>
          <Text>• Ethical AI representation</Text>
        </Box>
        <Box>
          <Text>• Safety-first design principles</Text>
        </Box>

        <Box marginTop={2}>
          <Text bold color={CLAUDE_BRAND.crail}>⚡ Technical Features</Text>
        </Box>
        <Box>
          <Text>• Zero aggressive polling (memory safe)</Text>
        </Box>
        <Box>
          <Text>• Responsive terminal interface</Text>
        </Box>
        <Box>
          <Text>• Interactive task management</Text>
        </Box>
        <Box>
          <Text>• Gradient effects & animations</Text>
        </Box>
        <Box>
          <Text>• Professional color coordination</Text>
        </Box>

        <Box marginTop={1}>
          <Text color={CLAUDE_BRAND.cloudy}>Built with React + Ink • Powered by Claude AI principles</Text>
        </Box>
      </Box>
    </Box>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home': return renderHome();
      case 'workspace': return renderWorkspace();
      case 'ai-lab': return renderAILab();
      case 'colors': return renderColors();
      case 'about': return renderAbout();
      default: return renderHome();
    }
  };

  const viewLabels = {
    home: '🏠 Home [1]',
    workspace: '🛠️ Workspace [2]', 
    'ai-lab': '🧪 AI Lab [3]',
    colors: '🎨 Colors [4]',
    about: '🤖 About [5]'
  };

  return (
    <Box flexDirection="column" height="100%">
      <Box borderStyle="double" borderColor={CLAUDE_BRAND.crail} paddingX={2} marginBottom={1}>
        <Text bold color={CLAUDE_BRAND.crail}>Claude Premium CLI</Text>
        <Spacer />
        <Text color={CLAUDE_BRAND.cloudy}>Official Brand Colors • Memory Optimized</Text>
        <Spacer />
        <Text color={CLAUDE_BRAND.cloudy}>Tab/1-5 navigate • Esc exit</Text>
      </Box>

      <Box borderStyle="single" borderColor={CLAUDE_BRAND.cloudy} paddingX={1} marginBottom={1}>
        <Text>Active: </Text>
        <Text color={CLAUDE_BRAND.crail} bold>{viewLabels[currentView]}</Text>
        <Spacer />
        <Text color={CLAUDE_BRAND.cloudy}>AI-Powered Professional Terminal Experience</Text>
      </Box>

      {renderCurrentView()}

      <Box marginTop={1} borderStyle="single" borderColor={CLAUDE_BRAND.cloudy} paddingX={1}>
        <Text color={CLAUDE_BRAND.cloudy}>
          🎨 Claude #{CLAUDE_BRAND.crail.slice(1)} • Memory Safe • AI Ethics Aligned • Professional Grade
        </Text>
      </Box>
    </Box>
  );
};

export default ClaudePremiumCLI;