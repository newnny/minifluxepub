import React, { useRef, useEffect } from 'react';

import Main from './Main';
import Introduction from './Introduction';
import Start from './Start';

const SinglePageMain: React.FC = () => {
  const introductionRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  const scrollToIntroduction = () => {
    introductionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToStart = () => {
    startRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Main scrollToIntroduction={scrollToIntroduction} scrollToStart={scrollToStart} />
      <div id="introduction" ref={introductionRef}>
        <Introduction />
      </div>
      <div id="start" ref={startRef}>
        <Start />
      </div>
    </div>
  )
}

export default SinglePageMain;