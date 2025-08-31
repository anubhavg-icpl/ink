export type View = 'dashboard' | 'tasks' | 'monitor' | 'terminal' | 'settings' | 'help';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
}

export interface SystemMetrics {
  cpu: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  uptime: number;
  processes: number;
  loadAverage: number[];
}

export interface Settings {
  theme: 'dark' | 'light' | 'auto';
  showNotifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  maxTasks: number;
  enableAnimations: boolean;
  enableSounds: boolean;
  dateFormat: string;
  timeFormat: string;
}

export interface CommandHistory {
  id: string;
  command: string;
  timestamp: Date;
  output?: string;
  error?: string;
  duration?: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}