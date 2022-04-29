import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'

export const HomeLayout = () => {
    return (
        <div className='home'>
            <Navbar />
            <div className='home__content'>
                <Outlet />
            </div>
        </div>
    )
}
