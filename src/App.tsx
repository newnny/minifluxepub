import React, { useRef } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SinglePageMain from './components/SinglePageMain';
import Introduction from './components/Introduction';
import Start from './components/Start';
import UserPage from './components/UserPage';

const App: React.FC = () => {
  const introductionRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  return (
    <Routes>
      <Route path="/" element={<SinglePageMain />} />
      <Route path="/intro"
        element={
          <div id="introduction" ref={introductionRef}>
            <Introduction />
          </div>
        }
      />
      <Route path="/get-started"
        element={
          <div id="start" ref={startRef}>
            <Start />
          </div>
        }
      />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  )
}

export default App;
