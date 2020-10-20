import axios from '../../utils/axios';
import * as actionTypes from '../actions/actionTypes';

const getCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        categories: categories
    }
};

const getCategoriesFailed = (error) => {
    return {
        type: actionTypes.GET_CATEGORIES_FAILED,
        error: error
    }
};

const createSubmissionSuccess = (submission) => {
    return {
        type: actionTypes.CREATE_SUBMISSION_SUCCESS,
        submission: submission
    }
};

const createSubmissionFailed = (error) => {
    return {
        type: actionTypes.CREATE_SUBMISSION_FAILED,
        error: error
    }
};

export const getCategories = () => (dispatch) => {
    axios.get('/categories')
        .then(res => {
            dispatch(getCategoriesSuccess(res.data.categories));
        })
        .catch(err => {
            dispatch(getCategoriesFailed(err));
        });
};

export const createSubmission = (formData) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.post('/submissions', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        dispatch(createSubmissionSuccess(res.data.submission));
    }).catch(err => {
        dispatch(createSubmissionFailed(err.response.data.error));
    });
};

export const resetCreateSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_CREATE_SUBMISSION_STATE
    })
};