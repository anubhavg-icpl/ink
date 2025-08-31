#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './App.js';

const cli = meow(`
  Usage
    $ devhub

  Options
    --help     Show help
    --version  Show version

  Examples
    $ devhub
    Launch the DevHub CLI dashboard

  Keyboard Shortcuts
    Tab        Navigate between views
    1-6        Jump to specific view
    Esc        Exit application
    ↑/↓        Navigate lists
    Enter      Select/Confirm

  Views
    1  Dashboard  - System overview and metrics
    2  Tasks      - Manage your todo items
    3  Monitor    - Real-time system monitoring
    4  Terminal   - Execute shell commands
    5  Settings   - Configure preferences
    6  Help       - Show help and documentation
`, {
  importMeta: import.meta,
  flags: {}
});

render(<App />);