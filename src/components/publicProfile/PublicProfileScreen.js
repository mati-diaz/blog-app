import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { noTokenFetch } from '../../helpers/fetch'

export const PublicProfileScreen = () => {
    let { id } = useParams();

    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {
            const userResp = await noTokenFetch(`users/${ id }`);
            const userBody = await userResp.json();
            const blogsResp = await noTokenFetch(`blogs/user/${ userBody.user.id }`);
            const blogsBody = await blogsResp.json();
            setUser(userBody.user);
            setBlogs(blogsBody.blogs);
        }

        getUserInfo();
    }, [id]);

    const createdDate = new Date(user.createdAt).toLocaleDateString()

    const navigate = useNavigate();

    const handleOpenBlog = (id) => {
        return () => {
            navigate(`/public/blog/${ id }`);
        }
    }

    return (
        <div className='publicProfile'>
            <div className='profileInfo'>
                <img src={ user.profileImg || '/img/profile.png' } alt="" />
                <h1>{ user.fullname }</h1>
                <p>Miembro desde: <span>{ createdDate }</span></p>
            </div>
            <div className='profileExtras'>
                <div className='profileExtras__about'>
                    <h2>Acerca de mí</h2>
                    <p className='profileExtras__description'>{ user.description }</p>
                </div>
                <div className='profileExtras__blogs'>
                    <h2>Mis Blogs</h2>
                    <ul>
                        {
                            blogs.map(blog => (
                                <li
                                    key={ blog.id }
                                    onClick={ handleOpenBlog(blog.id) }
                                >{ blog.name }</li>
                            )) 
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
