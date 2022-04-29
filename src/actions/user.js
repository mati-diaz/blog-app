import { formDataFetch, noTokenFetch, tokenFetch } from "../helpers/fetch";
import { types } from "../types/types";
import { clearBlogs } from "./blogs";
import { clearPosts } from "./posts";
import { finishLoading, openAlert, startLoading } from "./ui";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await noTokenFetch('auth/login', {email, password}, 'POST');
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {
            localStorage.setItem('token', body.token);

            const { id, fullname, description, profileImg, configDone } = body.user;

            dispatch(login({
                id,
                fullname,
                description,
                profileImg,
                configDone
            }));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg));
            dispatch(finishLoading());
        }
    }
}

export const startRegister = (email, fullname, password) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await noTokenFetch('auth/register', {email, password, fullname}, 'POST');
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {
            localStorage.setItem('token', body.token);

            const { id, fullname, description, profileImg, configDone } = body.newUser;

            dispatch(login({
                id,
                fullname,
                description,
                profileImg,
                configDone
            }));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg));
            dispatch(finishLoading());
        }
    }
}

export const startAutoLogin = () => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch('auth/autologin')
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {
            const { id, fullname, description, profileImg, configDone } = body.user;

            dispatch(login({
                id,
                fullname,
                description,
                profileImg,
                configDone
            }));
            dispatch(finishLoading());
        } else {
            dispatch(checkingFinish());
            dispatch(finishLoading());
        }
    }
}

export const startUpdateUser = (fullname, description, profileImg) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const formData = new FormData();

        fullname && formData.append('fullname', fullname);
        description && formData.append('description', description);
        profileImg && formData.append('profileImg', profileImg);

        const resp = await formDataFetch('users', formData, 'PUT');
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {
            dispatch(updateUser(body.user));  
            dispatch(openAlert('success', body.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg, 'danger'));
            dispatch(finishLoading());
        }
    }
}

export const startDeleteUser = () => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch('users', {}, 'DELETE')
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {
            dispatch(logout());
            dispatch(openAlert('success', body.msg));
            dispatch(finishLoading());
        } else {
            dispatch(checkingFinish());
            dispatch(finishLoading());
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(clearBlogs());
        dispatch(clearPosts())
        dispatch(logout());
    }
}

const login = (user) => ({
    type: types.userLogin,
    payload: user
});

const logout = () => ({
    type: types.userLogout,
});

const updateUser = (user) => ({
    type: types.userUpdate,
    payload: user
});

const checkingFinish = () => ({
    type: types.userCheckingFinish
});