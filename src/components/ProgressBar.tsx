import React from 'react';
import { Box, Text } from 'ink';

interface ProgressBarProps {
  percent: number;
  barColor?: string;
  width?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percent, 
  barColor = 'green',
  width = 20 
}) => {
  const filled = Math.round(percent * width);
  const empty = width - filled;
  
  return (
    <Box>
      <Text color={barColor}>{'█'.repeat(filled)}</Text>
      <Text dimColor>{'░'.repeat(empty)}</Text>
    </Box>
  );
};

export default ProgressBar;