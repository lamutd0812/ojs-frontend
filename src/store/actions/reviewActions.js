import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const reviewProcessStart = () => {
    return {
        type: actionTypes.REVIEW_PROCESS_START
    };
};

const uploadStart = () => {
    return {
        type: actionTypes.UPLOAD_START
    }
};

const getAllEditorsSuccess = (editors) => {
    return {
        type: actionTypes.GET_ALL_EDITORS_SUCCESS,
        editors: editors
    };
};

const getAllReviewersSuccess = (reviewers) => {
    return {
        type: actionTypes.GET_ALL_REVIEWERS_SUCCESS,
        reviewers: reviewers
    };
};

const assignEditorSuccess = (message) => {
    return {
        type: actionTypes.ASSIGN_EDITOR_SUCCESS,
        message: message
    };
};

const assignReviewerSuccess = (message) => {
    return {
        type: actionTypes.ASSIGN_REVIEWER_SUCCESS,
        message: message
    };
};

const getEditorAssignmentBySubmissionSuccess = (editorAssignment) => {
    return {
        type: actionTypes.GET_EDITOR_ASSIGNMENT_BY_SUBMISSION_SUCCESS,
        editorAssignment: editorAssignment
    };
};

const getReviewerAssignmentsBySubmissionSuccess = (reviewerAssignments) => {
    return {
        type: actionTypes.GET_REVIEWER_ASSIGNMENTS_BY_SUBMISSION_SUCCESS,
        reviewerAssignments: reviewerAssignments
    };
};

const getMyEditorAssignmentsSuccess = (editorAssignments) => {
    return {
        type: actionTypes.GET_MY_EDITOR_ASSIGNMENTS_SUCCESS,
        editorAssignments: editorAssignments
    };
};

const getMyReviewerAssignmentsSuccess = (reviewerAssignments) => {
    return {
        type: actionTypes.GET_MY_REVIEWER_ASSIGNMENTS_SUCCESS,
        reviewerAssignments: reviewerAssignments
    };
};

const getMyReviewerAssignmentDetailSuccess = (reviewerAssignment) => {
    return {
        type: actionTypes.GET_MY_REVIEWER_ASSIGNMENT_DETAIL_SUCCESS,
        reviewerAssignment: reviewerAssignment
    };
};

const createReviewSubmissionSuccess = (message) => {
    return {
        type: actionTypes.CREATE_REVIEW_SUBMISSION_SUCCESS,
        message: message
    }
}

const editReviewSubmissionSuccess = (message) => {
    return {
        type: actionTypes.CREATE_REVIEW_SUBMISSION_SUCCESS,
        message: message
    }
}

const reviewProcessError = (error) => {
    return {
        type: actionTypes.REVIEW_PROCESS_ERROR,
        error: error
    };
};

// Chief Editor get All Editors
export const getAllEditors = (submissionId) => (dispatch, getState) => {
    dispatch(reviewProcessStart());
    const token = getState().auth.token;
    axios.get('/reviews/editors', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
            submissionId
        }
    }).then(res => {
        dispatch(getAllEditorsSuccess(res.data.editors));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Editor get All Reviewers
export const getAllReviewers = (submissionId) => (dispatch, getState) => {
    dispatch(reviewProcessStart());
    const token = getState().auth.token;
    axios.get('/reviews/reviewers', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
            submissionId
        }
    }).then(res => {
        dispatch(getAllReviewersSuccess(res.data.reviewers));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Chief Editor assign Editor
export const assignEditor = (submissionId, editorId, dueDate, message) => (dispatch, getState) => {
    const token = getState().auth.token;
    const reqBody = {
        submissionId: submissionId,
        editorId: editorId,
        dueDate: dueDate,
        message: message
    };
    axios.put('/reviews/assign-editor', reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(assignEditorSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

// Editor assign Reviewer
export const assignReviewer = (submissionId, reviewerId, dueDate, message) => (dispatch, getState) => {
    const token = getState().auth.token;
    const reqBody = {
        submissionId: submissionId,
        reviewerId: reviewerId,
        dueDate: dueDate,
        message: message
    };
    axios.put('/reviews/assign-reviewer', reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(assignReviewerSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetEditorAssignmentState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_EDITOR_ASSIGNMENT_STATE
    });
};

export const resetReviewerAssignmentState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_REVIEWER_ASSIGNMENT_STATE
    });
};

// CE and other roles get Editor Assignment by Submission
export const getEditorAssignmentBySubmission = (submissionId) => (dispatch, getState) => {
    ;
    const token = getState().auth.token;
    axios.get('/reviews/editor-assignments/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getEditorAssignmentBySubmissionSuccess(res.data.editorAssignment));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// CE and other roles get Reviewer Assignments by Submission
export const getReviewerAssignmentsBySubmission = (submissionId) => (dispatch, getState) => {
    ;
    const token = getState().auth.token;
    axios.get('/reviews/reviewer-assignments/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getReviewerAssignmentsBySubmissionSuccess(res.data.reviewerAssignments));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Editor get My Assignments
export const getMyEditorAssignments = () => (dispatch, getState) => {
    dispatch(reviewProcessStart());
    const token = getState().auth.token;
    axios.get('/reviews/editor-assignments/my/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getMyEditorAssignmentsSuccess(res.data.editorAssignments));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Reviewer get My Assignments
export const getMyReviewerAssignments = () => (dispatch, getState) => {
    dispatch(reviewProcessStart());
    const token = getState().auth.token;
    axios.get('/reviews/reviewer-assignments/my/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getMyReviewerAssignmentsSuccess(res.data.reviewerAssignments));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Reviewer get My Assignment Detail by Submission
export const getMyReviewerAssignmentDetail = (submissionId) => (dispatch, getState) => {
    dispatch(reviewProcessStart());
    const token = getState().auth.token;
    axios.get('/reviews/reviewer-assignments/my/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getMyReviewerAssignmentDetailSuccess(res.data.reviewerAssignment));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Reviewer create review for a submission
export const createReviewSubmission = (submissionId, reqBody) => (dispatch, getState) => {
    dispatch(uploadStart());
    const token = getState().auth.token;
    axios.post('/reviews/reviewer-submission/' + submissionId, reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(createReviewSubmissionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetCreateReviewSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_CREATE_REVIEW_SUBMISSION_STATE
    })
};

// Reviewer edit review for a submission
export const editReviewSubmission = (submissionId, formData) => (dispatch, getState) => {
    dispatch(uploadStart());
    const token = getState().auth.token;
    axios.put('/reviews/reviewer-submission/' + submissionId, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        dispatch(editReviewSubmissionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetEditReviewSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_EDIT_REVIEW_SUBMISSION_SUCCESS
    })
};