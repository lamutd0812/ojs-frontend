import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    user: null,
    loading: false,
    fileUploading: false,
    error: null,
    message: '',
    isUserInforUpdated: false,
    isPasswordChanged: false,
    avatar: null,
    isAvatarChanged: false,
    categories: [],
    users: [],
    user_infor: null,
    total_items: 0,
    currentPage: 1,
    roles: [],
    isUserRoleChanged: false
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

const getPreferenceCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        categories: action.categories,
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

const changeAvatarSuccess = (state, action) => {
    return updateObject(state, {
        avatar: action.avatar,
        message: action.message,
        error: null,
        isAvatarChanged: true
    });
};

const resetChangeAvatarState = (state) => {
    return updateObject(state, {
        isAvatarChanged: false,
        error: null
    });
};

// Admin
const getAllUserInforSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users,
        total_items: action.total,
        currentPage: action.currentPage,
        error: null,
        loading: false
    });
};

const getUserInforSuccess = (state, action) => {
    return updateObject(state, {
        user_infor: action.user,
        loading: false,
        error: null
    });
};

const getAllUserRoleSuccess = (state, action) => {
    return updateObject(state, {
        roles: action.roles,
        error: null
    });
};

const changeUserRoleSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        isUserRoleChanged: true,
        error: null
    });
};

const resetChangeUserRoleState = (state, action) => {
    return updateObject(state, {
        isUserRoleChanged: false,
        error: null
    });
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

        case actionTypes.GET_PREFERENCE_CATEGORIES_SUCCESS: return getPreferenceCategoriesSuccess(state, action);

        case actionTypes.UPDATE_USER_INFOR_SUCCESS: return updateUserInforSuccess(state, action);
        case actionTypes.RESET_UPDATE_USER_INFOR_STATE: return resetUpdateUserInforState(state);

        case actionTypes.CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state, action);
        case actionTypes.RESET_CHANGE_PASSWORD_STATE: return resetChangePasswordState(state);

        case actionTypes.CHANGE_AVATAR_SUCCESS: return changeAvatarSuccess(state, action);
        case actionTypes.RESET_CHANGE_AVATAR_STATE: return resetChangeAvatarState(state);

        case actionTypes.GET_ALL_USERS_INFOR_SUCCESS: return getAllUserInforSuccess(state, action);
        case actionTypes.GET_USER_INFOR_SUCCESS: return getUserInforSuccess(state, action);
        case actionTypes.GET_ALL_USER_ROLES_SUCCESS: return getAllUserRoleSuccess(state, action);
        case actionTypes.CHANGE_USER_ROLE_SUCCESS: return changeUserRoleSuccess(state, action);
        case actionTypes.RESET_CHANGE_USER_ROLE_STATE: return resetChangeUserRoleState(state, action);

        default: return state;
    }
};

export default userReducer;