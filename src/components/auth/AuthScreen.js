import React from 'react';
import { Outlet } from "react-router-dom";

export const AuthScreen = ({ children }) => {
    return (
        <div className='authScreen'>
            <div className='authScreen__info'>
                <img className='authScreen__logo' src="/img/logo.png" alt="logo" />
                <h1 className='authScreen__title'>Bienvenido a Bloggar</h1>
                <p className='authScreen__description'>Inicia sesión o crea una cuenta cuenta para publicar  y compartir tus blogs</p>
            </div>
            <div className='authScreen__form'>
                <Outlet />
            </div>
        </div>
    )
}
