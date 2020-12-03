import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, userId, fullname, avatar, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        fullname: fullname,
        avatar: avatar,
        role: role
    };
};

const registerSuccess = (message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        isSignedUp: true
    }
}

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    // clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('fullname');
    localStorage.removeItem('avatar');
    localStorage.removeItem('role');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout);
    }, expirationTime * 1000);
};

const getMyNotificationsSuccess = (notifications) => {
    return {
        type: actionTypes.GET_MY_NOTIFICATIONS_SUCCESS,
        notifications: notifications
    }
};

// ---------------------------------|Axios|------------------------------------------
export const auth = (username, password) => (dispatch) => {
    dispatch(authStart());
    const authData = {
        username: username,
        password: password
    };
    axios.post('/auth/signin', authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + 60 * 60 * 12 * 1000); // 12h
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('fullname', res.data.fullname);
            localStorage.setItem('avatar', res.data.avatar);
            localStorage.setItem('role', JSON.stringify(res.data.role));
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(res.data.token, res.data.userId, res.data.fullname, res.data.avatar, res.data.role));
            dispatch(checkAuthTimeout(60 * 60));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
};

export const register = (username, email, password, firstname,
    lastname, affiliation, biography, toBeReviewer) => (dispatch) => {
        dispatch(authStart());
        const registerData = {
            username: username,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            affiliation: affiliation,
            biography: biography,
            toBeReviewer: toBeReviewer
        };
        axios.put('/auth/signup', registerData)
            .then(res => {
                dispatch(registerSuccess(res.data.message));
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error));
            });
    };

export const resetRegisterState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_REGISTER_STATE
    })
};

//keep auth state
export const keepAuthState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(Date.parse(localStorage.getItem('expirationDate')));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            const fullname = localStorage.getItem('fullname');
            const avatar = localStorage.getItem('avatar');
            const role = JSON.parse(localStorage.getItem('role'));
            const notifications =  JSON.parse(localStorage.getItem('notifications'));
            dispatch(getMyNotificationsSuccess(notifications));
            dispatch(authSuccess(token, userId, fullname, avatar, role));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
};

// Get My Notifications
export const getMyNotifications = () => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.get('/auth/notifications/my', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        localStorage.setItem('notifications', JSON.stringify(res.data.notifications));
        dispatch(getMyNotificationsSuccess(res.data.notifications));
    }).catch(err => {
        dispatch(authFailed(err.response.data.error));
    });
};