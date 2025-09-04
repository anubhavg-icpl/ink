#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import UniquePremiumCLI from './unique-premium.js';

const cli = meow(`
  Usage
    $ nexus-cli

  Options
    --help     Show help
    --version  Show version

  Examples
    $ nexus-cli
    Launch Nexus Premium Terminal Experience

  Keyboard Shortcuts
    Tab/1-5    Navigate between views
    ↑/↓        Navigate project tasks
    Enter      Toggle task status
    Esc        Exit application

  Views
    1  Overview   - Executive dashboard with unique colors
    2  Projects   - Professional task management
    3  Analytics  - Performance insights & metrics
    4  Palette    - Custom color system showcase
    5  Info       - Premium CLI information

  Features
    🎨 Unique sophisticated color palette (Ember, Sage, Copper)
    🛡️ Memory optimized - zero leaks, premium performance
    💎 Hand-crafted professional terminal experience
    ⚡ WCAG AAA accessibility & modern design
`, {
  importMeta: import.meta,
  flags: {}
});

render(<UniquePremiumCLI />);