import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export const ProfileScreen = () => {
    const { fullname, description, profileImg } = useSelector(state => state.user);

    return (
        <div className='profileScreen'>
            <div className='profile__img'>
                <img src={ profileImg || '/img/profile.png' } alt='' />
            </div>
            <h3>{ fullname }</h3>
            <div className='divisor'></div>
            <div className='profile__about'>
                <h4>Acerca de Mí</h4>
                <p>{ description }</p>
            </div>
            <Link className='button button--primary' to='/config/account'>
                <span className="material-icons">
                    edit
                </span>
                Editar
            </Link>
        </div>
    )
}
