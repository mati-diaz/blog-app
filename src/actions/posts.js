import { formDataFetch, tokenFetch } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, openAlert, startLoading } from "./ui";

export const startGetPosts = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const id = getState().blogs.activeBlog?.id;

        if (!id) {
            return;
        }

        const resp = await tokenFetch(`posts/blog/${ id }`);
        const body = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(addPosts(body.posts));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg));
            dispatch(finishLoading());
        }
    }
}

export const startAddPost = (title, postImg, body) => {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const { id } = getState().blogs.activeBlog;

        const formData = new FormData();

        title && formData.append('title', title);
        body && formData.append('body', body);
        postImg && formData.append('postImg', postImg);

        const resp = await formDataFetch(`posts/blog/${id}`, formData, 'POST');
        const respBody = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(addPost(respBody.post));
            dispatch(openAlert('success', respBody.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', respBody.msg));
            dispatch(finishLoading());
        }
    }
}

export const startUpdatePost = (title, postImg, body, id) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const formData = new FormData();

        title && formData.append('title', title);
        body && formData.append('body', body);
        postImg && formData.append('postImg', postImg);

        const resp = await formDataFetch(`posts/${id}`, formData, 'PUT');
        const respBody = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(updatePost({ id, title, body, postImg: respBody.postImg }));
            dispatch(openAlert('success', respBody.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', respBody.msg));
            dispatch(finishLoading());
        }
    }
}

export const startDeletePost = (id) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch(`posts/${id}`, {}, 'DELETE');
        const respBody = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(deletePost(id));
            dispatch(openAlert('success', respBody.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', respBody.msg));
            dispatch(finishLoading());
        }
    }
}

const addPosts = (posts) => ({
    type: types.postsGetMany,
    payload: posts
});

const addPost = (post) => ({
    type: types.postsAddNew,
    payload: post
});

const updatePost = (post) => ({
    type: types.postsUpdate,
    payload: post
})

const deletePost = (id) => ({
    type: types.postsDelete,
    payload: id
});

export const clearPosts = () => ({
    type: types.postsClear
})