import { noTokenFetch, tokenFetch } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, openAlert, startLoading } from "./ui";

export const startGetComments = (id) => {
    return async (dispatch,) => {
        dispatch(startLoading());
        const resp = await noTokenFetch(`comments/${ id }`);
        const body = await resp.json();
        
        if (resp.status === 200 || resp.status === 201) {    
            dispatch(addComments(body.comments));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', body.msg));
            dispatch(finishLoading());
        }
    }
}

export const startAddComment = (post, description) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch(`comments`, { post, description }, 'POST');
        const respBody = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(addComment(respBody.comment));
            dispatch(openAlert('success', respBody.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', respBody.msg));
            dispatch(finishLoading());
        }
    }
}

export const startDeleteComment = (id) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await tokenFetch(`comments/${id}`, {}, 'DELETE');
        const respBody = await resp.json();

        if (resp.status === 200 || resp.status === 201) {    
            dispatch(deleteComment(id));
            dispatch(openAlert('success', respBody.msg));
            dispatch(finishLoading());
        } else {
            dispatch(openAlert('error', respBody.msg));
            dispatch(finishLoading());
        }
    }
}

const addComments = (posts) => ({
    type: types.commentGetMany,
    payload: posts
});

const addComment = (post) => ({
    type: types.commentAddNew,
    payload: post
});

const deleteComment = (id) => ({
    type: types.commentDelete,
    payload: id
});

export const clearComment = () => ({
    type: types.commentClear
})