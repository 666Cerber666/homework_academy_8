import React from 'react';
import './App.css'; // Импорт стилей
import UserManagement from './components/UserManagement';
import TaskManager from './components/TaskManager';
import WSChat from './components/WSChat';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Homework</h1>
      <div className="component-container">
        <UserManagement />
      </div>
      <div className="component-container">
        <TaskManager />
      </div>
      <div className="component-container">
        <WSChat />
      </div>
    </div>
  );
};

export default App;
