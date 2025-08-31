import React, { useState, useCallback } from 'react';
import { Box, Text, useInput, Static } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import Gradient from 'ink-gradient';
import SyntaxHighlight from 'ink-syntax-highlight';
import { CommandHistory } from '../types/index.js';
import { generateId } from '../utils/system.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const Terminal: React.FC = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [inputMode, setInputMode] = useState(true);

  useInput((input, key) => {
    if (!inputMode) return;

    if (key.upArrow) {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex].command);
      }
    }

    if (key.downArrow) {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }

    if (key.ctrl && input === 'l') {
      setHistory([]);
      setCommand('');
      setHistoryIndex(-1);
    }

    if (key.ctrl && input === 'c' && isExecuting) {
      setIsExecuting(false);
      const lastCommand = history[history.length - 1];
      if (lastCommand && !lastCommand.output && !lastCommand.error) {
        setHistory(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...lastCommand,
            error: 'Command cancelled by user',
            duration: Date.now() - lastCommand.timestamp.getTime()
          };
          return updated;
        });
      }
    }
  });

  const executeCommand = useCallback(async (cmd: string) => {
    if (!cmd.trim()) return;

    const startTime = Date.now();
    const commandEntry: CommandHistory = {
      id: generateId(),
      command: cmd,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, commandEntry]);
    setIsExecuting(true);
    setCommand('');
    setHistoryIndex(-1);

    try {
      const { stdout, stderr } = await execAsync(cmd, {
        timeout: 30000,
        maxBuffer: 1024 * 1024
      });

      const output = stdout || stderr;
      const duration = Date.now() - startTime;

      setHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...commandEntry,
          output: output.trim(),
          duration
        };
        return updated;
      });
    } catch (error: any) {
      const duration = Date.now() - startTime;
      setHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...commandEntry,
          error: error.message || 'Command failed',
          duration
        };
        return updated;
      });
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const handleSubmit = (value: string) => {
    executeCommand(value);
  };

  const builtInCommands = [
    { cmd: 'help', desc: 'Show available commands' },
    { cmd: 'clear', desc: 'Clear terminal history (Ctrl+L)' },
    { cmd: 'ls', desc: 'List directory contents' },
    { cmd: 'pwd', desc: 'Print working directory' },
    { cmd: 'date', desc: 'Show current date and time' },
    { cmd: 'whoami', desc: 'Display current user' },
    { cmd: 'echo [text]', desc: 'Display text' },
    { cmd: 'cat [file]', desc: 'Display file contents' },
    { cmd: 'history', desc: 'Show command history' }
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Gradient name="atlas">
          <Text bold>💻 Interactive Terminal</Text>
        </Gradient>
      </Box>

      <Box borderStyle="round" borderColor="green" padding={1} flexDirection="column" minHeight={20}>
        <Static items={history}>
          {item => (
            <Box key={item.id} flexDirection="column" marginBottom={1}>
              <Box>
                <Text color="cyan">❯ </Text>
                <Text color="green" bold>{item.command}</Text>
                {item.duration && (
                  <Text dimColor> ({(item.duration / 1000).toFixed(2)}s)</Text>
                )}
              </Box>
              
              {item.output && (
                <Box marginLeft={2} marginTop={0}>
                  <Text>{item.output}</Text>
                </Box>
              )}
              
              {item.error && (
                <Box marginLeft={2} marginTop={0}>
                  <Text color="red">Error: {item.error}</Text>
                </Box>
              )}
            </Box>
          )}
        </Static>

        {isExecuting && (
          <Box>
            <Spinner type="dots" />
            <Text color="yellow"> Executing command...</Text>
          </Box>
        )}

        {!isExecuting && (
          <Box>
            <Text color="cyan">❯ </Text>
            <TextInput
              value={command}
              onChange={setCommand}
              onSubmit={handleSubmit}
              placeholder="Enter command..."
            />
          </Box>
        )}
      </Box>

      <Box marginTop={1} flexDirection="row">
        <Box width="50%" paddingRight={1}>
          <Box borderStyle="single" borderColor="gray" padding={1}>
            <Box flexDirection="column">
              <Text bold color="yellow">Quick Commands</Text>
              <Text dimColor>────────────────</Text>
              {builtInCommands.slice(0, 5).map((cmd, i) => (
                <Box key={i}>
                  <Text color="cyan">{cmd.cmd}</Text>
                  <Text dimColor> - {cmd.desc}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box width="50%" paddingLeft={1}>
          <Box borderStyle="single" borderColor="gray" padding={1}>
            <Box flexDirection="column">
              <Text bold color="yellow">Keyboard Shortcuts</Text>
              <Text dimColor>────────────────</Text>
              <Box><Text color="cyan">↑/↓</Text><Text> - Navigate history</Text></Box>
              <Box><Text color="cyan">Ctrl+L</Text><Text> - Clear terminal</Text></Box>
              <Box><Text color="cyan">Ctrl+C</Text><Text> - Cancel command</Text></Box>
              <Box><Text color="cyan">Enter</Text><Text> - Execute command</Text></Box>
              <Box><Text color="cyan">Tab</Text><Text> - Switch view</Text></Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>
          History: {history.length} commands | 
          Working Directory: {process.cwd().split('/').slice(-2).join('/')}
        </Text>
      </Box>
    </Box>
  );
};

export default Terminal;