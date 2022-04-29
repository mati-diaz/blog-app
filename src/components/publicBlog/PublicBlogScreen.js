import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { startGetBlog } from '../../actions/blogs';
import { clearPosts } from '../../actions/posts';

export const PublicBlogScreen = () => {
    let { id } = useParams();

    const blog = useSelector(state => state.blogs.activeBlog);
    const posts = useSelector(state => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetBlog(id));

        return () => {
            dispatch(clearPosts());
        }
    }, [dispatch, id]); 
    
    const [showNav, setShowNav] = useState(false);

    const handleShowNav = () => {
        setShowNav(!showNav);
    }

    return (
        <div className='public'>
            <nav
                className={ showNav ? 'public__nav public__nav--show' : 'public__nav' }
            >
                <div className='public__profile'>
                    <div className='public__navImage'>
                        <img src={ blog.author?.profileImg || '/img/profile.png' } alt="" />
                    </div>
                    <h3>{ blog.author?.fullname }</h3>
                    <Link className='link' to={ `/public/profile/${ blog.author?._id }` }>
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
                <div className='publicBlog'>
                    <h1>{ blog.name }</h1>
                    { blog?.description && <p>{ blog.description }</p> }

                    <div className='publicPosts'>
                        {
                            posts?.map(post => {
                                const date = new Date(post.createdAt);
                                return (
                                    <div className='publicPost' key={ post.id }>
                                        <h3 className='publicPost__title'>{ post.title }</h3>
                                        <p className='publicPost__date'>{ date.toLocaleDateString() }</p>
                                        {
                                            post?.postImg &&
                                            <div className='publicPost__img'>
                                                <img src={ post.postImg } alt="" />
                                            </div>
                                        }
                                        <Link className='link' to={ `/public/post/${post.id}` }>Leer Entrada</Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
