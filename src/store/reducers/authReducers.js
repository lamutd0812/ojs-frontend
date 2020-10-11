import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
    firstname: localStorage.getItem('firstname') ? localStorage.getItem('firstname') : null,
    error: null,
    loading: false,
    isSignedUp: false
};

const authStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        firstname: action.firstname,
        error: null,
        loading: false
    });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        isSignedUp: action.isSignedUp,
        error: null,
        loading: false
    })
};

const resetRegisterState = (state, action) => {
    return updateObject(state, {
        isSignedUp: false,
        error: null,
        loading: false
    })
};

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null,
        firstname: null
    });
};


const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.RESET_REGISTER_STATE: return resetRegisterState(state, action);
        default: return state;
    }
};

export default authReducers;