import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AllJobsPage from './components/AllJobsPage/AllJobsPage';
import JobDetailsPage from './components/JobDetailsPage/JobDetailsPage';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/jobs' element={<AllJobsPage />}></Route>
      <Route path='/jobs/:id' element={<JobDetailsPage />}></Route>
    </Routes>
  );
}

export default App;
