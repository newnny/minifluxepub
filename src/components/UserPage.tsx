import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import HomeIcon from '../icons/home-svgrepo-com.svg'
import SettingIcon from '../icons/modify-svgrepo-com.svg'
import StickyButton from '../utils/StickyButton';
import { GlobalContext } from './Context';
import { FetchFormattedCategory } from '../apifunction/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/Loading';

interface categoryType {
    categoryId: number;
    categoryTitle: string;
    total: number;
}

const UserPage: React.FC = () => {
    const [datePeriod, setDatePeriod] = useState<string>("")
    const [categories, setCategories] = useState<categoryType[]>([])
    const [showDateFilter, setShowDateFilter] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { state, dispatch } = useContext(GlobalContext)
    const { formattedCategoryState, tokenState, urlState } = state

    const navigate = useNavigate()

    useEffect(() => {
        if (formattedCategoryState && formattedCategoryState.formattedCategories && formattedCategoryState.formattedCategories.length > 0) {
            const data = formattedCategoryState.formattedCategories
            setCategories(data)
        }
    }, [formattedCategoryState])

    const handleChangeDate = async (e: React.SyntheticEvent, days?: number) => {
        e.preventDefault();
        const userToken = tokenState.userToken
        const userUrl = urlState.userUrl
        if (days) {
            try {
                setLoading(true);
                const result = await FetchFormattedCategory(days, userToken, userUrl)
                if (result) {
                    await dispatch({ type: 'GET_FORMATTED_CATEGORY', payload: result })
                }
            } catch (error) {
                console.error('Something went wrong while dispatch the data');
            } finally {
                setLoading(false);
            }
        } else {
            setErrorMessage("Something went wrong")
        }
    }
    const handleOpenFeeds = async (e: React.SyntheticEvent, id: number) => {
        console.log("clicked")
    }

    const handleConvertFiles = () => {
        console.log("converting")
    }

    const dateField = () => {
        return (
            <div className='userPage-menu-dateField'>
                <p style={{ fontSize: 16 }}>
                    <b style={{ fontSize: 20 }}>Date filter</b>
                    <br />
                    Kindly choose one of the provided date periods.
                    <br />
                    This action will automatically update the data from today's date to the period you select.
                </p>
                {/*<div style={{ display: "flex" }}>
                    <input
                        value={datePeriod}
                        onChange={e => setDatePeriod(e.target.value)}
                        type="text"
                        placeholder="dd/mm/yyyy"
                        name="start-date"
                        className='date-input'
                    />
        </div>*/}
                <div className='userPage-date-Btn-group'>
                    <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 7)}>
                        Last 1W
                    </button>
                    <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 14)}>
                        Last 2W
                    </button>
                    <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 30)}>
                        Last 1M
                    </button>
                    <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 180)}>
                        Last 6M
                    </button>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className='userPage-menu-div'>
                <button style={{ border: "none", backgroundColor: "inherit", cursor: "pointer" }} onClick={() => navigate(`/`)}>
                    <img
                        src={HomeIcon}
                        className='userPage-icon'
                    />
                </button>
                <button className='userPage-setting' onClick={() => setShowDateFilter(!showDateFilter)}>
                    <img
                        src={SettingIcon}
                        className='userPage-icon'
                    />
                </button>
                {showDateFilter && dateField()}

            </div>
            <div className='userPage-div'>
                <div className='userPage-left-section'>
                    <p style={{ fontSize: 16 }}>
                        <b style={{ fontSize: 20 }}>Date filter</b>
                        <br />
                        Kindly choose one of the provided date periods.
                        <br />
                        This action will automatically update the data from today's date to the period you select.
                    </p>
                    {/*<div style={{ display: "flex" }}>
                        <input
                            value={datePeriod}
                            onChange={e => setDatePeriod(e.target.value)}
                            type="text"
                            placeholder="dd/mm/yyyy"
                            name="start-date"
                            className='date-input'
                        />
    </div>*/}
                    <div className='userPage-date-Btn-group'>
                        <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 7)}>
                            Last 1W
                        </button>
                        <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 14)}>
                            Last 2W
                        </button>
                        <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 30)}>
                            Last 1M
                        </button>
                        <button className='userPage-date-Btn' onClick={(e) => handleChangeDate(e, 180)}>
                            Last 6M
                        </button>
                    </div>
                </div>
                <div className='userPage-middle-section'>
                    {loading ?
                        <Loading /> :
                        <div className='userPage-category-Btn-group'>
                            {categories && categories.length > 0 &&
                                categories.map((category, index) =>
                                    <button
                                        className='userPage-category-Btn'
                                        key={index}
                                        onClick={e => handleOpenFeeds(e, category.categoryId)}
                                    >
                                        {`${category.categoryTitle} (${category.total})`}

                                    </button>
                                )
                            }
                        </div>
                    }
                </div>
                <div className='userPage-right-section'>
                </div>
                <StickyButton
                    onClick={handleConvertFiles}
                    buttonText={"Make E-pub files"}
                />
            </div>

        </>

    )
}

export default UserPage;