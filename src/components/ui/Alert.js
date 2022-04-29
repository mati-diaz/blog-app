import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { closeAlert } from '../../actions/ui';

export const Alert = () => {
    const { type, msg } = useSelector(state => state.ui.alert);

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(closeAlert());
        }, 4000);
    }, [dispatch]);
    
    const handleCloseAlert = () => {
        dispatch(closeAlert())
    }

    return (
        <div className={ 'alert animate__slideInLeft animate__animated ' + (type === 'error' ? 'alert--error' : 'alert--success') }>
            {
                type === 'error' ?
                <span className="material-icons">
                    error
                </span> :
                <span className="material-icons">
                    done
                </span>
            }
            <p>{ msg }</p>
            <span className="material-icons alert__close" onClick={ handleCloseAlert }>
                close
            </span>
        </div>
    )
}
