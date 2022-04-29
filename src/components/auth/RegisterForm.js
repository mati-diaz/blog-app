import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux';
import { startRegister } from '../../actions/user';
import { openAlert } from '../../actions/ui';

export const RegisterForm = () => {
    const [values, handleInputChange] = useForm({
        email: '',
        fullname: '',
        password: '',
        password2: ''
    });

    const dispatch = useDispatch();

    const { email, fullname, password, password2 } = values;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!email || !fullname || !password || !password2) {
            return dispatch(openAlert('error', 'Faltan campos por completar'));
        }

        if (password !== password2) {
            return dispatch(openAlert('error', 'Las contraseñas no coinciden'));
        }

        dispatch(startRegister(email, fullname, password))
    }

    return (
        <div className='authFormContainer'>
            <h2>Crear Una Cuenta</h2>
            <form className='authForm' onSubmit={ handleSubmitForm }>
                <input
                    className='authForm__input'
                    type="email"
                    placeholder='Correo'
                    name='email'
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    className='authForm__input'
                    type="text"
                    placeholder='Nombre'
                    name='fullname'
                    value={ fullname }
                    onChange={ handleInputChange }
                />
                <input
                    className='authForm__input'
                    type="password"
                    placeholder='Contraseña'
                    name='password'
                    value={ password }
                    onChange={ handleInputChange }
                />
                <input
                    className='authForm__input'
                    type="password"
                    placeholder='Repita la Contraseña'
                    name='password2'
                    value={ password2 }
                    onChange={ handleInputChange }
                />
                <button
                    className='button button--primary'
                    type='submit'
                >Crear Cuenta</button>
            </form>
            <Link className='link' to='/auth'>Iniciar Sesión</Link>
        </div>
    )
}
