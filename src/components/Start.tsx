import React, { useState } from 'react';
import QuestionMark from '../icons/question-mark.svg'
import LemonIcon from '../icons/lemon-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom';
import { fetchFeeds } from '../apifunction/api';


const Start: React.FC = () => {
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [userToken, setUserToken] = useState<string>("")
    const [userUrl, setUserUrl] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [userData, setUserData]= useState<[]>([])

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent, token?: string, url?:string) => {
        e.preventDefault();
        const userToken = token
        const userUrl = url
        if (userToken) {
            const response = await fetchFeeds(userToken, userUrl)
            setUserData(response)
        } else {
            setErrorMessage("Please check your API token and URL again.")
        }
    }

    console.log(userData, "userData")

    return (
        <div className='Landing-div-wrapper'>
            <p style={{ fontSize: 30, fontWeight: 'bold' }}>
                Please provide your Miniflux API token.
            </p>
            <input
                value={userToken}
                onChange={e => setUserToken(e.target.value)}
                type="text"
                placeholder="Your API token"
                name="munifux-token"
                style={{
                    borderRadius: 5,
                    border: "1px solid gray",
                    padding: 10,
                    width: 300,
                    fontSize: 16,
                    margin: 5
                }}
            />
            <input
                value={userUrl}
                onChange={e => setUserUrl(e.target.value)}
                type="text"
                placeholder="The URL of your Miniflux instance"
                name="munifux-url"
                style={{
                    borderRadius: 5,
                    border: "1px solid gray",
                    padding: 10,
                    width: 300,
                    fontSize: 16,
                    margin: 5
                }}
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button
                type='button'
                className='main-Btn'
                style={{ backgroundColor: '#FEB159', fontSize: 20, marginTop: 30 }}
                onClick={e => handleSubmit(e, userToken, userUrl)}
            >
                Let’s take your data!
            </button>
            <button
                onClick={() => setShowExplanation(!showExplanation)}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'inherit',
                    padding: 10,
                    fontSize: 16
                }}
            >
                <img
                    src={QuestionMark}
                    style={{ width: 20, height: 20, paddingRight: 5 }}
                />
                <p style={{ color: 'grey', fontWeight: 'bold' }}>
                    what is the API token and where can I get it?
                </p>
            </button>
            {
                showExplanation &&
                <p style={{ margin: 0, lineHeight: 1.5, color: 'grey' }}>
                    We need your Minifux API token in order to synchronise our software with your Minifux list.<br />
                    You can find your API token following these stpes.<br />
                    <b>got to “Settings &gt; API Keys &gt; Create a new API key”</b><br />
                    then copy it and past it here. <br />
                    easy peasy lemon squeezy!
                    <img
                        src={LemonIcon}
                        style={{ width: 20, height: 20, paddingLeft: 5 }}
                    />
                </p>
            }
        </div>
    )
}

export default Start;