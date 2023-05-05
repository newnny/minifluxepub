import React, { useState } from 'react';
import StickyButton from '../utils/StickyButton';

const UserPage: React.FC = () => {
    const [list, setList] = useState()

    const handleConvertFiles = () => {
        console.log("converting")
    }

    return (
        <>
            <div>
                filter option
            </div>
            <div>
                list
            </div>
            <StickyButton
                onClick={handleConvertFiles}
                buttonText={"Make E-pub files"}
            />
        </>

    )
}

export default UserPage;