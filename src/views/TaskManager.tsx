import React, { useState } from 'react';
import { Box, Text, Spacer, useInput, useFocus } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import TaskList from 'ink-task-list';
import Table from 'ink-table';
import Gradient from 'ink-gradient';
import { Task } from '../types/index.js';

interface TaskManagerProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

type Mode = 'list' | 'create' | 'edit' | 'delete';

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [mode, setMode] = useState<Mode>('list');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'pending' as Task['status'],
    tags: [] as string[],
    tagsInput: ''
  });
  const [filter, setFilter] = useState<Task['status'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'status' | 'date'>('priority');

  const { isFocused: isListFocused } = useFocus({ autoFocus: true, id: 'task-list' });
  const { isFocused: isInputFocused } = useFocus({ id: 'task-input' });

  useInput((input, key) => {
    if (mode === 'list') {
      switch (input) {
        case 'n':
        case 'a':
          setMode('create');
          setNewTask({
            title: '',
            description: '',
            priority: 'medium',
            status: 'pending',
            tags: [],
            tagsInput: ''
          });
          break;
        case 'd':
          if (selectedTaskId) {
            setMode('delete');
          }
          break;
        case 'e':
          if (selectedTaskId) {
            setMode('edit');
            const task = tasks.find(t => t.id === selectedTaskId);
            if (task) {
              setNewTask({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                tags: task.tags,
                tagsInput: task.tags.join(', ')
              });
            }
          }
          break;
        case 'f':
          const filters: Array<Task['status'] | 'all'> = ['all', 'pending', 'in-progress', 'completed', 'cancelled'];
          const currentFilterIndex = filters.indexOf(filter);
          setFilter(filters[(currentFilterIndex + 1) % filters.length]);
          break;
        case 's':
          const sorts: Array<'priority' | 'status' | 'date'> = ['priority', 'status', 'date'];
          const currentSortIndex = sorts.indexOf(sortBy);
          setSortBy(sorts[(currentSortIndex + 1) % sorts.length]);
          break;
      }
    }

    if (key.escape) {
      setMode('list');
    }
  });

  const filteredTasks = tasks.filter(task => 
    filter === 'all' || task.status === filter
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder: Record<Task['priority'], number> = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'status':
        const statusOrder: Record<Task['status'], number> = { 'in-progress': 0, pending: 1, completed: 2, cancelled: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      case 'date':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      default:
        return 0;
    }
  });

  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      onAddTask({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: newTask.status,
        tags: newTask.tagsInput.split(',').map(t => t.trim()).filter(t => t)
      });
      setMode('list');
    }
  };

  const handleUpdateTask = () => {
    if (selectedTaskId && newTask.title.trim()) {
      onUpdateTask(selectedTaskId, {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: newTask.status,
        tags: newTask.tagsInput.split(',').map(t => t.trim()).filter(t => t)
      });
      setMode('list');
    }
  };

  const handleDeleteTask = () => {
    if (selectedTaskId) {
      onDeleteTask(selectedTaskId);
      setSelectedTaskId(null);
      setMode('list');
    }
  };

  const taskItems = sortedTasks.map(task => ({
    label: task.title,
    value: task.id,
    key: task.id
  }));

  const priorityItems = [
    { label: '🔴 High', value: 'high' },
    { label: '🟡 Medium', value: 'medium' },
    { label: '🟢 Low', value: 'low' }
  ];

  const statusItems = [
    { label: '⏳ Pending', value: 'pending' },
    { label: '🔄 In Progress', value: 'in-progress' },
    { label: '✅ Completed', value: 'completed' },
    { label: '❌ Cancelled', value: 'cancelled' }
  ];

  if (mode === 'create' || mode === 'edit') {
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Gradient name="teen">
            <Text bold>{mode === 'create' ? '📝 Create New Task' : '✏️ Edit Task'}</Text>
          </Gradient>
        </Box>

        <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
          <Box marginBottom={1}>
            <Text>Title: </Text>
            <TextInput
              value={newTask.title}
              onChange={setTitle => setNewTask({ ...newTask, title: setTitle })}
              placeholder="Enter task title..."
            />
          </Box>

          <Box marginBottom={1}>
            <Text>Description: </Text>
            <TextInput
              value={newTask.description}
              onChange={setDescription => setNewTask({ ...newTask, description: setDescription })}
              placeholder="Enter task description..."
            />
          </Box>

          <Box marginBottom={1}>
            <Text>Priority: </Text>
            <SelectInput
              items={priorityItems}
              initialIndex={priorityItems.findIndex(p => p.value === newTask.priority)}
              onSelect={item => setNewTask({ ...newTask, priority: item.value as Task['priority'] })}
            />
          </Box>

          <Box marginBottom={1}>
            <Text>Status: </Text>
            <SelectInput
              items={statusItems}
              initialIndex={statusItems.findIndex(s => s.value === newTask.status)}
              onSelect={item => setNewTask({ ...newTask, status: item.value as Task['status'] })}
            />
          </Box>

          <Box marginBottom={1}>
            <Text>Tags (comma-separated): </Text>
            <TextInput
              value={newTask.tagsInput}
              onChange={setTagsInput => setNewTask({ ...newTask, tagsInput: setTagsInput })}
              placeholder="tag1, tag2, tag3..."
            />
          </Box>

          <Box marginTop={1}>
            <Text color="green">Press Enter to save, Esc to cancel</Text>
          </Box>
        </Box>

        <Box marginTop={1}>
          <SelectInput
            items={[
              { label: mode === 'create' ? 'Create Task' : 'Update Task', value: 'save' },
              { label: 'Cancel', value: 'cancel' }
            ]}
            onSelect={item => {
              if (item.value === 'save') {
                mode === 'create' ? handleCreateTask() : handleUpdateTask();
              } else {
                setMode('list');
              }
            }}
          />
        </Box>
      </Box>
    );
  }

  if (mode === 'delete') {
    const taskToDelete = tasks.find(t => t.id === selectedTaskId);
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="red" bold>⚠️ Delete Task</Text>
        </Box>
        
        {taskToDelete && (
          <Box flexDirection="column" borderStyle="round" borderColor="red" padding={1}>
            <Text>Are you sure you want to delete this task?</Text>
            <Box marginTop={1}>
              <Text bold>{taskToDelete.title}</Text>
            </Box>
            <Box marginTop={1}>
              <SelectInput
                items={[
                  { label: 'Yes, delete it', value: 'delete' },
                  { label: 'No, keep it', value: 'cancel' }
                ]}
                onSelect={item => {
                  if (item.value === 'delete') {
                    handleDeleteTask();
                  } else {
                    setMode('list');
                  }
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Gradient name="passion">
          <Text bold>📋 Task Manager</Text>
        </Gradient>
        <Spacer />
        <Text color="yellow">
          Filter: {filter} | Sort: {sortBy}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>
          [N]ew [E]dit [D]elete [F]ilter [S]ort | Total: {tasks.length} tasks
        </Text>
      </Box>

      {sortedTasks.length === 0 ? (
        <Box borderStyle="round" borderColor="gray" padding={1}>
          <Text dimColor>No tasks found. Press 'N' to create a new task.</Text>
        </Box>
      ) : (
        <>
          <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
            <SelectInput
              items={taskItems}
              onSelect={item => setSelectedTaskId(item.value)}
              isFocused={isListFocused}
            />
          </Box>

          {selectedTaskId && (
            <Box marginTop={1} borderStyle="single" borderColor="gray" padding={1}>
              {(() => {
                const task = tasks.find(t => t.id === selectedTaskId);
                if (!task) return null;
                
                return (
                  <Box flexDirection="column">
                    <Text bold>{task.title}</Text>
                    {task.description && (
                      <Text dimColor>{task.description}</Text>
                    )}
                    <Box marginTop={1}>
                      <Text>Priority: </Text>
                      <Text color={
                        task.priority === 'high' ? 'red' :
                        task.priority === 'medium' ? 'yellow' : 'green'
                      }>
                        {task.priority}
                      </Text>
                      <Text> | Status: </Text>
                      <Text color={
                        task.status === 'completed' ? 'green' :
                        task.status === 'in-progress' ? 'cyan' :
                        task.status === 'cancelled' ? 'red' : 'yellow'
                      }>
                        {task.status}
                      </Text>
                    </Box>
                    {task.tags.length > 0 && (
                      <Box>
                        <Text>Tags: </Text>
                        <Text color="magenta">{task.tags.join(', ')}</Text>
                      </Box>
                    )}
                    <Box>
                      <Text dimColor>
                        Created: {task.createdAt.toLocaleDateString()} | 
                        Updated: {task.updatedAt.toLocaleDateString()}
                      </Text>
                    </Box>
                  </Box>
                );
              })()}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default TaskManager;