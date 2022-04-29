import { types } from "../types/types";

const initialState = {
    alert: {
        open: false,
        msg: '',
        type: ''
    },
    loading: false,
    modalOpen: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.alertOpen:
            return {
                ...state,
                alert: {
                    ...initialState.alert,
                    open: true,
                    ...action.payload
                },
            }
        case types.alertClose:
            return {
                ...state,
                alert: {
                    ...initialState.alert
                }
            }
        case types.loadingStart:
            return {
                ...state,
                loading: true
            }
        case types.loadingFinish:
            return {
                ...state,
                loading: false
            }
        case types.modalOpen:
            return {
                ...state,
                modalOpen: true
            }
        case types.modalClose:
            return {
                ...state,
                modalOpen: false
            }

        default:
            return state;
    }
}
