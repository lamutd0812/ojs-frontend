import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, userId, firstname) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        firstname: firstname
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
    localStorage.removeItem('firstname');
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
            localStorage.setItem('firstname', res.data.firstname);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(res.data.token, res.data.userId, res.data.firstname));
            dispatch(checkAuthTimeout(60 * 60));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
};

export const register = (username, email, password, firstname,
    lastname, affiliation, biography) => (dispatch) => {
        dispatch(authStart());
        const registerData = {
            username: username,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            affiliation: affiliation,
            biography: biography
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
            const firstname = localStorage.getItem('firstname');
            dispatch(authSuccess(token, userId, firstname));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
};