import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import HomeIcon from '../icons/home-svgrepo-com.svg'
import SettingIcon from '../icons/modify-svgrepo-com.svg'
import StickyButton from '../utils/StickyButton';
import { GlobalContext } from './Context';
import { FetchFormattedCategory, FetchEpubFiles } from '../apifunction/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/Loading';
import CheckBox from '../utils/CheckBox';
interface entriesType {
    entryId: number;
    title: string;
    author: string;
    content: string;
}
interface categoryType {
    categoryId: number;
    categoryTitle: string;
    total: number;
    entryId: number[];
    entries: entriesType[];
    checked: boolean;
}

interface epubContent {
    title: string;
    author: string;
    content: string;
}
interface contentRes {
    title: string,
    author: string,
    content: epubContent[]
}

const UserPage: React.FC = () => {
    const [categories, setCategories] = useState<categoryType[]>([])
    const [showDateFilter, setShowDateFilter] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<number | undefined>(7)
    const [selectedCategories, setSelectedCategories] = useState<categoryType[]>([])
    const [contents, setContents] = useState<contentRes>({
        title: '',
        author: '',
        content: []
    })

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

    const handleSelectCategory = async (event: React.ChangeEvent<HTMLInputElement>, value: categoryType) => {
        event.preventDefault();
        //if it's included then return 0, if not return -1
        const idx = selectedCategories.map(e => e).indexOf(value);
        //slice: returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included)
        if (idx > -1) {
            setSelectedCategories([
                ...selectedCategories.slice(0, idx),
                ...selectedCategories.slice(idx + 1)
            ]);
        } else {
            setSelectedCategories([...selectedCategories, ...[value]]);
        }
    }

    useEffect(() => {
        const options = {
            title: selectedCategories.length === 1 ? selectedCategories[0].categoryTitle : selectedCategories.flatMap(s => s.categoryTitle).join(', '),
            author: 'E-pub binder',
            content: selectedCategories.length > 0 ? selectedCategories.flatMap(select => select.entries).map(entry => ({
                //I have to use flatMap() to flatten the nested arrya
                //otherwise it ends up this format: entriesType[][]
                title: entry.title,
                author: entry.author ? entry.author : "",
                content: entry.content
            })) : []
        };
        setContents(options)
    }, [selectedCategories])

    const handleConvertFiles = async () => {
        const result = contents.content.length > 0 && await FetchEpubFiles(contents)
        if (result) {
            const url = window.URL.createObjectURL(new Blob([result], { type: "application/epub+zip" }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${contents.title}.epub`);
            document.body.appendChild(link);
            link.click();
        }
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
                            <button
                                className='userPage-reset-Btn'
                                onClick={e => setSelectedCategories([])}
                            >
                                Reset
                            </button>
                            {categories && categories.length > 0 &&
                                categories.map((category, index) =>
                                    <div key={category.categoryId} className='userPage-category-item'>
                                        <CheckBox
                                            isChecked={selectedCategories.map(c => c.categoryId).includes(category.categoryId) && !category.checked}
                                            label={`${category.categoryTitle} (${category.total})`}
                                            onChange={(event) => handleSelectCategory(event, category)}
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