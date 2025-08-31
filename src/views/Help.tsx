import React from 'react';
import { Box, Text, Spacer } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

const Help: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1} justifyContent="center">
        <Gradient name="rainbow">
          <BigText text="DevHub" font="simple" />
        </Gradient>
      </Box>

      <Box marginBottom={1} justifyContent="center">
        <Text bold color="cyan">The Ultimate Developer Dashboard CLI</Text>
      </Box>

      <Box flexDirection="row" marginBottom={1}>
        <Box width="50%" paddingRight={1}>
          <Box borderStyle="round" borderColor="green" padding={1}>
            <Box flexDirection="column">
              <Text bold color="green">📍 Navigation</Text>
              <Text dimColor>────────────────</Text>
              
              <Box marginTop={1} flexDirection="column">
                <Box>
                  <Text color="cyan">Tab</Text>
                  <Text> - Next view</Text>
                </Box>
                <Box>
                  <Text color="cyan">Shift+Tab</Text>
                  <Text> - Previous view</Text>
                </Box>
                <Box>
                  <Text color="cyan">1-6</Text>
                  <Text> - Jump to specific view</Text>
                </Box>
                <Box>
                  <Text color="cyan">Esc</Text>
                  <Text> - Exit application</Text>
                </Box>
                <Box>
                  <Text color="cyan">↑/↓</Text>
                  <Text> - Navigate lists</Text>
                </Box>
                <Box>
                  <Text color="cyan">Enter</Text>
                  <Text> - Select/Confirm</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box width="50%" paddingLeft={1}>
          <Box borderStyle="round" borderColor="blue" padding={1}>
            <Box flexDirection="column">
              <Text bold color="blue">🎯 Quick Keys</Text>
              <Text dimColor>────────────────</Text>
              
              <Box marginTop={1} flexDirection="column">
                <Text bold color="yellow">Dashboard [1]</Text>
                <Text dimColor>System overview and metrics</Text>
                
                <Text bold color="yellow">Tasks [2]</Text>
                <Text dimColor>Manage your todo items</Text>
                
                <Text bold color="yellow">Monitor [3]</Text>
                <Text dimColor>Real-time system monitoring</Text>
                
                <Text bold color="yellow">Terminal [4]</Text>
                <Text dimColor>Execute shell commands</Text>
                
                <Text bold color="yellow">Settings [5]</Text>
                <Text dimColor>Configure preferences</Text>
                
                <Text bold color="yellow">Help [6]</Text>
                <Text dimColor>This help screen</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="row" marginBottom={1}>
        <Box width="50%" paddingRight={1}>
          <Box borderStyle="round" borderColor="yellow" padding={1}>
            <Box flexDirection="column">
              <Text bold color="yellow">✅ Task Manager</Text>
              <Text dimColor>────────────────</Text>
              
              <Box marginTop={1} flexDirection="column">
                <Box>
                  <Text color="cyan">N</Text>
                  <Text> - New task</Text>
                </Box>
                <Box>
                  <Text color="cyan">E</Text>
                  <Text> - Edit selected task</Text>
                </Box>
                <Box>
                  <Text color="cyan">D</Text>
                  <Text> - Delete selected task</Text>
                </Box>
                <Box>
                  <Text color="cyan">F</Text>
                  <Text> - Cycle through filters</Text>
                </Box>
                <Box>
                  <Text color="cyan">S</Text>
                  <Text> - Change sort order</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box width="50%" paddingLeft={1}>
          <Box borderStyle="round" borderColor="magenta" padding={1}>
            <Box flexDirection="column">
              <Text bold color="magenta">💻 Terminal</Text>
              <Text dimColor>────────────────</Text>
              
              <Box marginTop={1} flexDirection="column">
                <Box>
                  <Text color="cyan">Enter</Text>
                  <Text> - Execute command</Text>
                </Box>
                <Box>
                  <Text color="cyan">↑/↓</Text>
                  <Text> - Browse history</Text>
                </Box>
                <Box>
                  <Text color="cyan">Ctrl+L</Text>
                  <Text> - Clear terminal</Text>
                </Box>
                <Box>
                  <Text color="cyan">Ctrl+C</Text>
                  <Text> - Cancel command</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box borderStyle="round" borderColor="cyan" padding={1}>
        <Box flexDirection="column">
          <Text bold color="cyan">🚀 Features</Text>
          <Text dimColor>────────────────</Text>
          
          <Box marginTop={1} flexDirection="row" flexWrap="wrap">
            <Box width="33%" marginBottom={0}>
              <Text>• Live system metrics</Text>
            </Box>
            <Box width="33%" marginBottom={0}>
              <Text>• Task management</Text>
            </Box>
            <Box width="34%" marginBottom={0}>
              <Text>• Command execution</Text>
            </Box>
            <Box width="33%">
              <Text>• Real-time charts</Text>
            </Box>
            <Box width="33%">
              <Text>• Customizable settings</Text>
            </Box>
            <Box width="34%">
              <Text>• Keyboard navigation</Text>
            </Box>
            <Box width="33%">
              <Text>• Command history</Text>
            </Box>
            <Box width="33%">
              <Text>• Notifications</Text>
            </Box>
            <Box width="34%">
              <Text>• Multi-view interface</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box marginTop={1} justifyContent="center">
        <Text dimColor>
          DevHub CLI v1.0.0 | Built with Ink & React | Press Esc to exit
        </Text>
      </Box>
    </Box>
  );
};

export default Help;