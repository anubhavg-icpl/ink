#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import Spinner from 'ink-spinner';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';

const SimpleApp: React.FC = () => {
  const { exit } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === 'c')) {
      exit();
    }
  });

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

  return (
    <Box flexDirection="column" height="100%">
      <Box borderStyle="round" borderColor="cyan" paddingX={1} marginBottom={1}>
        <Gradient name="cristal">
          <Text bold>DevHub CLI - Ultimate Developer Dashboard</Text>
        </Gradient>
        <Text color="gray"> | </Text>
        <Text color="yellow">Press Esc to exit</Text>
      </Box>

      <Box padding={1}>
        <Text color="green">✅ Simple DevHub CLI is working!</Text>
      </Box>

      <Box marginTop={1} borderStyle="single" borderColor="gray" paddingX={1}>
        <Text dimColor>Press Esc to exit</Text>
      </Box>
    </Box>
  );
};

render(<SimpleApp />);