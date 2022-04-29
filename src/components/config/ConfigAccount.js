import React, { useRef, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteUser, startUpdateUser } from '../../actions/user';
import { openAlert } from '../../actions/ui';

export const ConfigAccount = () => {
    const { user } = useSelector(state => state);

    const [selectedImg, setSelectedImg] = useState({
        profileImg: '',
        preview: ''
    });

    const [formValues, handleInputChange] = useForm({
        fullname: user.fullname || '',
        description: user.description || ''
    });

    const {fullname, description} = formValues
    const { profileImg, preview } = selectedImg;

    const dispatch = useDispatch();

    const inputRef = useRef();

    const handleInputFiles = (e) => {
        if (e.target.files[0]) {
            setSelectedImg({
                profileImg: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    const openInputFile = (e) => {
        e.preventDefault();

        inputRef.current.click();
    } 

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!fullname) {
            return dispatch(openAlert('error', 'Se necesita un nombre'));
        }

        dispatch(startUpdateUser(fullname, description, profileImg));
    }

    const handleDeleteAccount = () => {
        dispatch(startDeleteUser());
    }

    return (
        <div className='configAccount'>
            <form className='blogForm' onSubmit={ handleSubmitForm }>
                <input
                    ref={ inputRef }
                    type='file'
                    style={{ display: 'none' }}
                    onChange={ handleInputFiles }
                />

                <div
                    className="blogForm__img"
                    onClick={ openInputFile }
                >
                    <img src={ preview || user.profileImg || '/img/profile.png' } alt="" />
                    <div className='blogForm__overlay'>
                        <span className="material-icons md-24">
                            edit
                        </span>
                    </div>
                </div>

                <div className='blogForm__field'>
                    <label htmlFor="name">Tu Nombre</label>
                    <input
                        type="text"
                        id='name'
                        name='fullname'
                        value={ fullname }
                        onChange={ handleInputChange }
                    />
                </div>

                <div className='blogForm__field'>
                    <label htmlFor="description">Acerca de tí</label>
                    <textarea
                        id="description" 
                        cols="30"
                        rows="10"
                        name='description'
                        value={ description }
                        onChange={ handleInputChange }
                    ></textarea>
                </div>
                <button className='button button--primary'>Actualizar</button>
            </form>
            <div className='divisor'></div>
            <button 
                className='button button--secondary'
                onClick={ handleDeleteAccount }
            >Eliminar Cuenta</button>
        </div>
    )
}
