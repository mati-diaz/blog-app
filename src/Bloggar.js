import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthScreen } from './components/auth/AuthScreen';
import { RegisterForm } from './components/auth/RegisterForm';
import { LoginForm } from './components/auth/LoginForm';
import { HomeLayout } from './components/home/HomeLayout';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { PostsScreen } from './components/posts/PostsScreen';
import { ConfigScreen } from './components/config/ConfigScreen';
import { LoadingScreen } from './components/ui/LoadingScreen'
import { PublicBlogScreen } from './components/publicBlog/PublicBlogScreen';
import { PublicProfileScreen } from './components/publicProfile/PublicProfileScreen';
import { PublicPostScreen } from './components/publicPost/PublicPostScreen';
import { ConfigBlog } from './components/config/ConfigBlog';
import { ConfigAccount } from './components/config/ConfigAccount';
import { useDispatch, useSelector } from 'react-redux';
import { startAutoLogin } from './actions/user';
import { PrivateRoute } from './routers/PrivateRoute';
import { PublicRoute } from './routers/PublicRoute';
import { Alert } from './components/ui/Alert';
import { NotFoundScreen } from './components/ui/NotFoundScreen';
import { NewPost } from './components/newPost/NewPost';

export const Bloggar = () => {
    const { checking, id: uid } = useSelector(state => state.user);
    const { open } = useSelector(state => state.ui.alert);
    const { loading } = useSelector(state => state.ui);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startAutoLogin());
    }, [dispatch]);

    if (checking) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <>
            { open && <Alert /> }
            { loading && <LoadingScreen /> }
            <Routes>
                <Route
                    path='auth'
                    element={
                        <PublicRoute logged={ !!uid }>
                            <AuthScreen />
                        </PublicRoute>
                    }
                >
                    <Route index element={ <LoginForm /> } />
                    <Route path='register' element={ <RegisterForm /> } />
                </Route>

                <Route
                    path='/'
                    element={ 
                        <PrivateRoute logged={ !!uid }>
                            <HomeLayout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={ <PostsScreen /> } />
                    <Route path='posts' element={ <PostsScreen /> } />
                    <Route path='profile' element={ <ProfileScreen /> } />
                    <Route path='config' element={ <ConfigScreen /> }>
                        <Route path='blog' element={ <ConfigBlog /> } />
                        <Route path='account' element={ <ConfigAccount /> } />
                    </Route>
                </Route>

                <Route
                    path='/new'
                    element={
                        <PrivateRoute logged={ !!uid }>
                            <NewPost />
                        </PrivateRoute>
                    }
                />

                <Route path='/new'>
                    <Route index element={
                        <PrivateRoute logged={ !!uid }>
                            <NewPost />
                        </PrivateRoute>
                    } />
                    <Route path=':id' element={
                        <PrivateRoute logged={ !!uid }>
                            <NewPost />
                        </PrivateRoute>
                    } />
                </Route>

                <Route path='/public'>
                    <Route path='blog/:id' element={ <PublicBlogScreen /> } />
                    <Route path='post/:id' element={ <PublicPostScreen /> } />
                    <Route path='profile/:id' element={ <PublicProfileScreen /> } />
                </Route>


                <Route path='*' element={ <NotFoundScreen /> } />
            </Routes>
        </>
    );
}
