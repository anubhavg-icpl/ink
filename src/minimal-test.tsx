#!/usr/bin/env node
import React from 'react';
import { render, Box, Text } from 'ink';

const MinimalApp: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text>Hello World!</Text>
      <Text color="green">This is a minimal test</Text>
    </Box>
  );
};

render(<MinimalApp />);