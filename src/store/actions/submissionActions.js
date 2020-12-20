import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const submissionStart = () => {
    return {
        type: actionTypes.SUBMISSIONS_START
    };
};

const uploadStart = () => {
    return {
        type: actionTypes.UPLOAD_START
    }
};

const getCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        categories: categories
    }
};

const getReviewerDecisionsSuccess = (reviewerDecisions) => {
    return {
        type: actionTypes.GET_REVIEWER_DECISIONS_SUCCESS,
        reviewerDecisions: reviewerDecisions
    }
};

const getEditorDecisionsSuccess = (editorDecisions) => {
    return {
        type: actionTypes.GET_EDITOR_DECISIONS_SUCCESS,
        editorDecisions: editorDecisions
    }
};

const getSubmissionsByAuthorSuccess = (data) => {
    return {
        type: actionTypes.GET_SUBMISSIONS_BY_AUTHOR_SUCCESS,
        submissions: data.submissions,
        total: data.total,
        currentPage: data.currentPage
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


// Chief Editor
const getAllSubmissionsSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_SUBMISSIONS_SUCCESS,
        submissions: data.submissions,
        total: data.total,
        currentPage: data.currentPage
    }
};

const searchSubmissionsSuccess = (data) => {
    return {
        type: actionTypes.SEARCH_SUBMISSIONS_SUCCESS,
        submissions: data.submissions,
        total: data.total,
        currentPage: data.currentPage
    }
};

const submissionErrors = (error) => {
    return {
        type: actionTypes.SUBMISSIONS_ERROR,
        error: error
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

export const getReviewerDecisions = () => (dispatch) => {
    axios.get('/decisions/reviewer')
        .then(res => {
            dispatch(getReviewerDecisionsSuccess(res.data.reviewerDecisions));
        })
        .catch(err => {
            dispatch(submissionErrors(err.message));
        });
};

export const getEditorDecisions = () => (dispatch) => {
    axios.get('/decisions/editor')
        .then(res => {
            dispatch(getEditorDecisionsSuccess(res.data.editorDecisions));
        })
        .catch(err => {
            dispatch(submissionErrors(err.message));
        });
};

export const getSubmissionsByAuthor = (authorId, page, limit) => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(submissionStart());
    axios.get('/submissions/author/' + authorId + '?page=' + page + '&limit=' + limit, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getSubmissionsByAuthorSuccess(res.data));
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
    dispatch(uploadStart());
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
    dispatch(uploadStart());
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

// Chief Editor Get All Submissions
export const getAllSubmissions = (page, limit) => (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(submissionStart());
    axios.get('/submissions?page=' + page + '&limit=' + limit, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getAllSubmissionsSuccess(res.data));
    }).catch(err => {
        dispatch(submissionErrors(err.message));
    });
};

// Chief Editor Search Submissions
export const searchSubmissions = (page, limit, keyword) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.get('/submissions/search/all?page=' + page + '&limit=' + limit + '&keyword=' + keyword, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(searchSubmissionsSuccess(res.data));
    }).catch(err => {
        dispatch(submissionErrors(err.message));
    });
};