import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div>
      <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
      <p className='text'>It might take a few seconds.</p>
    </div>
  )
}

export default Loading