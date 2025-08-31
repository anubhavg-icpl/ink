declare module 'ink-progress-bar' {
  import { FC } from 'react';
  
  interface ProgressBarProps {
    percent: number;
    barColor?: string;
    bgColor?: string;
    width?: number;
  }
  
  const ProgressBar: FC<ProgressBarProps>;
  export default ProgressBar;
}