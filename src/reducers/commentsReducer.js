import { types } from "../types/types";

const initialState = [];

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.commentGetMany:
            return action.payload
        
        case types.commentAddNew:
            return [action.payload, ...state]

        case types.commentDelete:
            return state.filter(comment => comment.id !== action.payload)

        default:
            return state;
    }
}
