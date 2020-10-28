import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

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

const getSubmissionsByAuthorSuccess = (submissions) => {
    return {
        type: actionTypes.GET_SUBMISSIONS_BY_AUTHOR_SUCCESS,
        submissions: submissions
    }
};

const getSubmissionsByAuthorFailed = (error) => {
    return {
        type: actionTypes.GET_SUBMISSIONS_BY_AUTHOR_FAILED,
        error: error
    }
};

const getSubmissionDetailSuccess = (submission) => {
    return {
        type: actionTypes.GET_SUBMISSIONS_DETAIL_SUCCESS,
        submission: submission
    }
};

const getSubmissionDetailFailed = (error) => {
    return {
        type: actionTypes.GET_SUBMISSIONS_DETAIL_FAILED,
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

export const getSubmissionsByAuthor = (authorId) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.get('/submissions/author/' + authorId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getSubmissionsByAuthorSuccess(res.data.submissions));
    }).catch(err => {
        dispatch(getSubmissionsByAuthorFailed(err.response.data.error));
    });
}

export const getSubmissionDetail = (submissionId) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.get('/submissions/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getSubmissionDetailSuccess(res.data.submission));
    }).catch(err => {
        dispatch(getSubmissionDetailFailed(err.response.data.error));
    });
}

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