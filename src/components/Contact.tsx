
import SendIcon from '../icons/send-svgrepo-com.svg'
const Contact: React.FC = () => {
  <button>

  </button>
  return (
    <div className='Landing-div-wrapper'>
      <p style={{fontSize: 18}}>
        We kindly request you to share your valuable opinions or any inquiries with us here.
      </p>

      <a className="a-no-deco" href="mailto:newnny0812@gmail.com" target="_blank" rel="noreferrer">
        <img
          src={SendIcon}
          className='contact-send-icon'
        />
      </a>
    </div>
  )
}

export default Contact