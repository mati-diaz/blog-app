import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { openAlert } from '../../actions/ui';
import { startLogin } from '../../actions/user';
import { useForm } from '../../hooks/useForm';

export const LoginForm = () => {
    const [values, handleInputChange] = useForm({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

    const { email, password, } = values;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!email || !password) {
            return dispatch(openAlert('error', 'Faltan campos por completar'))
        }

        dispatch(startLogin(email, password));
    }

    return (
        <div className='authFormContainer'>
            <h2>Iniciar Sesión</h2>
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
                    type="password"
                    placeholder='Contraseña'
                    name='password'
                    value={ password }
                    onChange={ handleInputChange }
                />
                <button
                    className='button button--primary'
                    type='submit'
                >Iniciar Sesión</button>
            </form>
            <Link className='link' to='/auth/register'>Crear una cuenta</Link>
        </div>
    )
}
