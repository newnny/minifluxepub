import React, { useState, useContext, useEffect } from 'react';
import QuestionMark from '../icons/question-mark.svg'
import LemonIcon from '../icons/lemon-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom';
import { FetchFormattedCategory } from '../apifunction/api';
import { GlobalContext } from './Context';
import '../App.css';
import Loading from '../utils/Loading';

const Start: React.FC = () => {
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [enteredUserToken, setEnteredUserToken] = useState<string>("")
    const [userToken, setUserToken] = useState<string>("")
    const [userUrl, setUserUrl] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const { dispatch } = useContext(GlobalContext)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('userToken') || ""
        setEnteredUserToken(token.replace(/^"|"$/g, ''))
    }, [])

    useEffect(() => {
        if (enteredUserToken) {
            setUserToken(enteredUserToken)
        }
    }, [enteredUserToken])

    const handleSubmit = async (e: React.SyntheticEvent, token?: string, url?: string | undefined) => {
        e.preventDefault();
        const userToken = token
        const userUrl = url
        if (userToken) {
            try {
                setLoading(true);
                await dispatch({ type: 'SET_TOKEN', payload: userToken })
                await localStorage.setItem('userToken', JSON.stringify(userToken));
                await dispatch({ type: 'SET_USER_URL', payload: userUrl })
                await localStorage.setItem('userURL', JSON.stringify(userUrl));
                const result = await FetchFormattedCategory(7, userToken, userUrl)
                if (result) {
                    await localStorage.setItem('formattedCategories', JSON.stringify(result))
                    await dispatch({ type: 'GET_FORMATTED_CATEGORY', payload: result })
                    await navigate(`/user`)
                }
            } catch (error) {
                console.error('Something went wrong while dispatch the data');
            } finally {
                setLoading(false);
            }
        } else {
            setErrorMessage("Please check your API token and URL again.")
        }
    }

    return (
        <>
            {loading ?
                <div className='Landing-div-wrapper'>
                    <Loading />
                </div> :
                <div className='Landing-div-wrapper'>

                    <p className='start-bold'>
                        Please provide your Miniflux API token.
                    </p>
                    <input
                        value={userToken}
                        onChange={e => setUserToken(e.target.value)}
                        type="text"
                        placeholder="Your API token"
                        name="munifux-token"
                        className='user-input'
                    />
                    <input
                        value={userUrl}
                        onChange={e => setUserUrl(e.target.value)}
                        type="text"
                        placeholder="The URL of your Miniflux instance if needed"
                        name="munifux-url"
                        className='user-input'
                    />
                    {errorMessage &&
                        <p className='error-msg'>{errorMessage}</p>
                    }
                    <button
                        type='button'
                        className='submit-Btn'
                        onClick={e => handleSubmit(e, userToken, userUrl)}
                    >
                        Let’s take your data!
                    </button>
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className='info-Btn'
                    >
                        <img
                            src={QuestionMark}
                            className='question-mark'
                            alt='QuestionMark'
                        />
                        <p className='bold-grey'>
                            what is the API token and where can I get it?
                        </p>
                    </button>
                    {
                        showExplanation &&
                        <p className='explanation'>
                            We need your Miniflux API token in order to synchronise our software with your Miniflux list.<br />
                            You can find your API token following these stpes.<br />
                            got to your Miniflux <b>“Settings &gt; API Keys &gt; Create a new API key”</b><br />
                            then copy it and past it here. <br />
                            easy peasy lemon squeezy!
                            <img
                                src={LemonIcon}
                                className='lemon-icon'
                                alt='LemonIcon'
                            />
                        </p>
                    }
                </div>
            }
        </>
    )
}

export default Start;