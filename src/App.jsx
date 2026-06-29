import '@fontsource/poppins';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TaskDetailPage from './pages/TaskDetailPage/TaskDetailPage';
import Notification from './components/Notification/Notification';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
      </Routes>

      {/* Global toast — rendered outside routes so it persists across navigation */}
      <Notification />
    </div>
  );
}

export default App;
