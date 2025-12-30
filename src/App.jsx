import '@fontsource/poppins';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/700.css';
// import '@fontsource/poppins/700-italic.css';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TaskDetailPage from './pages/TaskDetailPage/TaskDetailPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;