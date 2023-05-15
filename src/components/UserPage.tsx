import React, { useContext, useState, useEffect } from 'react';
import StickyButton from '../utils/StickyButton';
import { GlobalContext } from './Context';
import { FetchEntries } from '../apifunction/api';

interface categoryType {
    title: string;
    user_id: number;
    id: number;
}

const UserPage: React.FC = () => {
    const [category, setCategory] = useState<categoryType[]>([])
    const [allEntries, setAllEntries]= useState<[]>([])
    const [showFeeds, setShowFeeds] = useState<boolean>(false)
    const { state } = useContext(GlobalContext)
    const { categoryState } = state
    const { tokenState, urlState } = state;
    const providedToken = tokenState.token;
    const providedUrl = urlState.userUrl;

    useEffect(() => {
        if (categoryState && categoryState.category && categoryState.category.length > 0) {
            const data = categoryState.category
            setCategory(data)
        }
    }, [categoryState])

    const handleOpenFeeds = async (e: React.SyntheticEvent, id: number) => {
        e.preventDefault();
        setShowFeeds(!showFeeds)
        const entries = await FetchEntries(providedToken, providedUrl, id)
        entries && entries.length> 0 && setAllEntries(entries)
        console.log(entries, "entries")

    }

    console.log(allEntries, "entries")

    const handleConvertFiles = () => {
        console.log("converting")
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", height: "100vh", padding: 10 }}>
                <div style={{ float: "left", width: "33.33%", padding: 10 }}>
                    <p>filter option</p>
                    <p>date</p>
                </div>
                <div style={{ float: "left", width: "33.33%", padding: 10 }}>
                    <div style={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
                        {category && category.length > 0 &&
                            category.map((item) =>
                                <button
                                    style={{ margin: 3, width: 300 }}
                                    key={item.id}
                                    onClick={e => handleOpenFeeds(e, item.id)}
                                >
                                    {item.title}
                                </button>

                            )
                        }
                    </div>
                </div>
                <div style={{ float: "left", width: "33.33%", padding: 10 }}>
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