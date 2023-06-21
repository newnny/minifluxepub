import React, { Fragment } from 'react'
import './ModalStyle.css'

interface ModalProps {
  children: React.ReactNode
  onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClick
}) => {
  return (
    <div className='modal'>
      <div className="modal__inner">
        <label className="modal__close" onClick={onClick}/>
        <Fragment>
        {children}
        </Fragment>
      </div>
    </div>
  )
}

export default Modal