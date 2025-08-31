import React, { useState, useEffect } from 'react';
import { Box, Text, Spacer, Newline, Static } from 'ink';
import Spinner from 'ink-spinner';
import ProgressBar from '../components/ProgressBar.js';
import Gradient from 'ink-gradient';
import { Task, Settings, Notification, SystemMetrics } from '../types/index.js';
import { getSystemMetrics, formatBytes, formatUptime } from '../utils/system.js';

interface DashboardProps {
  tasks: Task[];
  notifications: Notification[];
  settings: Settings;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, notifications, settings }) => {
  const [metrics, setMetrics] = useState<SystemMetrics>(getSystemMetrics());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getSystemMetrics());
      setTime(new Date());
    }, settings.autoRefresh ? settings.refreshInterval : 60000);

    return () => clearInterval(interval);
  }, [settings.autoRefresh, settings.refreshInterval]);

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const unreadNotifications = notifications.filter(n => !n.read);

  const taskCompletionRate = tasks.length > 0 
    ? completedTasks.length / tasks.length 
    : 0;

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Gradient name="morning">
          <Text bold>System Overview</Text>
        </Gradient>
        <Spacer />
        <Text color="cyan">{time.toLocaleString()}</Text>
      </Box>

      <Box flexDirection="row" marginBottom={1}>
        <Box flexDirection="column" width="50%" paddingRight={1}>
          <Box borderStyle="round" borderColor="green" padding={1}>
            <Box flexDirection="column">
              <Text bold color="green">📊 System Metrics</Text>
              <Text dimColor>──────────────────</Text>
              
              <Box marginTop={1}>
                <Text>CPU Usage: </Text>
                <Text color={metrics.cpu > 80 ? 'red' : metrics.cpu > 50 ? 'yellow' : 'green'}>
                  {metrics.cpu}%
                </Text>
              </Box>
              <Box>
                <ProgressBar 
                  percent={metrics.cpu / 100} 
                  barColor={metrics.cpu > 80 ? 'red' : metrics.cpu > 50 ? 'yellow' : 'green'}
                />
              </Box>

              <Box marginTop={1}>
                <Text>Memory: </Text>
                <Text color={metrics.memory.percentage > 80 ? 'red' : metrics.memory.percentage > 50 ? 'yellow' : 'green'}>
                  {formatBytes(metrics.memory.used)} / {formatBytes(metrics.memory.total)}
                </Text>
              </Box>
              <Box>
                <ProgressBar 
                  percent={metrics.memory.percentage / 100} 
                  barColor={metrics.memory.percentage > 80 ? 'red' : metrics.memory.percentage > 50 ? 'yellow' : 'green'}
                />
              </Box>

              <Box marginTop={1}>
                <Text>Uptime: </Text>
                <Text color="cyan">{formatUptime(metrics.uptime)}</Text>
              </Box>

              <Box>
                <Text>Load Average: </Text>
                <Text color="yellow">
                  {metrics.loadAverage.map((l: number) => l.toFixed(2)).join(' ')}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box flexDirection="column" width="50%" paddingLeft={1}>
          <Box borderStyle="round" borderColor="blue" padding={1}>
            <Box flexDirection="column">
              <Text bold color="blue">✅ Task Statistics</Text>
              <Text dimColor>──────────────────</Text>
              
              <Box marginTop={1}>
                <Text>Total Tasks: </Text>
                <Text color="white" bold>{tasks.length}</Text>
              </Box>

              <Box>
                <Text color="yellow">⏳ Pending: {pendingTasks.length}</Text>
              </Box>
              
              <Box>
                <Text color="cyan">🔄 In Progress: {inProgressTasks.length}</Text>
              </Box>
              
              <Box>
                <Text color="green">✓ Completed: {completedTasks.length}</Text>
              </Box>

              <Box marginTop={1}>
                <Text>Completion Rate:</Text>
              </Box>
              <Box>
                <ProgressBar 
                  percent={taskCompletionRate} 
                  barColor="green"
                />
                <Text> {Math.round(taskCompletionRate * 100)}%</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="row">
        <Box flexDirection="column" width="50%" paddingRight={1}>
          <Box borderStyle="round" borderColor="yellow" padding={1}>
            <Box flexDirection="column">
              <Text bold color="yellow">🔔 Recent Notifications</Text>
              <Text dimColor>──────────────────</Text>
              
              {notifications.length === 0 ? (
                <Box marginTop={1}>
                  <Text dimColor>No notifications</Text>
                </Box>
              ) : (
                <Static items={notifications.slice(0, 5)}>
                  {notification => (
                    <Box key={notification.id} marginTop={1}>
                      <Text color={
                        notification.type === 'error' ? 'red' :
                        notification.type === 'warning' ? 'yellow' :
                        notification.type === 'success' ? 'green' : 'cyan'
                      }>
                        {notification.type === 'error' ? '❌' :
                         notification.type === 'warning' ? '⚠️' :
                         notification.type === 'success' ? '✅' : 'ℹ️'}
                      </Text>
                      <Text> </Text>
                      <Text dimColor={notification.read}>{notification.title}</Text>
                    </Box>
                  )}
                </Static>
              )}
              
              {unreadNotifications.length > 0 && (
                <Box marginTop={1}>
                  <Text color="yellow" bold>
                    {unreadNotifications.length} unread
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box flexDirection="column" width="50%" paddingLeft={1}>
          <Box borderStyle="round" borderColor="magenta" padding={1}>
            <Box flexDirection="column">
              <Text bold color="magenta">🚀 Quick Actions</Text>
              <Text dimColor>──────────────────</Text>
              
              <Box marginTop={1} flexDirection="column">
                <Text><Text color="cyan">[1]</Text> Dashboard</Text>
                <Text><Text color="cyan">[2]</Text> Task Manager</Text>
                <Text><Text color="cyan">[3]</Text> System Monitor</Text>
                <Text><Text color="cyan">[4]</Text> Terminal</Text>
                <Text><Text color="cyan">[5]</Text> Settings</Text>
                <Text><Text color="cyan">[6]</Text> Help</Text>
                <Newline />
                <Text dimColor>Use Tab/Shift+Tab to navigate</Text>
                <Text dimColor>Press Esc to exit</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {settings.autoRefresh && (
        <Box marginTop={1}>
          <Text dimColor>
            <Spinner type="dots" /> Auto-refreshing every {settings.refreshInterval / 1000}s
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;