# DevHub CLI 🚀

The ultimate developer dashboard built with Ink (React for CLIs). A powerful, interactive terminal application featuring real-time system monitoring, task management, command execution, and more.

## Features ✨

- **📊 Dashboard** - Real-time system metrics and overview
- **✅ Task Manager** - Full CRUD operations for task management
- **📈 System Monitor** - Live CPU, memory, and network monitoring with charts
- **💻 Interactive Terminal** - Execute commands with history and syntax highlighting
- **⚙️ Settings** - Customizable preferences and configurations
- **🎨 Beautiful UI** - Gradient text, animations, and responsive layouts
- **⌨️ Keyboard Navigation** - Full keyboard support with shortcuts
- **📦 Multiple Views** - Tab-based navigation between different modules
- **🔔 Notifications** - Real-time notification system
- **📊 Visual Charts** - Bar charts for system metrics visualization

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd ink

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run the application
pnpm start
```

## Development

```bash
# Run in development mode
pnpm dev

# Run with auto-reload
pnpm dev:watch

# Watch TypeScript files
pnpm watch

# Clean build directory
pnpm clean
```

## Usage

### Navigation

- **Tab** - Navigate to next view
- **Shift+Tab** - Navigate to previous view
- **1-6** - Jump to specific view
- **↑/↓** - Navigate lists
- **Enter** - Select/Confirm
- **Esc** - Exit application

### Views

1. **Dashboard** - System overview with metrics, tasks summary, and notifications
2. **Tasks** - Create, edit, delete, and manage tasks with filtering and sorting
3. **Monitor** - Real-time system monitoring with CPU, memory, and process charts
4. **Terminal** - Interactive shell with command history and execution
5. **Settings** - Configure themes, behaviors, and preferences
6. **Help** - Documentation and keyboard shortcuts

### Task Manager Commands

- **N** - Create new task
- **E** - Edit selected task
- **D** - Delete selected task
- **F** - Cycle through filters
- **S** - Change sort order

### Terminal Commands

- **Enter** - Execute command
- **↑/↓** - Browse command history
- **Ctrl+L** - Clear terminal
- **Ctrl+C** - Cancel running command

## Architecture

```
src/
├── index.tsx           # Entry point
├── App.tsx            # Main application component
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── views/             # View components
│   ├── Dashboard.tsx  # Dashboard view
│   ├── TaskManager.tsx # Task management view
│   ├── SystemMonitor.tsx # System monitoring view
│   ├── Terminal.tsx   # Interactive terminal view
│   ├── Settings.tsx   # Settings configuration view
│   └── Help.tsx      # Help documentation view
└── components/       # Reusable components
```

## Technologies Used

- **Ink** - React for CLIs
- **React** - Component-based UI
- **TypeScript** - Type safety
- **Node.js** - Runtime environment
- **pnpm** - Package management

## Ink Components Used

- `ink-text-input` - Text input fields
- `ink-select-input` - Select dropdowns
- `ink-spinner` - Loading spinners
- `ink-progress-bar` - Progress indicators
- `ink-table` - Table displays
- `ink-gradient` - Gradient text
- `ink-big-text` - ASCII art text
- `ink-tab` - Tab navigation
- `ink-task-list` - Task lists
- `ink-syntax-highlight` - Syntax highlighting

## Features Showcase

### System Metrics
- Real-time CPU usage monitoring
- Memory usage tracking
- Network interface information
- Process memory details
- System uptime display
- Load average monitoring

### Task Management
- Create tasks with title, description, priority, and tags
- Edit existing tasks
- Delete tasks with confirmation
- Filter by status (pending, in-progress, completed, cancelled)
- Sort by priority, status, or date
- Task completion statistics

### Interactive Terminal
- Execute shell commands
- Command history navigation
- Output syntax highlighting
- Command execution timing
- Error handling and display
- Clear terminal functionality

### Customizable Settings
- Theme selection (dark/light/auto)
- Animation toggles
- Notification preferences
- Auto-refresh configuration
- Date and time formats
- Maximum task limits

## License

ISC

## Author

DevHub CLI - Built with ❤️ using Ink and React