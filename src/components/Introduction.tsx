import React from 'react';
import sample from '../assets/sample.png'
import sample2 from '../assets/sample2.png'
import sample3 from '../assets/sample3.png'
import demoVideoV2 from '../assets/demoVideoV2.mp4'

const Introduction: React.FC = () => {
    return (
        <div className='Landing-div-wrapper'>
            <video className='video-size' controls>
                <source src={demoVideoV2} type="video/mp4" />
            </video>
        </div>
    )
}

export default Introduction;