import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startDeletePost } from '../../actions/posts';

export const PostsScreen = () => {
    const { posts } = useSelector(state => state);

    const navigate = useNavigate();

    const handleEditPost = (id) => {
        return () => {
            navigate(`/new/${id}`);
        }
    }

    const dispatch = useDispatch();

    const handleDeletePost = (id) => {
        return () => {
            dispatch(startDeletePost(id));
        }
    }

    return (
        <div className='postsScreen'>
            <form className='postsScreen__search'>
                <label className='postsScreen__label' htmlFor="search">
                    <span className="material-icons">
                        search
                    </span>
                    <input type="text" placeholder='Buscar Entradas' />
                </label>
            </form>
            <div className='postsScreen__posts'>
                {
                    posts.map(post => {
                        const date = new Date(post.createdAt);
                        return (
                            <div
                                className='post'
                                key={ post.id }
                            >
                                <div className='post__preview'>
                                    {
                                        post.postImg ?
                                        <img src={ post.postImg } alt="" /> :
                                        <p>{ post.title[0].toUpperCase() }</p>
                                    }
                                </div>
                                <div className='post__body'>
                                    <div className='post__title'>
                                        <h4>{ post.title }</h4>
                                    </div>
                                    <div className='post__extras'>
                                        <p>Fecha: <span>{ date.toLocaleDateString() }</span></p>
                                        <div className='post__buttons'>
                                            <button
                                                onClick={ handleEditPost(post.id) }
                                            >                                            
                                                <span className="material-icons md-18">
                                                    edit
                                                </span>
                                            </button>
                                            <button
                                                onClick={ handleDeletePost(post.id) }
                                            >
                                                <span className="material-icons md-18">
                                                    delete
                                                </span>
                                            </button>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }             
            </div>
        </div>
    )
}
