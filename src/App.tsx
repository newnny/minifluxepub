import React, { Fragment, useRef } from 'react';
import './App.css';
import { Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Introduction from './components/Introduction';
import Start from './components/Start';
import UserPage from './components/UserPage';

const App: React.FC = () => {
  const introductionRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  const scrollToIntroduction = () => {
    introductionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToStart = () => {
    startRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <p>xx</p>
   /*<Routes>
      <Route path="/" element={<Main scrollToIntroduction={scrollToIntroduction} scrollToStart={scrollToStart} />} />
      <Route path="/intro">
        <Fragment>
          <div id='introduction' ref={introductionRef}>
            <Introduction />
          </div>
        </Fragment>
      </Route>
      <Route path="/get-started">
        <Fragment>
          <div id='start' ref={startRef}>
            <Start />
          </div>
        </Fragment>
      </Route>
      <Route path="/user">
        <UserPage />
      </Route>
    </Routes >
    */
  );
}

export default App;
