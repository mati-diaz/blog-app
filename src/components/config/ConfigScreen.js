import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const ConfigScreen = () => {

    const activeLink = ({ isActive }) => (
        'link link--black ' + 
        (isActive ? 'link--active2' : '')
    )

    return (
        <div className='configScreen'>
            <nav className='configNav'>
                <NavLink className={ activeLink } to='/config/blog'>Blog</NavLink>
                <NavLink className={ activeLink } to='/config/account'>Cuenta</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
