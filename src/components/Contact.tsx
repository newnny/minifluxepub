
import SendIcon from '../icons/send-svgrepo-com.svg'
import Giveicon from '../icons/network-svgrepo-com.svg'

const Contact: React.FC = () => {
  return (
    <div className='Landing-div-wrapper'>
      <div className='contact-div'>
        <div style={{ padding: 30 }}>
          <p style={{ fontSize: 18, height: 80 }}>
            Please take a moment to share your valuable opinions of 'Minifluxbinder' with us.<br />
            Clicking the icon below will redirect you to our survey page
          </p>
          <a className="a-no-deco" href="https://www.surveymonkey.de/r/LSLCJPQ" target="_blank" rel="noreferrer">
            <img
              src={Giveicon}
              className='contact-send-icon'
            />
          </a>
        </div>
        <div style={{ padding: 30 }}>
          <p style={{ fontSize: 18, height: 80 }}>
            Beyond the survey, if you have any inquiries, we kindly ask you to share them with us by email.
          </p>
          <a className="a-no-deco" href="mailto:newnny0812@gmail.com" target="_blank" rel="noreferrer">
            <img
              src={SendIcon}
              className='contact-send-icon'
            />
          </a>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 18, paddingTop: 30 }}>
          Thank you for being a part of our journey towards service excellence!
        </p>
      </div>
    </div>
  )
}

export default Contact