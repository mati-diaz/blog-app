import { types } from "../types/types";

const initialState = {
    blogList: [],
    activeBlog: {}
}

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.blogGetMany:
            return {
                ...state,
                blogList: [
                    ...action.payload
                ]
            }

        case types.blogAddNew:
            return {
                ...state,
                blogList: [action.payload, ...state.blogList]
            }

        case types.blogSetActive:
            return {
                ...state,
                activeBlog: {
                    ...state.activeBlog,
                    ...action.payload
                }
            }

        case types.blogClearActive:
            return {
                ...state,
                activeBlog: {}
            }

        case types.blogUpdate:
            return {
                ...state,
                blogList: state.blogList.map((blog) => {
                    if (blog.id === action.payload.id) {
                        return {
                            ...blog,
                            ...action.payload
                        }
                    } else {
                        return blog
                    }
                })
            }
        case types.blogDelete:
            return {
                ...state,
                blogList: state.blogList.filter(blog => blog.id !== action.payload)
            }

        case types.blogClear:
            return initialState

        default:
            return state;
    }
}
