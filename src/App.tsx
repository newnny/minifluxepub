import React, { useRef } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SinglePageMain from './components/SinglePageMain';
import Introduction from './components/Introduction';
import Start from './components/Start';
import UserPage from './components/UserPage';
import Contact from './components/Contact';

const App: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const introductionRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  return (
    <div className='App'>
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
        <Route path="/contact"
          element={
            <div id="contact" ref={contactRef}>
              <Contact />
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App;
