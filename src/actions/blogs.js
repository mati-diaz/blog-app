import { tokenFetch } from "../helpers/fetch";
import { types } from "../types/types";
import { startGetPosts } from "./posts";
import { finishLoading, openAlert, startLoading } from "./ui";

export const startGetOwnBlogs = () => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch('blogs/own');
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {
            dispatch(addBlogs(body.blogs));
            if (body.blogs[0]) {
                dispatch(startSetActiveBlog(body.blogs[0]));
            } else {
                dispatch(clearActiveBlog());
            }
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg))
        }
    }
}

export const startGetBlog = (id) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch(`blogs/${id}`);
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {
            dispatch(startSetActiveBlog(body.blog));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg));
            dispatch(finishLoading());
        }
    }
}

export const startAddBlog = (name, description) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch('blogs', { name, description }, 'POST');
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(addBlog(body.blog));
            dispatch(setActiveBlog(body.blog));
            dispatch(openAlert('success', body.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg));
            dispatch(finishLoading());
        }
    }
}

export const startSetActiveBlog = (blog = {}) => {
    return async (dispatch) => {
        dispatch(setActiveBlog(blog));
        dispatch(startGetPosts());
    }
}

export const startUpdateBlog = (name, description) => {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const { id } = getState().blogs.activeBlog;

        const resp = await tokenFetch(`blogs/${id}`, { name, description }, 'PUT');
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(updateBlog({ id, name, description }));
            dispatch(setActiveBlog({ id, name, description }));
            dispatch(openAlert('success', body.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg, 'danger'));
            dispatch(finishLoading());
        }
    }
}

export const startDeleteBlog = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const { id } = getState().blogs.activeBlog;

        const resp = await tokenFetch(`blogs/${id}`, {}, 'DELETE');
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(deleteBlog(id));
            dispatch(startGetOwnBlogs());
            dispatch(openAlert('success', body.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg));
            dispatch(finishLoading());
        }
    }
}

const addBlog = (blog) => ({
    type: types.blogAddNew,
    payload: blog
});

const addBlogs = (blogs) => ({
    type: types.blogGetMany,
    payload: blogs
});

const setActiveBlog = (blog) => ({
    type: types.blogSetActive,
    payload: blog
});

const updateBlog = (blog) => ({
    type: types.blogUpdate,
    payload: blog
});

const deleteBlog = (id) => ({
    type: types.blogDelete,
    payload: id
});

const clearActiveBlog = () => ({
    type: types.blogClearActive
});

export const clearBlogs = () => ({
    type: types.blogClear
});