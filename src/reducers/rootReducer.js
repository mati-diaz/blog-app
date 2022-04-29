import { combineReducers } from "redux";
import { blogReducer } from "./blogsReducer";
import { commentsReducer } from "./commentsReducer";
import { postsReducer } from "./postsReducer";
import { uiReducer } from "./uiReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    blogs: blogReducer,
    posts: postsReducer,
    comments: commentsReducer
});