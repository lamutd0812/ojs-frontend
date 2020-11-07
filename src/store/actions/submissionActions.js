import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const submissionStart = () => {
    return {
        type: actionTypes.SUBMISSIONS_START
    }
}

const getCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        categories: categories
    }
};

const getSubmissionsByAuthorSuccess = (submissions) => {
    return {
        type: actionTypes.GET_SUBMISSIONS_BY_AUTHOR_SUCCESS,
        submissions: submissions
    }
};

const getSubmissionDetailSuccess = (submission) => {
    return {
        type: actionTypes.GET_SUBMISSIONS_DETAIL_SUCCESS,
        submission: submission
    }
};

const createSubmissionSuccess = (submission) => {
    return {
        type: actionTypes.CREATE_SUBMISSION_SUCCESS,
        submission: submission
    }
};

const editSubmissionSuccess = (submission) => {
    return {
        type: actionTypes.EDIT_SUBMISSION_SUCCESS,
        submission: submission
    }
};

const deleteSubmissionSuccess = (message) => {
    return {
        type: actionTypes.DELETE_SUBMISSION_SUCCESS,
        message: message
    }
};

const submissionErrors = (error) => {
    return {
        type: actionTypes.SUBMISSIONS_ERROR,
        error: error
    }
};

// Chief Editor
const getAllSubmissionsSuccess = (submissions) => {
    return {
        type: actionTypes.GET_ALL_SUBMISSIONS_SUCCESS,
        submissions: submissions
    }
};

export const getCategories = () => (dispatch) => {
    axios.get('/categories')
        .then(res => {
            dispatch(getCategoriesSuccess(res.data.categories));
        })
        .catch(err => {
            dispatch(submissionErrors(err.message));
        });
};

export const getSubmissionsByAuthor = (authorId) => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(submissionStart());
    axios.get('/submissions/author/' + authorId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getSubmissionsByAuthorSuccess(res.data.submissions));
    }).catch(err => {
        dispatch(submissionErrors(err.message));
    });
};

export const getSubmissionDetail = (submissionId) => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(submissionStart());
    axios.get('/submissions/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getSubmissionDetailSuccess(res.data.submission));
    }).catch(err => {
        dispatch(submissionErrors(err.message));
    });
};

// Create Submission
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
        dispatch(submissionErrors(err.response.data.error));
    });
};

export const resetCreateSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_CREATE_SUBMISSION_STATE
    })
};

// Edit Submission
export const editSubmission = (submissionId, formData) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.put('/submissions/' + submissionId, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        dispatch(editSubmissionSuccess(res.data.submission));
    }).catch(err => {
        dispatch(submissionErrors(err.response.data.error));
    });
};

export const resetEditSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_EDIT_SUBMISSION_STATE
    })
};

// Delete Submission
export const deleteSubmission = (submissionId) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.delete('/submissions/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        dispatch(deleteSubmissionSuccess(res.data.message));
    }).catch(err => {
        dispatch(submissionErrors(err.response.data.error));
    });
};

export const resetDeleteSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_DELETE_SUBMISSION_STATE
    })
};

// Chief Editor get All Submissions
export const getAllSubmissions = () => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(submissionStart());
    axios.get('/submissions', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getAllSubmissionsSuccess(res.data.submissions));
    }).catch(err => {
        dispatch(submissionErrors(err.message));
    });
};