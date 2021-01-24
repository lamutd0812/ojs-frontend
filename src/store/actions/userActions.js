import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const userStart = () => {
    return {
        type: actionTypes.USERS_START
    };
};

// const uploadStart = () => {
//     return {
//         type: actionTypes.UPLOAD_START
//     }
// };

const getMyUserInforSuccess = (data) => {
    return {
        type: actionTypes.GET_MY_USER_INFOR_SUCCESS,
        user: data.user
    }
};

const updateUserInforSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_USER_INFOR_SUCCESS,
        message: data.message,
        user: data.user
    }
}

const changePasswordSuccess = (data) => {
    return {
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        message: data.message,
    }
}

const changeAvatarSuccess = (data) => {
    localStorage.setItem('avatar', data.avatar);
    return {
        type: actionTypes.CHANGE_AVATAR_SUCCESS,
        message: data.message,
        avatar: data.avatar
    }
}

// Admin
const getAllUserInforSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_USERS_INFOR_SUCCESS,
        users: data.users,
        total: data.total,
        currentPage: data.currentPage
    }
};

const getUserInforSuccess = (data) => {
    return {
        type: actionTypes.GET_USER_INFOR_SUCCESS,
        user: data.user
    }
};

const getAllUserRoleSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_USER_ROLES_SUCCESS,
        roles: data.roles
    }
};

const changeUserRoleSuccess = (data) => {
    return {
        type: actionTypes.CHANGE_USER_ROLE_SUCCESS,
        // user: data.updatedUser,
        message: data.message
    }
};

// Error
const userError = (error) => {
    return {
        type: actionTypes.USERS_ERROR,
        error: error
    }
};

export const getMyUserInfor = () => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(userStart());
    axios.get('users/my', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getMyUserInforSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.message));
    });
};

const getPreferenceCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.GET_PREFERENCE_CATEGORIES_SUCCESS,
        categories: categories
    }
};

export const updateUserInfor = (body) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.put('users/update-infor', body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(updateUserInforSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.response.data.error));
    });
};

export const resetUpdateUserInforState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_UPDATE_USER_INFOR_STATE
    })
};

export const changePassword = (body) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.put('users/change-password', body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(changePasswordSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.response.data.error));
    });
};

export const resetChangePasswordState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_CHANGE_PASSWORD_STATE
    })
};

export const changeAvatar = (formData) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.put('users/change-avatar', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        dispatch(changeAvatarSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.response.data.error));
    });
};

export const resetChangeAvatarState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_CHANGE_AVATAR_STATE
    })
};

export const getPreferenceCategories = () => (dispatch) => {
    axios.get('users/all/preference-categories')
        .then(res => {
            dispatch(getPreferenceCategoriesSuccess(res.data.categories));
        })
        .catch(err => {
            dispatch(userError(err.message));
        });
};

// Admin
export const getAllUsers = (page = 1, limit = 8) => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(userStart());
    axios.get(`users/infor/all?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getAllUserInforSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.message));
    });
};

export const getUserInfor = (userId) => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(userStart());
    axios.get(`users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getUserInforSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.message));
    });
};

export const getAllRoles = () => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.get('roles', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getAllUserRoleSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.message));
    });
};

export const changeUserRole = (userId, roleId) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.put(`users/role/${userId}`, { roleId: roleId }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(changeUserRoleSuccess(res.data));
    }).catch(err => {
        dispatch(userError(err.message));
    });
};

export const resetchangeUserRoleState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_CHANGE_USER_ROLE_STATE
    })
};