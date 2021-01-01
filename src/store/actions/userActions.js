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