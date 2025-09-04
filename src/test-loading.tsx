#!/usr/bin/env node
import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';

const TestApp: React.FC = () => {
  const { exit } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
      <Text color="green">✅ Loading complete!</Text>
    </Box>
  );
};

render(<TestApp />);