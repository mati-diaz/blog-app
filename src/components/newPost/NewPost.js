import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { startAddPost, startUpdatePost } from '../../actions/posts';
import { openAlert } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom'


export const NewPost = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const post = useSelector(state => state.posts.find(post => post.id === id));

    const [formValues, handleInputChange] = useForm({
        title: post?.title || '',
        body: post?.body || ''
    });

    const { title, body } = formValues;

    // input file
    const [selectedImg, setSelectedImg] = useState({
        postImg: '',
        preview: ''
    });

    const { postImg, preview } = selectedImg;


    const inputRef = useRef();

    const openInputFile = (e) => {
        e.preventDefault();

        inputRef.current.click();
    } 

    const handleInputFiles = (e) => {
        if (e.target.files[0]) {
            setSelectedImg({
                postImg: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    const navigate = useNavigate();

    // submit form
    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!title) {
            return dispatch(openAlert('error', 'Se necesita un titulo'));
        }

        if (id) {
            dispatch(startUpdatePost(title, postImg, body, id))
        } else {
            dispatch(startAddPost(title, postImg, body))
        }

        navigate('/posts');
    }

    return (
        <form className='newPost' onSubmit={ handleSubmitForm }>
            <nav className='newPost__nav'>
                <Link className='link' to='/posts'>
                    <span className="material-icons">
                        arrow_back
                    </span>
                </Link>
                <button className='button button--primary'>
                    <span className="material-icons">
                        send
                    </span>
                    { id ? 'Actualizar' : 'Publicar' }
                </button>
            </nav>
            <fieldset className='newPost__fields'>
                <input
                    type="text"
                    placeholder='Titulo'
                    name='title'
                    value={ title }
                    onChange={ handleInputChange }
                />

                <input
                    ref={ inputRef }
                    type='file'
                    style={{ display: 'none' }}
                    onChange={ handleInputFiles }
                />

                <div
                    className="postForm__img"
                >
                    <div className='imgBtn' onClick={ openInputFile }>
                        <span className="material-icons">
                            image
                        </span>
                        <p>Elegir Imagen</p>
                    </div>
                        {
                            (preview || post?.postImg) &&
                            <div className='imgPreview'>
                                <img src={ preview || post?.postImg } alt="" />
                            </div>
                        }
                </div>

                <textarea
                    id="" cols="30" rows="10"
                    name='body'
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
            </fieldset>
        </form>
    )
}
