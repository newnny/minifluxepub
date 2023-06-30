import React from 'react';
import '../App.css';
import StickyButton from '../utils/StickyButton';
import ePubIcon from '../icons/pub-file-format-symbol.svg'
import rssIcon from '../icons/rss-svgrepo.svg'
import breakicon from '../icons/break-svgrepo.svg'

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
        Make e-pub files from your Miniflux
      </p>

      <div className='main-features-div-wrap'>
        <div className='main-features-div' style={{ padding: 10 }}>
          <div>
            <img src={ePubIcon} className='main-feautres-icons' alt='ePubIcon' />
          </div>
          <div>
            <p className='main-text'>
              <b>E-pub file binding</b>
            </p>
            <p className='fontSize-18'>
              Miniflux binder allows you to combine feeds using the Miniflux API. This feature enables you to manage and organize your e-books conveniently.
            </p>
          </div>
        </div>
        <div className='main-features-div' style={{ paddingTop: 10, paddingBottom: 10 }}>
          <div>
            <img src={rssIcon} className='main-feautres-icons' alt='rssIcon' />
          </div>
          <div>
            <p className='main-text'>
              <b>Simplified process of consuming RSS feeds</b>
            </p>
            <p className='fontSize-18'>
              The miniflux binder offers a simplified process for consuming feeds on e-book readers and provides unparalleled convenience, making it easier for users to access and read their favorite RSS feeds.
            </p>
          </div>
        </div>
        <div className='main-features-div' style={{ padding: 10 }}>
          <div>
            <img src={breakicon} className='main-feautres-icons' alt='breakicon' />
          </div>
          <div>
            <p className='main-text'>
              <b>Enhance your offline reading experience</b>
            </p>
            <p className='fontSize-18'>
              The miniflux binder promises a better way to enjoy RSS feeds whenever, where ever you go.
            </p>
          </div>
        </div>
      </div>

      <div className='main-Btn-group'>
        <div className='display-row'>
          <button
            type='button'
            className='main-Btn'
            style={{ backgroundColor: '#CEE1F2' }}
            onClick={scrollToIntroduction}
          >
            Demo
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
