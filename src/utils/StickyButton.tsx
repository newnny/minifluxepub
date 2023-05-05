import React from 'react';
import './StickyButton.css';

interface StickyButtonProps {
    onClick: () => void;
    buttonText: string
}

const StickyButton: React.FC<StickyButtonProps> = ({
    onClick,
    buttonText
}) => {
    return (
        <button className='StickyButton' onClick={onClick}>
            {buttonText}
        </button>
    )
}

export default StickyButton