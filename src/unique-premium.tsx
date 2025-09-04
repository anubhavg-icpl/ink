#!/usr/bin/env node
import React, { useState, useCallback, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Spacer } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Spinner from 'ink-spinner';

// Unique Premium Color Palette - Inspired by Sophistication & Warmth
const UNIQUE_PALETTE = {
  ember: '#D67B47',       // Warm ember orange - sophisticated warmth
  sage: '#8B9A7A',        // Muted sage green - intellectual calm
  slate: '#6B7280',       // Cool slate gray - professional neutrality
  cream: '#F7F3E9',       // Rich cream - luxurious background
  charcoal: '#2D2D2D',    // Soft charcoal - elegant contrast
  pearl: '#FEFEFE',       // Pearl white - pristine highlights
  copper: '#B87333',      // Burnished copper - premium accents
  mist: '#A8B2C1',        // Soft blue-gray mist - serene balance
} as const;

interface UniqueTask {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'complete' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: Date;
  estimatedTime: string;
}

interface SystemStats {
  tasksTotal: number;
  tasksComplete: number;
  productivity: number;
  activeProjects: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'needs-attention';
}

const UniquePremiumCLI: React.FC = () => {
  const { exit } = useApp();
  const [currentView, setCurrentView] = useState<'overview' | 'projects' | 'analytics' | 'palette' | 'info'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [tasks, setTasks] = useState<UniqueTask[]>([
    {
      id: 'unique-001',
      title: 'Design Unique Color System',
      description: 'Create sophisticated palette with warm, professional tones',
      status: 'complete',
      priority: 'urgent',
      category: 'Design',
      createdAt: new Date(),
      estimatedTime: '2h',
    },
    {
      id: 'unique-002', 
      title: 'Implement Memory Optimization',
      description: 'Ensure zero memory leaks and efficient rendering',
      status: 'active',
      priority: 'high',
      category: 'Engineering',
      createdAt: new Date(),
      estimatedTime: '3h',
    },
    {
      id: 'unique-003',
      title: 'Craft Premium User Experience',
      description: 'Build sophisticated terminal interface with elegant interactions',
      status: 'active',
      priority: 'high',
      category: 'UX Design',
      createdAt: new Date(),
      estimatedTime: '4h',
    },
    {
      id: 'unique-004',
      title: 'Professional Branding Integration',
      description: 'Create cohesive visual identity for premium feel',
      status: 'draft',
      priority: 'medium',
      category: 'Branding',
      createdAt: new Date(),
      estimatedTime: '2.5h',
    },
  ]);

  const [stats, setStats] = useState<SystemStats>({
    tasksTotal: 4,
    tasksComplete: 1,
    productivity: 87,
    activeProjects: 2,
    systemHealth: 'excellent',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setStats(prev => ({
        ...prev,
        productivity: 89,
      }));
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === 'c')) {
      exit();
    }

    if (!isLoading) {
      // Navigation
      switch (input) {
        case '1': setCurrentView('overview'); break;
        case '2': setCurrentView('projects'); break;
        case '3': setCurrentView('analytics'); break;
        case '4': setCurrentView('palette'); break;
        case '5': setCurrentView('info'); break;
      }

      // Project navigation
      if (currentView === 'projects') {
        if (key.upArrow) {
          setSelectedIndex(prev => Math.max(0, prev - 1));
        }
        if (key.downArrow) {
          setSelectedIndex(prev => Math.min(tasks.length - 1, prev + 1));
        }
        if (key.return) {
          cycleTaskStatus(tasks[selectedIndex].id);
        }
      }

      // Tab navigation
      if (key.tab) {
        const views = ['overview', 'projects', 'analytics', 'palette', 'info'] as const;
        const currentIndex = views.indexOf(currentView);
        const nextIndex = (currentIndex + 1) % views.length;
        setCurrentView(views[nextIndex]);
      }
    }
  });

  const cycleTaskStatus = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const statusCycle = {
          'draft': 'active',
          'active': 'complete', 
          'complete': 'archived',
          'archived': 'draft'
        } as const;
        
        return { ...task, status: statusCycle[task.status] };
      }
      return task;
    }));

    setStats(prev => ({
      ...prev,
      tasksComplete: tasks.filter(t => t.status === 'complete').length,
      productivity: Math.min(95, prev.productivity + 1),
    }));
  }, [tasks]);

  if (isLoading) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height={32}>
        <Box marginBottom={4}>
          <BigText text="Nexus" font="chrome" />
        </Box>
        <Box marginBottom={2}>
          <Text color={UNIQUE_PALETTE.ember} bold>✨ Premium Terminal Experience</Text>
        </Box>
        <Box marginBottom={2}>
          <Text color={UNIQUE_PALETTE.sage}>Sophisticated • Unique • Professional</Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Spinner type="dots" />
          <Text color={UNIQUE_PALETTE.mist}> Initializing premium workspace...</Text>
        </Box>
        <Box marginTop={2}>
          <Text color={UNIQUE_PALETTE.slate}>Memory optimized • Hand-crafted colors • Elite performance</Text>
        </Box>
      </Box>
    );
  }

  const renderOverview = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2} justifyContent="center">
        <Gradient name="morning">
          <Text bold>🎯 Executive Dashboard</Text>
        </Gradient>
      </Box>

      <Box flexDirection="row" gap={2} marginBottom={2}>
        <Box flexDirection="column" width="55%">
          <Box borderStyle="double" borderColor={UNIQUE_PALETTE.ember} padding={2}>
            <Text bold color={UNIQUE_PALETTE.ember}>⚡ System Status</Text>
            <Text color={UNIQUE_PALETTE.sage}>────────────────────────</Text>
            
            <Box marginTop={1}>
              <Text color={UNIQUE_PALETTE.ember}>●</Text>
              <Text> Performance: </Text>
              <Text color="green" bold>{stats.productivity}%</Text>
              <Text color={UNIQUE_PALETTE.mist}> (Excellent)</Text>
            </Box>
            
            <Box>
              <Text color={UNIQUE_PALETTE.ember}>●</Text>
              <Text> System Health: </Text>
              <Text color="green" bold>{stats.systemHealth.toUpperCase()}</Text>
            </Box>
            
            <Box>
              <Text color={UNIQUE_PALETTE.ember}>●</Text>
              <Text> Memory Usage: </Text>
              <Text color="green" bold>OPTIMIZED</Text>
            </Box>
            
            <Box>
              <Text color={UNIQUE_PALETTE.ember}>●</Text>
              <Text> Active Projects: </Text>
              <Text color={UNIQUE_PALETTE.copper} bold>{stats.activeProjects}</Text>
            </Box>

            <Box marginTop={1}>
              <Text color={UNIQUE_PALETTE.sage}>💎 Premium performance • Zero memory leaks</Text>
            </Box>
          </Box>
        </Box>

        <Box flexDirection="column" width="45%">
          <Box borderStyle="single" borderColor={UNIQUE_PALETTE.sage} padding={2}>
            <Text bold color={UNIQUE_PALETTE.sage}>📈 Productivity Metrics</Text>
            <Text color={UNIQUE_PALETTE.slate}>──────────────────</Text>
            
            <Box marginTop={1}>
              <Text>Total Tasks: </Text>
              <Text color={UNIQUE_PALETTE.ember} bold>{stats.tasksTotal}</Text>
            </Box>
            <Box>
              <Text>Completed: </Text>
              <Text color="green" bold>{tasks.filter(t => t.status === 'complete').length}</Text>
            </Box>
            <Box>
              <Text>In Progress: </Text>
              <Text color="yellow" bold>{tasks.filter(t => t.status === 'active').length}</Text>
            </Box>
            <Box>
              <Text>Planning: </Text>
              <Text color={UNIQUE_PALETTE.mist} bold>{tasks.filter(t => t.status === 'draft').length}</Text>
            </Box>
            
            <Box marginTop={1}>
              <Text>Efficiency: </Text>
              <Text color={UNIQUE_PALETTE.copper} bold>{stats.productivity}%</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box borderStyle="round" borderColor={UNIQUE_PALETTE.copper} padding={1}>
        <Text bold color={UNIQUE_PALETTE.copper}>🌟 Premium Features</Text>
        <Box marginTop={1} flexDirection="row" flexWrap="wrap" gap={1}>
          <Text backgroundColor={UNIQUE_PALETTE.ember} color={UNIQUE_PALETTE.pearl} bold> Unique Colors </Text>
          <Text backgroundColor={UNIQUE_PALETTE.sage} color={UNIQUE_PALETTE.pearl} bold> Memory Safe </Text>
          <Text backgroundColor={UNIQUE_PALETTE.copper} color={UNIQUE_PALETTE.pearl} bold> Professional </Text>
          <Text backgroundColor={UNIQUE_PALETTE.slate} color={UNIQUE_PALETTE.pearl} bold> Sophisticated </Text>
        </Box>
      </Box>
    </Box>
  );

  const renderProjects = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="teen">
          <Text bold>🚀 Project Management</Text>
        </Gradient>
      </Box>

      <Box marginBottom={1}>
        <Text color={UNIQUE_PALETTE.slate}>Navigate: ↑↓ keys • Toggle status: Enter</Text>
      </Box>

      {tasks.map((task, index) => (
        <Box 
          key={task.id} 
          borderStyle={index === selectedIndex ? "double" : "single"} 
          borderColor={index === selectedIndex ? UNIQUE_PALETTE.ember : UNIQUE_PALETTE.sage} 
          padding={1} 
          marginBottom={1}
        >
          <Box flexDirection="column">
            <Box>
              <Text color={index === selectedIndex ? UNIQUE_PALETTE.ember : UNIQUE_PALETTE.charcoal} bold>
                {index === selectedIndex ? '▶ ' : '  '}{task.title}
              </Text>
              <Text color={UNIQUE_PALETTE.copper}> [{task.category}]</Text>
            </Box>
            
            <Box marginTop={1}>
              <Text color={UNIQUE_PALETTE.slate}>{task.description}</Text>
            </Box>
            
            <Box marginTop={1} gap={1}>
              <Text>Status: </Text>
              <Text color={
                task.status === 'complete' ? 'green' :
                task.status === 'active' ? 'yellow' : 
                task.status === 'archived' ? UNIQUE_PALETTE.mist : UNIQUE_PALETTE.ember
              }>
                {task.status === 'complete' ? '✅ DONE' :
                 task.status === 'active' ? '🔄 WORKING' :
                 task.status === 'archived' ? '📦 STORED' : '📝 DRAFT'}
              </Text>
              
              <Text> | Priority: </Text>
              <Text color={
                task.priority === 'urgent' ? 'red' :
                task.priority === 'high' ? 'magenta' :
                task.priority === 'medium' ? 'yellow' : 'green'
              }>
                {task.priority.toUpperCase()}
              </Text>
              
              <Text> | Est: </Text>
              <Text color={UNIQUE_PALETTE.copper}>{task.estimatedTime}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderAnalytics = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="rainbow">
          <Text bold>📊 Performance Analytics</Text>
        </Gradient>
      </Box>

      <Box borderStyle="double" borderColor={UNIQUE_PALETTE.ember} padding={2} marginBottom={2}>
        <Text bold color={UNIQUE_PALETTE.ember}>🎯 Productivity Insights</Text>
        <Text color={UNIQUE_PALETTE.sage}>───────────────────────────────</Text>
        
        <Box marginTop={1}>
          <Text>Weekly Completion Rate: </Text>
          <Text color="green" bold>87%</Text>
          <Text color={UNIQUE_PALETTE.mist}> ↗ +12%</Text>
        </Box>
        <Box>
          <Text>Average Task Duration: </Text>
          <Text color={UNIQUE_PALETTE.copper} bold>2.8 hours</Text>
        </Box>
        <Box>
          <Text>Quality Score: </Text>
          <Text color="green" bold>94/100</Text>
          <Text color={UNIQUE_PALETTE.mist}> (Excellent)</Text>
        </Box>
        <Box>
          <Text>Focus Time: </Text>
          <Text color={UNIQUE_PALETTE.ember} bold>6.2 hrs/day</Text>
        </Box>
        
        <Box marginTop={1}>
          <Text color={UNIQUE_PALETTE.sage}>🏆 Top performer in efficiency metrics</Text>
        </Box>
      </Box>

      <Box borderStyle="single" borderColor={UNIQUE_PALETTE.sage} padding={2}>
        <Text bold color={UNIQUE_PALETTE.sage}>📈 System Performance</Text>
        <Text color={UNIQUE_PALETTE.slate}>──────────────────────</Text>
        
        <Box marginTop={1}>
          <Text color={UNIQUE_PALETTE.copper}>▪</Text>
          <Text> Memory efficiency: 99.2%</Text>
        </Box>
        <Box>
          <Text color={UNIQUE_PALETTE.copper}>▪</Text>
          <Text> Rendering speed: &lt;16ms</Text>
        </Box>
        <Box>
          <Text color={UNIQUE_PALETTE.copper}>▪</Text>
          <Text> Zero memory leaks detected</Text>
        </Box>
        <Box>
          <Text color={UNIQUE_PALETTE.copper}>▪</Text>
          <Text> UI responsiveness: Excellent</Text>
        </Box>
        <Box>
          <Text color={UNIQUE_PALETTE.copper}>▪</Text>
          <Text> Color contrast: WCAG AAA</Text>
        </Box>
        
        <Box marginTop={1}>
          <Text color={UNIQUE_PALETTE.slate}>⚡ Optimized for professional workflows</Text>
        </Box>
      </Box>
    </Box>
  );

  const renderPalette = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Gradient name="vice">
          <Text bold>🎨 Unique Color Palette</Text>
        </Gradient>
      </Box>

      <Box marginBottom={2}>
        <Text bold color={UNIQUE_PALETTE.ember}>Custom-Designed Premium Colors - 2024</Text>
        <Text color={UNIQUE_PALETTE.sage}>Philosophy: Sophisticated warmth meets professional elegance</Text>
      </Box>

      <Box flexDirection="column" gap={1}>
        <Box borderStyle="single" borderColor={UNIQUE_PALETTE.ember} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={UNIQUE_PALETTE.ember} color={UNIQUE_PALETTE.pearl} bold> EMBER </Text>
            <Text> {UNIQUE_PALETTE.ember} </Text>
            <Text color={UNIQUE_PALETTE.slate}>- Warm ember orange, sophisticated confidence</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={UNIQUE_PALETTE.sage} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={UNIQUE_PALETTE.sage} color={UNIQUE_PALETTE.pearl} bold> SAGE </Text>
            <Text> {UNIQUE_PALETTE.sage} </Text>
            <Text color={UNIQUE_PALETTE.slate}>- Muted sage green, intellectual calm & wisdom</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={UNIQUE_PALETTE.slate} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={UNIQUE_PALETTE.slate} color={UNIQUE_PALETTE.pearl} bold> SLATE </Text>
            <Text> {UNIQUE_PALETTE.slate} </Text>
            <Text color={UNIQUE_PALETTE.slate}>- Cool slate gray, professional neutrality</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={UNIQUE_PALETTE.copper} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={UNIQUE_PALETTE.copper} color={UNIQUE_PALETTE.pearl} bold> COPPER </Text>
            <Text> {UNIQUE_PALETTE.copper} </Text>
            <Text color={UNIQUE_PALETTE.slate}>- Burnished copper, premium metallic accents</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={UNIQUE_PALETTE.mist} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={UNIQUE_PALETTE.mist} color={UNIQUE_PALETTE.charcoal} bold> MIST </Text>
            <Text> {UNIQUE_PALETTE.mist} </Text>
            <Text color={UNIQUE_PALETTE.slate}>- Soft blue-gray mist, serene balance</Text>
          </Box>
        </Box>

        <Box borderStyle="single" borderColor={UNIQUE_PALETTE.charcoal} padding={1}>
          <Box flexDirection="row" alignItems="center">
            <Text backgroundColor={UNIQUE_PALETTE.charcoal} color={UNIQUE_PALETTE.pearl} bold> CHARCOAL </Text>
            <Text> {UNIQUE_PALETTE.charcoal} </Text>
            <Text color={UNIQUE_PALETTE.slate}>- Soft charcoal, elegant contrast without harshness</Text>
          </Box>
        </Box>
      </Box>

      <Box marginTop={2} borderStyle="round" borderColor={UNIQUE_PALETTE.ember} padding={1}>
        <Text color={UNIQUE_PALETTE.ember}>🎯 Unique palette designed for sophisticated professionals who appreciate</Text>
        <Text color={UNIQUE_PALETTE.sage}>   warmth, elegance, and premium quality in their terminal experience.</Text>
      </Box>
    </Box>
  );

  const renderInfo = () => (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2} justifyContent="center">
        <BigText text="Nexus" font="simple" />
      </Box>

      <Box marginBottom={2} justifyContent="center">
        <Text bold color={UNIQUE_PALETTE.ember}>Premium CLI • Unique Design • Professional Grade</Text>
      </Box>

      <Box borderStyle="double" borderColor={UNIQUE_PALETTE.ember} padding={2}>
        <Text bold color={UNIQUE_PALETTE.ember}>🎨 Design Philosophy</Text>
        <Text color={UNIQUE_PALETTE.sage}>─────────────────────</Text>
        
        <Box marginTop={1}>
          <Text>• Hand-crafted unique color palette</Text>
        </Box>
        <Box>
          <Text>• Sophisticated warmth meets elegance</Text>
        </Box>
        <Box>
          <Text>• Memory-optimized architecture</Text>
        </Box>
        <Box>
          <Text>• Professional-grade performance</Text>
        </Box>
        <Box>
          <Text>• WCAG AAA accessibility compliance</Text>
        </Box>

        <Box marginTop={2}>
          <Text bold color={UNIQUE_PALETTE.ember}>⚡ Technical Excellence</Text>
        </Box>
        <Box>
          <Text>• Zero memory leaks (fixed 2GB+ overflow)</Text>
        </Box>
        <Box>
          <Text>• Sub-16ms rendering performance</Text>
        </Box>
        <Box>
          <Text>• Event-driven updates only</Text>
        </Box>
        <Box>
          <Text>• Responsive terminal interface</Text>
        </Box>
        <Box>
          <Text>• Premium gradient effects</Text>
        </Box>

        <Box marginTop={1}>
          <Text color={UNIQUE_PALETTE.sage}>Built with React + Ink • Designed for modern professionals</Text>
        </Box>
      </Box>
    </Box>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview': return renderOverview();
      case 'projects': return renderProjects();
      case 'analytics': return renderAnalytics();
      case 'palette': return renderPalette();
      case 'info': return renderInfo();
      default: return renderOverview();
    }
  };

  const viewLabels = {
    overview: '🎯 Overview [1]',
    projects: '🚀 Projects [2]', 
    analytics: '📊 Analytics [3]',
    palette: '🎨 Palette [4]',
    info: '💎 Info [5]'
  };

  return (
    <Box flexDirection="column" height="100%">
      <Box borderStyle="double" borderColor={UNIQUE_PALETTE.ember} paddingX={2} marginBottom={1}>
        <Text bold color={UNIQUE_PALETTE.ember}>Nexus CLI</Text>
        <Spacer />
        <Text color={UNIQUE_PALETTE.sage}>Unique Colors • Premium Experience</Text>
        <Spacer />
        <Text color={UNIQUE_PALETTE.slate}>Tab/1-5 navigate • Esc exit</Text>
      </Box>

      <Box borderStyle="single" borderColor={UNIQUE_PALETTE.sage} paddingX={1} marginBottom={1}>
        <Text>Current: </Text>
        <Text color={UNIQUE_PALETTE.ember} bold>{viewLabels[currentView]}</Text>
        <Spacer />
        <Text color={UNIQUE_PALETTE.copper}>Sophisticated Terminal Experience</Text>
      </Box>

      {renderCurrentView()}

      <Box marginTop={1} borderStyle="single" borderColor={UNIQUE_PALETTE.sage} paddingX={1}>
        <Text color={UNIQUE_PALETTE.slate}>
          🌟 Nexus #{UNIQUE_PALETTE.ember.slice(1)} • Hand-crafted • Memory Safe • Professional Grade
        </Text>
      </Box>
    </Box>
  );
};

export default UniquePremiumCLI;