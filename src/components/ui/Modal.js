import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../actions/ui';

export const Modal = ({ children }) => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    return (
        <div className='modal'>
            <div className='modal__body animate__animated animate__zoomIn'>
                { children }
                <span className="material-icons modal__close" onClick={ handleCloseModal }>
                    close
                </span>
            </div>     
        </div>
    )
}
