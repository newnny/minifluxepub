import React from 'react';
import '../App.css';
import StickyButton from '../utils/StickyButton';

interface MainProps {
  scrollToIntroduction: () => void;
  scrollToStart: () => void;
}

const Main: React.FC<MainProps> = ({
  scrollToIntroduction,
  scrollToStart
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='main'>
      <p className='main-bold'>
        Make e-pub files from your Minifux list
      </p>
      <p className='main-text '>
        and bring it with you<br />
        whenever, where ever you go
      </p>

      <div className='main-Btn-group'>
        <button
          type='button'
          className='main-Btn'
          style={{ backgroundColor: '#CEE1F2' }}
          onClick={scrollToIntroduction}
        >
          Introduction
        </button>
        <button
          type='button'
          className='main-Btn'
          style={{ backgroundColor: '#FEB159' }}
          onClick={scrollToStart}
        >
          Let’s get started!
        </button>
      </div>
      <StickyButton
        onClick={scrollToTop}
        buttonText={"Scroll up"}
      />
    </div>
  );
}

export default Main;
