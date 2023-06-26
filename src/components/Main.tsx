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

  const handleClickTargetPage = (event: React.SyntheticEvent, target?: string) => {
    if (target === "intro") {
      scrollToIntroduction()
    } else if (target === "start") {
      scrollToStart()
    }
  }

  return (
    <div className='main'>
      <p className='main-bold'>
        Make e-pub files from your Miniflux list
      </p>
      <p className='main-text '>
        and bring it with you<br />
        whenever, where ever you go
      </p>

      <div className='main-Btn-group'>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            type='button'
            className='main-Btn'
            style={{ backgroundColor: '#CEE1F2' }}
            onClick={scrollToIntroduction}
          >
            Introduction
          </button>
          <a className="a-no-deco" href="https://www.surveymonkey.de/r/LSLCJPQ" target="_blank" rel="noreferrer">
            <button
              type='button'
              className='main-Btn'
              style={{ backgroundColor: '#CEE1F2' }}
            >
              Feedback
            </button>
          </a>
        </div>
        <button
          type='button'
          className='main-Btn'
          style={{ backgroundColor: '#FEB159' }}
          onClick={event => handleClickTargetPage(event, "start")}
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
