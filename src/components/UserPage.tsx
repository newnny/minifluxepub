import React, { useState } from 'react';
import StickyButton from '../utils/StickyButton';
import { fetchFeeds } from '../apifunction/api';

const UserPage: React.FC = () => {
    const [list, setList] = useState()

    const handleConvertFiles = () => {
        console.log("converting")
    }

    return (
        <>
            <div>
                Loading
            </div>
            <div>
                <div>
                    filter option
                    date
                </div>
                <div>
                    list
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