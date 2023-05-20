import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import HomeIcon from '../icons/home-svgrepo-com.svg'
import SettingIcon from '../icons/modify-svgrepo-com.svg'
import StickyButton from '../utils/StickyButton';
import { GlobalContext } from './Context';
import { FetchFormattedCategory } from '../apifunction/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/Loading';
import CheckBox from '../utils/CheckBox';
interface categoryType {
    categoryId: number;
    categoryTitle: string;
    total: number;
}

const UserPage: React.FC = () => {
    const [categories, setCategories] = useState<categoryType[]>([])
    const [showDateFilter, setShowDateFilter] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<number | undefined>(7)
    const [selectedCategories, setSelectedCategories] = useState<categoryType[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>()

    const { state, dispatch } = useContext(GlobalContext)
    const { formattedCategoryState, tokenState, urlState } = state

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (formattedCategoryState && formattedCategoryState.formattedCategories && formattedCategoryState.formattedCategories.length > 0) {
            const data = formattedCategoryState.formattedCategories
            setCategories(data)
        }
    }, [formattedCategoryState])

    const handleChangeDate = async (e: React.SyntheticEvent, days?: number | undefined) => {
        e.preventDefault();
        const userToken = tokenState.userToken
        const userUrl = urlState.userUrl
        setSelectedDate(days)
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
    }

    const handleSelectCategory = async (id: number, value: categoryType) => {
        
        if (selectedCategories.length > 0 && selectedCategories.map(c => c.categoryId).includes(id)) {
            if (selectedCategories.filter(c => c.categoryId !== id)) {
                const arr: categoryType[] = selectedCategories.filter(c => c.categoryId !== id)
                //if the clicked Id is not in the selectedCategory array, then it will be pushed to the array and the checkbox will be checked..
                //if the clicked Id is already in the selectedCategory array, then it will undo/uncheck the checkbox.
                setSelectedCategories(arr)
            }
        } else {
            selectedCategories.push(value)
            const check:boolean = categories.map(c => c.categoryId === id) ? true: false
            setIsChecked(check)
        }
        setSelectedCategoryId(id)
    }

    useEffect(() => {
        setIsChecked(false)
    }, [])

    useEffect(() => {
        if (selectedCategoryId && categories.length > 0) {
            if (categories.find(c => c.categoryId === selectedCategoryId)) {
                return setIsChecked(false)
            } else {
                return setIsChecked(true)
            }
        } else {
            return;
        }
    }, [selectedCategoryId])

    console.log(isChecked, "isChecked?")
    console.log(selectedCategoryId, "selectedCategoryId")


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
                <div className='userPage-date-Btn-group'>
                    <button
                        className={selectedDate === 7 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                        onClick={(e) => handleChangeDate(e, 7)}
                    >
                        Last 1W
                    </button>
                    <button
                        className={selectedDate === 14 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                        onClick={(e) => handleChangeDate(e, 14)}
                    >
                        Last 2W
                    </button>
                    <button
                        className={selectedDate === 31 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                        onClick={(e) => handleChangeDate(e, 31)}
                    >
                        Last 1M
                    </button>
                    <button
                        className={selectedDate === 180 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                        onClick={(e) => handleChangeDate(e, 180)}
                    >
                        Last 6M
                    </button>
                    <button
                        className={selectedDate === 180 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                        onClick={(e) => handleChangeDate(e, 180)}
                    >
                        Last 6M
                    </button>
                    <button
                        className={selectedDate === undefined ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                        onClick={(e) => handleChangeDate(e, undefined)}
                    >
                        All time periods
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
                    <div className='userPage-date-Btn-group'>
                        <button
                            className={selectedDate === 7 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                            onClick={(e) => handleChangeDate(e, 7)}
                        >
                            Last 1W
                        </button>
                        <button
                            className={selectedDate === 14 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                            onClick={(e) => handleChangeDate(e, 14)}
                        >
                            Last 2W
                        </button>
                        <button
                            className={selectedDate === 31 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                            onClick={(e) => handleChangeDate(e, 31)}
                        >
                            Last 1M
                        </button>
                        <button
                            className={selectedDate === 180 ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                            onClick={(e) => handleChangeDate(e, 180)}
                        >
                            Last 6M
                        </button>
                        <button
                            className={selectedDate === undefined ? 'userPage-selected-date-Btn' : 'userPage-date-Btn'}
                            onClick={(e) => handleChangeDate(e, undefined)}
                        >
                            All time periods
                        </button>
                    </div>
                </div>
                <div className='userPage-middle-section'>
                    {loading ?
                        <Loading /> :
                        <div className='userPage-category-group'>
                            {categories && categories.length > 0 &&
                                categories.map((category, index) =>
                                    <div key={category.categoryId} className='userPage-category-item'>
                                        <CheckBox
                                            isChecked={isChecked}
                                            label={`${category.categoryTitle} (${category.total})`}
                                            onChange={() => handleSelectCategory(category.categoryId, category)}
                                            id={category.categoryId}
                                            value={category}
                                        />
                                    </div>
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