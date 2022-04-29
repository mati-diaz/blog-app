import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteBlog, startUpdateBlog } from '../../actions/blogs';
import { openAlert } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';


export const ConfigBlog = () => {
    const { activeBlog } = useSelector(state => state.blogs);
    
    useEffect(() => {
        
    }, [])
    

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: activeBlog?.name || '',
        description: activeBlog?.description || ''
    });      

    const { name, description } = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (Object.keys(activeBlog).length === 0) {
            return dispatch(openAlert('error', 'Primero tienes que crear un blog'));
        }

        if (!name) {
            return dispatch(openAlert('error', 'Se necesita un nombre'));
        }

        dispatch(startUpdateBlog(name, description));
    }

    const handleDeleteBlog = () => {
        if (Object.keys(activeBlog).length === 0) {
            return dispatch(openAlert('error', 'Primero tienes que crear un blog'));
        }

        dispatch(startDeleteBlog());
    }

    return (
        <div className='configBlog'>
            <form className='blogForm' onSubmit={ handleSubmitForm }>
                <div className='blogForm__field'>
                    <label htmlFor="name">Nombre del Blog</label>
                    <input
                        type="text"
                        id='name'
                        name='name'
                        value={ name }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className='blogForm__field'>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        cols="30"
                        rows="10"
                        name='description'
                        value={ description }
                        onChange={ handleInputChange }
                    ></textarea>
                </div>
                <button
                    className='button button--primary'
                    type='submit'
                >Actualizar</button>
            </form>
            <div className='divisor'></div>
            <button
                className='button button--secondary'
                onClick={ handleDeleteBlog }
            >Eliminar Blog</button>
        </div>
    )
}
