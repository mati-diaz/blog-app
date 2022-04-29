import { types } from "../types/types";

export const openAlert = (type, msg) => ({
    type: types.alertOpen,
    payload: {
        type,
        msg
    }
});

export const closeAlert = () => ({
    type: types.alertClose
});

export const openModal = () => ({
    type: types.modalOpen
});

export const closeModal = () => ({
    type: types.modalClose
});

export const startLoading = () => ({
    type: types.loadingStart
});

export const finishLoading = () => ({
    type: types.loadingFinish
});