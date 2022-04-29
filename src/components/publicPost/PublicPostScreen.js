import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { startAddComment, startDeleteComment, startGetComments } from '../../actions/comments';
import { openAlert } from '../../actions/ui';
import { noTokenFetch } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';

export const PublicPostScreen = () => {
    let { id } = useParams();

    const { id: uid } = useSelector(state => state.user);
    const comments = useSelector(state => state.comments);

    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [post, setPost] = useState({});


    useEffect(() => {
        const getInfo = async () => {
            const postResp = await noTokenFetch(`posts/${ id }`);
            const postBody = await postResp.json();
            const userResp = await noTokenFetch(`users/${ postBody.post.author }`);
            const userBody = await userResp.json();
            setPost(postBody.post)
            setUser(userBody.user);

            dispatch(startGetComments(id));
        }
        getInfo();

    }, [id, dispatch]);

    const [showNav, setShowNav] = useState(false);

    const handleShowNav = () => {
        setShowNav(!showNav);
    }

    const createdDate = new Date(post.createdAt).toLocaleDateString();

    // Comment
    const [formValues, handleInputChange] = useForm({
        description: ''
    })

    const { description } = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!description) {
            return dispatch(openAlert('error', 'Tienes que escribir algo'));
        }

        dispatch(startAddComment(id, description));
    }

    const handleDeleteComment = (id) => {
        return () => {
            dispatch(startDeleteComment(id));
        }
    }

    return (

        <div className='public'>
            <nav
                className={ showNav ? 'public__nav public__nav--show' : 'public__nav' }
            >
                <div className='public__profile'>
                    <div className='public__navImage'>
                        <img src={ user?.profileImg || '/img/profile.png' } alt="" />
                    </div>
                    <h3>{ user?.fullname }</h3>
                    <Link className='link' to={ `/public/profile/${ user?.id }` }>
                        <span className="material-icons md-36">
                            account_circle
                        </span>
                        Ver perfil
                    </Link>
                </div>
                <div className='myAccount'>
                    <div className='divisor'></div>
                    <Link className='link' to='/posts'>Mi cuenta</Link>
                </div>
            </nav>
            <div className='nav__toggle' onClick={ handleShowNav }>
                <span className="material-icons md-36">
                    menu
                </span>
            </div>
            <div className='public__content'>
                <div className='postPublic'>
                    <h1>{ post.title }</h1>
                    <p>{ createdDate }</p>
                    {
                        post?.postImg &&
                        <div className='postPublic__img'>
                            <img src={ post.postImg } alt="" />
                        </div>
                    }{
                        post?.body &&
                        <p>{ post.body }</p>
                    }
                </div>
                <div className='comments'>
                    <h3>Comentarios</h3>
                    <div className='divisor'></div>
                    {
                        uid ?
                        <form className='comments__form' onSubmit={ handleSubmitForm }>
                            <textarea
                                id=""
                                cols="30"
                                rows="5"
                                name="description"
                                value={ description }
                                onChange={ handleInputChange }
                            ></textarea>
                            <button className='button button--primary' type='submit'>Comentar</button>
                        </form> :
                        <p>
                            <Link className='link' to='/auth'>Inicia sesión</Link> para comentar
                        </p>
                    }
                    <ul>
                        {
                            comments.map(comment => {
                                const createdDate = new Date(post.createdAt).toLocaleDateString();
                                return (
                                    <li className='comment' key={ comment.id }>
                                        <div className='comment__info'>
                                            <div className='comment__user'>
                                                <img
                                                    src={ comment.author?.profileImg || '/img/profile.png' }
                                                    alt=""
                                                />
                                                <h4>{ comment.author?.fullname }</h4>
                                            </div>
                                            <div className='comment__extras'>
                                                <p>{ createdDate }</p>
                                                {
                                                    uid ?
                                                    comment.author._id === uid &&
                                                    <button onClick={ handleDeleteComment(comment.id) }>
                                                        <span className="material-icons md-18">
                                                            delete
                                                        </span>
                                                    </button> :
                                                    null
                                                }
                                            </div>
                                        </div>
                                        <p>{ comment.description }</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
