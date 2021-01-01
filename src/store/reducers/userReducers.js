import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    user: null,
    loading: false,
    fileUploading: false,
    error: null,
    message: '',
    isUserInforUpdated: false,
    isPasswordChanged: false
}

const userStart = (state) => {
    return updateObject(state, { loading: true, error: null });
};

const uploadStart = (state) => {
    return updateObject(state, { fileUploading: true, error: null });
}

const getMyUserInforSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        loading: false,
        error: null
    });
};

const updateUserInforSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        message: action.message,
        error: null,
        isUserInforUpdated: true
    });
};

const resetUpdateUserInforState = (state) => {
    return updateObject(state, {
        isUserInforUpdated: false,
        error: null
    })
};

const changePasswordSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        error: null,
        isPasswordChanged: true
    });
};

const resetChangePasswordState = (state) => {
    return updateObject(state, {
        isPasswordChanged: false,
        error: null
    })
};

// Error
const userError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fileUploading: false
    });
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERS_START: return userStart(state);
        case actionTypes.UPLOAD_START: return uploadStart(state);
        case actionTypes.USERS_ERROR: return userError(state, action);

        case actionTypes.GET_MY_USER_INFOR_SUCCESS: return getMyUserInforSuccess(state, action);

        case actionTypes.UPDATE_USER_INFOR_SUCCESS: return updateUserInforSuccess(state, action);
        case actionTypes.RESET_UPDATE_USER_INFOR_STATE: return resetUpdateUserInforState(state);

        case actionTypes.CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state, action);
        case actionTypes.RESET_CHANGE_PASSWORD_STATE: return resetChangePasswordState(state);

        default: return state;
    }
};

export default userReducer;