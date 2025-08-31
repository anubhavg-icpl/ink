import React, { useState, useEffect } from 'react';
import { Box, Text, Spacer, Static } from 'ink';
import Spinner from 'ink-spinner';
import ProgressBar from '../components/ProgressBar.js';
import Gradient from 'ink-gradient';
import { Settings, SystemMetrics, ChartData } from '../types/index.js';
import { getSystemMetrics, formatBytes, formatUptime } from '../utils/system.js';
import os from 'os';
import process from 'process';

interface SystemMonitorProps {
  settings: Settings;
}

const BarChart: React.FC<{ data: ChartData[]; width?: number; height?: number }> = ({ 
  data, 
  width = 40, 
  height = 10 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const bars = '█▉▊▋▌▍▎▏';
  
  return (
    <Box flexDirection="column">
      {Array.from({ length: height }).map((_, rowIndex) => {
        const threshold = (height - rowIndex) / height * maxValue;
        return (
          <Box key={rowIndex}>
            <Text dimColor>{rowIndex === 0 ? '│' : '│'}</Text>
            {data.map((item, colIndex) => {
              const barHeight = (item.value / maxValue) * height;
              const shouldRender = barHeight >= (height - rowIndex);
              const partialBar = (barHeight - Math.floor(barHeight)) * bars.length;
              const char = shouldRender 
                ? (height - rowIndex === Math.ceil(barHeight) && partialBar > 0 
                  ? bars[Math.floor(partialBar)] 
                  : '█')
                : ' ';
              
              return (
                <Text key={colIndex} color={item.color || 'cyan'}>
                  {char}
                </Text>
              );
            })}
          </Box>
        );
      })}
      <Box>
        <Text dimColor>└{'─'.repeat(data.length)}</Text>
      </Box>
      <Box>
        <Text dimColor> </Text>
        {data.map((item, index) => (
          <Text key={index} dimColor>{item.label[0]}</Text>
        ))}
      </Box>
    </Box>
  );
};

const SystemMonitor: React.FC<SystemMonitorProps> = ({ settings }) => {
  const [metrics, setMetrics] = useState<SystemMetrics>(getSystemMetrics());
  const [cpuHistory, setCpuHistory] = useState<number[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<number[]>([]);
  const [processInfo, setProcessInfo] = useState<any[]>([]);
  const [networkInfo, setNetworkInfo] = useState<any>({});

  useEffect(() => {
    const updateMetrics = () => {
      const newMetrics = getSystemMetrics();
      setMetrics(newMetrics);
      
      setCpuHistory(prev => [...prev.slice(-19), newMetrics.cpu]);
      setMemoryHistory(prev => [...prev.slice(-19), newMetrics.memory.percentage]);
      
      const memUsage = process.memoryUsage();
      setProcessInfo([
        { name: 'RSS', value: memUsage.rss, color: 'cyan' },
        { name: 'Heap Total', value: memUsage.heapTotal, color: 'yellow' },
        { name: 'Heap Used', value: memUsage.heapUsed, color: 'green' },
        { name: 'External', value: memUsage.external, color: 'magenta' }
      ]);

      const nets = os.networkInterfaces();
      const activeInterfaces: any = {};
      Object.keys(nets).forEach(name => {
        const net = nets[name];
        if (net) {
          const activeNet = net.find(n => !n.internal && n.family === 'IPv4');
          if (activeNet) {
            activeInterfaces[name] = activeNet.address;
          }
        }
      });
      setNetworkInfo(activeInterfaces);
    };

    updateMetrics();
    const interval = setInterval(
      updateMetrics, 
      settings.autoRefresh ? settings.refreshInterval : 60000
    );

    return () => clearInterval(interval);
  }, [settings.autoRefresh, settings.refreshInterval]);

  const cpuChartData: ChartData[] = cpuHistory.map((value, index) => ({
    label: index.toString(),
    value,
    color: value > 80 ? 'red' : value > 50 ? 'yellow' : 'green'
  }));

  const memoryChartData: ChartData[] = memoryHistory.map((value, index) => ({
    label: index.toString(),
    value,
    color: value > 80 ? 'red' : value > 50 ? 'yellow' : 'cyan'
  }));

  const processChartData: ChartData[] = processInfo.map(p => ({
    label: p.name,
    value: p.value / 1024 / 1024,
    color: p.color
  }));

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Gradient name="vice">
          <Text bold>🖥️ System Monitor</Text>
        </Gradient>
        <Spacer />
        <Text color="cyan">
          {settings.autoRefresh && (
            <>
              <Spinner type="dots" /> Refreshing every {settings.refreshInterval / 1000}s
            </>
          )}
        </Text>
      </Box>

      <Box flexDirection="row" marginBottom={1}>
        <Box width="50%" paddingRight={1}>
          <Box borderStyle="round" borderColor="green" padding={1}>
            <Box flexDirection="column">
              <Text bold color="green">CPU Usage History</Text>
              <Text dimColor>Current: {metrics.cpu}%</Text>
              
              <Box marginTop={1}>
                <BarChart data={cpuChartData} width={20} height={8} />
              </Box>
              
              <Box marginTop={1}>
                <Text>Cores: {os.cpus().length}</Text>
                <Text> | Model: {os.cpus()[0]?.model.split(' ').slice(0, 2).join(' ')}</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box width="50%" paddingLeft={1}>
          <Box borderStyle="round" borderColor="cyan" padding={1}>
            <Box flexDirection="column">
              <Text bold color="cyan">Memory Usage History</Text>
              <Text dimColor>Current: {metrics.memory.percentage}%</Text>
              
              <Box marginTop={1}>
                <BarChart data={memoryChartData} width={20} height={8} />
              </Box>
              
              <Box marginTop={1}>
                <Text>Used: {formatBytes(metrics.memory.used)}</Text>
                <Text> | Total: {formatBytes(metrics.memory.total)}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="row" marginBottom={1}>
        <Box width="50%" paddingRight={1}>
          <Box borderStyle="round" borderColor="yellow" padding={1}>
            <Box flexDirection="column">
              <Text bold color="yellow">Process Memory</Text>
              
              <Box marginTop={1}>
                <BarChart data={processChartData} width={15} height={6} />
              </Box>
              
              <Box marginTop={1} flexDirection="column">
                {processInfo.map((p, i) => (
                  <Box key={i}>
                    <Text color={p.color}>{p.name}: </Text>
                    <Text>{formatBytes(p.value)}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box width="50%" paddingLeft={1}>
          <Box borderStyle="round" borderColor="magenta" padding={1}>
            <Box flexDirection="column">
              <Text bold color="magenta">System Information</Text>
              
              <Box marginTop={1} flexDirection="column">
                <Box>
                  <Text>Platform: </Text>
                  <Text color="cyan">{os.platform()}</Text>
                </Box>
                <Box>
                  <Text>Architecture: </Text>
                  <Text color="cyan">{os.arch()}</Text>
                </Box>
                <Box>
                  <Text>Node Version: </Text>
                  <Text color="cyan">{process.version}</Text>
                </Box>
                <Box>
                  <Text>Hostname: </Text>
                  <Text color="cyan">{os.hostname()}</Text>
                </Box>
                <Box>
                  <Text>Uptime: </Text>
                  <Text color="green">{formatUptime(metrics.uptime)}</Text>
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
        </Box>
      </Box>

      <Box borderStyle="round" borderColor="blue" padding={1}>
        <Box flexDirection="column">
          <Text bold color="blue">Network Interfaces</Text>
          
          <Box marginTop={1} flexDirection="column">
            {Object.keys(networkInfo).length === 0 ? (
              <Text dimColor>No active network interfaces</Text>
            ) : (
              Object.entries(networkInfo).map(([name, address]) => (
                <Box key={name}>
                  <Text color="cyan">{name}: </Text>
                  <Text>{address as string}</Text>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>
          PID: {process.pid} | User: {os.userInfo().username} | 
          Home: {os.homedir().split('/').pop()}
        </Text>
      </Box>
    </Box>
  );
};

export default SystemMonitor;