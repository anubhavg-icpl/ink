import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import Gradient from 'ink-gradient';
import { Settings as SettingsType } from '../types/index.js';

interface SettingsProps {
  settings: SettingsType;
  onUpdateSettings: (settings: SettingsType) => void;
}

type SettingCategory = 'appearance' | 'behavior' | 'performance' | 'datetime';
type EditMode = 'none' | 'editing';

const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings }) => {
  const [category, setCategory] = useState<SettingCategory>('appearance');
  const [editMode, setEditMode] = useState<EditMode>('none');
  const [editingField, setEditingField] = useState<string>('');
  const [tempValue, setTempValue] = useState<string>('');

  useInput((input, key) => {
    if (editMode === 'none') {
      switch (input) {
        case '1':
          setCategory('appearance');
          break;
        case '2':
          setCategory('behavior');
          break;
        case '3':
          setCategory('performance');
          break;
        case '4':
          setCategory('datetime');
          break;
      }
    }

    if (key.escape) {
      setEditMode('none');
      setEditingField('');
      setTempValue('');
    }
  });

  const handleToggle = (field: keyof SettingsType) => {
    if (typeof settings[field] === 'boolean') {
      onUpdateSettings({
        ...settings,
        [field]: !settings[field]
      });
    }
  };

  const handleEdit = (field: string, value: string) => {
    setEditMode('editing');
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = (field: keyof SettingsType) => {
    let newValue: any = tempValue;
    
    if (field === 'refreshInterval' || field === 'maxTasks') {
      newValue = parseInt(tempValue, 10);
      if (isNaN(newValue)) return;
    }
    
    onUpdateSettings({
      ...settings,
      [field]: newValue
    });
    
    setEditMode('none');
    setEditingField('');
    setTempValue('');
  };

  const categoryItems = [
    { label: '🎨 Appearance', value: 'appearance' },
    { label: '⚡ Behavior', value: 'behavior' },
    { label: '🚀 Performance', value: 'performance' },
    { label: '🕐 Date & Time', value: 'datetime' }
  ];

  const renderAppearanceSettings = () => (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>Theme: </Text>
        <SelectInput
          items={[
            { label: '🌙 Dark', value: 'dark' },
            { label: '☀️ Light', value: 'light' },
            { label: '🔄 Auto', value: 'auto' }
          ]}
          initialIndex={settings.theme === 'dark' ? 0 : settings.theme === 'light' ? 1 : 2}
          onSelect={item => onUpdateSettings({ ...settings, theme: item.value as SettingsType['theme'] })}
        />
      </Box>

      <Box marginBottom={1}>
        <Text>Enable Animations: </Text>
        <Text color={settings.enableAnimations ? 'green' : 'red'}>
          {settings.enableAnimations ? '✓ Enabled' : '✗ Disabled'}
        </Text>
        <Text dimColor> (Press Enter to toggle)</Text>
      </Box>

      <Box>
        <Text>Enable Sounds: </Text>
        <Text color={settings.enableSounds ? 'green' : 'red'}>
          {settings.enableSounds ? '✓ Enabled' : '✗ Disabled'}
        </Text>
        <Text dimColor> (Press Enter to toggle)</Text>
      </Box>
    </Box>
  );

  const renderBehaviorSettings = () => (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>Show Notifications: </Text>
        <Text color={settings.showNotifications ? 'green' : 'red'}>
          {settings.showNotifications ? '✓ Enabled' : '✗ Disabled'}
        </Text>
      </Box>

      <Box>
        <Text>Max Tasks: </Text>
        {editMode === 'editing' && editingField === 'maxTasks' ? (
          <TextInput
            value={tempValue}
            onChange={setTempValue}
            onSubmit={() => handleSave('maxTasks')}
          />
        ) : (
          <>
            <Text color="cyan">{settings.maxTasks}</Text>
            <Text dimColor> (Press Enter to edit)</Text>
          </>
        )}
      </Box>
    </Box>
  );

  const renderPerformanceSettings = () => (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>Auto Refresh: </Text>
        <Text color={settings.autoRefresh ? 'green' : 'red'}>
          {settings.autoRefresh ? '✓ Enabled' : '✗ Disabled'}
        </Text>
      </Box>

      <Box>
        <Text>Refresh Interval: </Text>
        {editMode === 'editing' && editingField === 'refreshInterval' ? (
          <TextInput
            value={tempValue}
            onChange={setTempValue}
            onSubmit={() => handleSave('refreshInterval')}
          />
        ) : (
          <>
            <Text color="cyan">{settings.refreshInterval / 1000}s</Text>
            <Text dimColor> (Press Enter to edit)</Text>
          </>
        )}
      </Box>
    </Box>
  );

  const renderDateTimeSettings = () => (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>Date Format: </Text>
        {editMode === 'editing' && editingField === 'dateFormat' ? (
          <TextInput
            value={tempValue}
            onChange={setTempValue}
            onSubmit={() => handleSave('dateFormat')}
          />
        ) : (
          <>
            <Text color="cyan">{settings.dateFormat}</Text>
            <Text dimColor> (Press Enter to edit)</Text>
          </>
        )}
      </Box>

      <Box>
        <Text>Time Format: </Text>
        <SelectInput
          items={[
            { label: '12-hour (AM/PM)', value: '12h' },
            { label: '24-hour', value: '24h' }
          ]}
          initialIndex={settings.timeFormat === '12h' ? 0 : 1}
          onSelect={item => onUpdateSettings({ ...settings, timeFormat: item.value as SettingsType['timeFormat'] })}
        />
      </Box>
    </Box>
  );

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Gradient name="retro">
          <Text bold>⚙️ Settings & Configuration</Text>
        </Gradient>
      </Box>

      <Box flexDirection="row" marginBottom={1}>
        <Box width="30%" paddingRight={1}>
          <Box borderStyle="round" borderColor="cyan" padding={1}>
            <Box flexDirection="column">
              <Text bold color="cyan">Categories</Text>
              <Text dimColor>─────────────</Text>
              
              <SelectInput
                items={categoryItems}
                initialIndex={categoryItems.findIndex(i => i.value === category)}
                onSelect={item => setCategory(item.value as SettingCategory)}
              />
              
              <Box marginTop={1}>
                <Text dimColor>Press 1-4 to jump</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box width="70%" paddingLeft={1}>
          <Box borderStyle="round" borderColor="yellow" padding={1}>
            <Box flexDirection="column">
              <Text bold color="yellow">
                {category === 'appearance' && '🎨 Appearance Settings'}
                {category === 'behavior' && '⚡ Behavior Settings'}
                {category === 'performance' && '🚀 Performance Settings'}
                {category === 'datetime' && '🕐 Date & Time Settings'}
              </Text>
              <Text dimColor>───────────────────────</Text>
              
              <Box marginTop={1}>
                {category === 'appearance' && renderAppearanceSettings()}
                {category === 'behavior' && renderBehaviorSettings()}
                {category === 'performance' && renderPerformanceSettings()}
                {category === 'datetime' && renderDateTimeSettings()}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box borderStyle="single" borderColor="gray" padding={1}>
        <Box flexDirection="column">
          <Text bold color="green">Current Configuration</Text>
          <Text dimColor>──────────────────────</Text>
          
          <Box marginTop={1} flexDirection="row" flexWrap="wrap">
            <Box width="50%">
              <Text dimColor>Theme: </Text>
              <Text color="cyan">{settings.theme}</Text>
            </Box>
            <Box width="50%">
              <Text dimColor>Animations: </Text>
              <Text color={settings.enableAnimations ? 'green' : 'red'}>
                {settings.enableAnimations ? 'On' : 'Off'}
              </Text>
            </Box>
            <Box width="50%">
              <Text dimColor>Notifications: </Text>
              <Text color={settings.showNotifications ? 'green' : 'red'}>
                {settings.showNotifications ? 'On' : 'Off'}
              </Text>
            </Box>
            <Box width="50%">
              <Text dimColor>Auto Refresh: </Text>
              <Text color={settings.autoRefresh ? 'green' : 'red'}>
                {settings.autoRefresh ? `${settings.refreshInterval/1000}s` : 'Off'}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>
          Use Enter to toggle/edit settings | Arrow keys to navigate | Esc to cancel
        </Text>
      </Box>
    </Box>
  );
};

export default Settings;