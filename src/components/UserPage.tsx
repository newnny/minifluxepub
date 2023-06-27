import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import HomeIcon from '../icons/home-svgrepo-com.svg'
import SettingIcon from '../icons/modify-svgrepo-com.svg'
import StickyButton from '../utils/StickyButton';
import Warning from '../icons/warning.svg'
import { GlobalContext } from './Context';
import { FetchFormattedCategory, FetchEpubFiles } from '../apifunction/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/Loading';
import CheckBox from '../utils/CheckBox';
import Modal from '../utils/Modal';
import SpinnerLoading from '../utils/SpinnerLoading';
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

const getTodayDate = () => {
    let tempDate = new Date();
    var dd = (tempDate.getDate() < 10 ? '0' : '') + tempDate.getDate()
    var MM = ((tempDate.getMonth() + 1) < 10 ? '0' : '') + (tempDate.getMonth() + 1)
    var yyyy = tempDate.getFullYear()
    let date = dd + "/" + MM + "/" + yyyy
    return date;
}

const UserPage: React.FC = () => {
    const [categories, setCategories] = useState<categoryType[]>([])
    const [showDateFilter, setShowDateFilter] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [fileLoading, setFileLoading] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<number | undefined>(7)
    const [selectedCategories, setSelectedCategories] = useState<categoryType[]>([])
    const [contents, setContents] = useState<contentRes>({
        title: '',
        author: '',
        content: []
    })
    const [noContentData, setNoContentData] = useState<entriesType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)

    const { state, dispatch } = useContext(GlobalContext)
    const { formattedCategoryState, tokenState, urlState } = state
    const [userToken, setUserToken] = useState<string>(tokenState.userToken)
    const userUrl = urlState.userUrl

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('userToken') || "");
        if (token) {
            setUserToken(token.replace(/^"|"$/g, ''));
        }
    }, []);

    useEffect(() => {
        if (userToken) {
            const formattedCategories = JSON.parse(localStorage.getItem('formattedCategories') || "")
            setCategories(formattedCategories)
        }
    }, [formattedCategoryState.formattedCategories, userToken]);

    const handleChangeDate = async (e: React.SyntheticEvent, days?: number | undefined) => {
        e.preventDefault();
        setSelectedDate(days)
        try {
            setLoading(true);
            const result = await FetchFormattedCategory(days, userToken, userUrl)
            if (result) {
                await dispatch({ type: 'GET_FORMATTED_CATEGORY', payload: result })
                await localStorage.setItem('formattedCategories', JSON.stringify(result))
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
            content: []
        };
        setContents(options)

        const filteredOutContent = selectedCategories && selectedCategories.length > 0 ? selectedCategories.flatMap(c => c.entries).filter(e => e.content === "false") : []
        filteredOutContent && setNoContentData(filteredOutContent)
    }, [selectedCategories])

    const handleOpenModal = () => {
        setShowModal(!showModal)
    }

    const handleConvertFiles = async (filter: string | undefined) => {
        const ids: number[] = selectedCategories.map(c => c.categoryId)
        const request = { contents, userToken, userUrl, selectedDate, ids, filter }
        try {
            setFileLoading(true)
            const result = await FetchEpubFiles(request)
            if (result) {
                const url = window.URL.createObjectURL(new Blob([result], { type: "application/epub+zip" }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `[${getTodayDate()}] ${contents.title}.epub`);
                document.body.appendChild(link);
                link.click();
            }
        } finally {
            setFileLoading(false)
        }
    }

    const dateField = () => {
        return (
            <div className='userPage-modal-div'>
                <div className='userPage-modal-inner-div'>
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
                        alt='HomeIcon'
                    />
                </button>
                <button className='userPage-setting' onClick={() => setShowDateFilter(!showDateFilter)}>
                    <img
                        src={SettingIcon}
                        className='userPage-icon'
                        alt='SettingIcon'
                    />
                </button>
                {showDateFilter &&
                    <Modal
                        onClick={() => setShowDateFilter(!showDateFilter)}
                        children={dateField()}
                    />
                }

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
                <div className='userPage-middle-section'
                    style={{ display: showDateFilter ? "none" : undefined }}>
                    {loading ?
                        <Loading /> :
                        <div className='userPage-category-group'>
                            <button
                                className='userPage-reset-Btn'
                                onClick={() => setSelectedCategories([])}
                            >
                                Reset
                            </button>
                            {categories && categories.length > 0 &&
                                categories.map((category) =>
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
                    onClick={handleOpenModal}
                    buttonText={"Make E-pub files"}
                />
                {showModal && <Modal
                    onClick={() => setShowModal(!showModal)}
                    children={
                        <div>
                            {fileLoading ?
                                <div className='userPage-modal-loading-div'>
                                    <div className='userPage-modal-inner-spinner-div'>
                                        <SpinnerLoading />
                                        <p style={{textAlign: "center",}}>
                                            Your file is generating. <br />
                                            It might take a few seconds.
                                        </p>
                                    </div>
                                </div>
                                :
                                <div className='userPage-modal-div'>
                                    <div className='userPage-modal-inner-div'>
                                        <img src={Warning} className='userPage-icon' alt='Warning' />
                                        <p>
                                            You selected <b>{selectedCategories.flatMap(c => c.entries).length}</b> {selectedCategories.flatMap(c => c.entries).length > 1 ? `articles` : `article`}{selectedCategories.length === 1 ? ` from category of ${selectedCategories[0].categoryTitle}` : selectedCategories.length === 0 ? "" : ` from categories of ${selectedCategories.flatMap(s => s.categoryTitle).join(', ')}`}.
                                        </p>
                                        <p>
                                            Articles with <em style={{ textDecoration: "orange wavy underline" }}>less than 150 words of content will be skipped</em> for downloading from the selected category/categories.
                                        </p>
                                        <p>Total <b>{`${selectedCategories.flatMap(c => c.entries).length - noContentData.length}`}</b> article(s) will be downloaded.</p>
                                        <button
                                            className='userPage-modal-btn'
                                            onClick={() => handleConvertFiles("filtered")}
                                        >
                                            Generate a file
                                        </button>
                                    </div>

                                    <div className='userPage-modal-inner-div'>
                                        <p>
                                            If you wish to download all articles regardless of the content's length, please click here.
                                        </p>
                                        <button
                                            className='userPage-modal-btn'
                                            onClick={() => handleConvertFiles(undefined)}
                                        >
                                            Generate a file for all article
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                />}
            </div>
        </>

    )
}

export default UserPage;