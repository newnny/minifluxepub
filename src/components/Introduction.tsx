import React from 'react';
import sample from '../assets/sample.png'
import sample2 from '../assets/sample2.png'
import sample3 from '../assets/sample3.png'
import demoVideo from '../assets/demoVideo.mp4'

const Introduction: React.FC = () => {
    return (
        <div className='Landing-div-wrapper'>
            <div className='introduction-divided-page'>
                <div style={{border: "2px dotted orange", padding: 10}}>
                    <video className='video-size' controls>
                        <source src={demoVideo} type="video/mp4" />
                    </video>
                </div>
                <div style={{padding: 10}}>
                    After following the instruction video, you can see the generated e-pub files like this.<br /><br />
                    <img style={{ width: 300 }} src={sample} alt="sample" /><br />
                    <img style={{ width: 300, paddingRight: 10 }} src={sample2} alt="sample2" />
                    <img style={{ width: 300 }} src={sample3} alt="sample3" />
                </div>
            </div>
        </div>
    )
}

export default Introduction;