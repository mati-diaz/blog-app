import { types } from "../types/types";

const initialState = {
    checking: true,
    id: '',
    fullname: '',
    description: '',
    profileImg: '',
    configDone: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.userLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
        case types.userCheckingFinish:
            return {
                ...state,
                checking: false
            }
        case types.userLogout:
            return {
                checking: false
            };

        case types.userUpdate:
            return {
                ...action.payload
            }

        default:
            return state;
    }
}
