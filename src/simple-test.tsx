#!/usr/bin/env node
import React from 'react';
import { render, Box, Text } from 'ink';

const SimpleApp: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text>Hello World!</Text>
      <Text color="green">This is a simple test</Text>
    </Box>
  );
};

render(<SimpleApp />);