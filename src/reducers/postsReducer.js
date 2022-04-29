import { types } from "../types/types";

const initialState = [];

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.postsGetMany:
            return [...action.payload]

        case types.postsAddNew:
            return [action.payload, ...state]

        case types.postsUpdate:
            return state.map(post => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        ...action.payload
                    }
                } else {
                    return post
                }
            });

        case types.postsDelete:
            return state.filter(post => post.id !== action.payload)

        case types.postsClear:
            return initialState

        default:
            return state;
    }
}
