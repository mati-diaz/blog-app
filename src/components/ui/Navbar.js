import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { startAddBlog, startGetOwnBlogs, startSetActiveBlog } from '../../actions/blogs';
import { closeModal, openAlert, openModal } from '../../actions/ui';
import { startLogout } from '../../actions/user';
import { useForm } from '../../hooks/useForm';
import { Modal } from './Modal';

export const Navbar = () => {
    const { modalOpen } = useSelector(state => state.ui);
    const { activeBlog, blogList } = useSelector(state => state.blogs);
    const { fullname, profileImg } = useSelector(state => state.user);

    const navbar = useRef(null);

    const dispatch = useDispatch();

    const showNavbar = () => {
        navbar.current.classList.toggle('navbar--show')
    }

    const activeLink = ({ isActive }) => (
        'link navbar__link ' + 
        (isActive ? 'link--active' : '')
    );

    const handleLogout = () => {
        dispatch(startLogout())
    }

    const openBlogModal = () => {
        dispatch(openModal());
        showNavbar();
    }

    useEffect(() => {
        dispatch(startGetOwnBlogs());
    }, [dispatch])
    

    const [formValues, handleInputChange] = useForm({
        name: '',
        description: ''
    });

    const { name, description } = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (!name) {
            return dispatch(openAlert('error', 'Se necesita un nombre'));
        }

        dispatch(startAddBlog(name, description));
        dispatch(closeModal());
    }

    const changeActiveBlog = (blog) => {
        return () => {
            dispatch(startSetActiveBlog(blog));
            dispatch(closeModal());
        }
    }

    const navigate = useNavigate();

    const newPostNavigate = () => {
        if (Object.keys(activeBlog).length === 0) {
            return dispatch(openAlert('error', 'Primero tienes que crear un blog'));
        }

        navigate('/new');
    }

    return (
        <>
            {
                modalOpen &&
                <Modal>
                    <div>
                        <h3>Mis Blogs</h3>
                        <ul className='blogs__list'>
                            {
                                blogList.map(blog => (
                                    <li
                                        key={ blog.id }
                                        onClick={ changeActiveBlog(blog) }
                                    >{ blog.name }</li>

                                )) 
                            }
                        </ul>
                        <div className='divisor'></div>
                        <h4>Crear un nuevo Blog</h4>
                        <form className='newBlog' onSubmit={ handleSubmitForm }> 
                            <input 
                                type="text"
                                placeholder='Nombre'
                                name='name'
                                value={ name }
                                onChange={ handleInputChange }
                            />
                            <textarea
                                cols="30"
                                rows="5"
                                placeholder='Descripcion (opcional)'
                                name='description'
                                value={ description }
                                onChange={ handleInputChange }
                            ></textarea>
                            <button className='button button--primary'>Crear</button>
                        </form>
                    </div>
                </Modal>
            }
            <nav className='navbar' ref={ navbar }>
                <span className="material-icons navbar__menu" onClick={ showNavbar }>
                    menu
                </span>
                <div className='navbar__items'>
                    <NavLink
                        className={({ isActive }) => (
                            'link navbar__profile ' + 
                            (isActive ? 'link--active' : '')
                        )}
                        to='/profile'
                        onClick={ showNavbar }
                    >
                        <div className='navbar__image'>
                            <img src={ profileImg || "/img/profile.png" } alt="" />
                        </div>
                        <p>{ fullname }</p>
                    </NavLink>
        
                    <div className='navbar__blog' onClick={ openBlogModal }>
                        <p>
                            Blog: { activeBlog?.name || 'Crear un Blog' }
                            <span className="material-icons">
                                expand_more
                            </span>
                        </p>
                    </div>

                    <button
                        className='button button--primary'
                        onClick={ newPostNavigate }
                    >
                        <span className="material-icons">
                            add
                        </span>
                        <p>Nueva Entrada</p>
                    </button>

                    <NavLink
                        className={ activeLink }
                        to='/posts'
                        onClick={ showNavbar }
                    >
                        <span className="material-icons">
                            article
                        </span>
                        Entradas
                    </NavLink>

                    <NavLink
                        className={ activeLink }
                        to='/config/blog'
                        onClick={ showNavbar }
                    >
                        <span className="material-icons">
                            settings
                        </span>
                        Configuración
                    </NavLink>

                    <a 
                        className='navbar__link' href={ `/public/blog/${ activeBlog.id }` }
                        target='_blank'
                        rel='noreferrer'
                    >
                        <span className="material-icons">
                            open_in_new
                        </span>
                        Ver Blog
                    </a>

                    <div className='navbar__divisor'></div>

                    <button className='navbar__logout' onClick={ handleLogout }>
                        <span className="material-icons">
                            logout
                        </span>
                        <p>Cerrar Sesión</p>
                    </button>
                </div>
            </nav>
        </>
    )
}
