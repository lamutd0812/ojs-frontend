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

// const getReviewerAssignmentsBySubmissionSuccess = (reviewerAssignments) => {
//     return {
//         type: actionTypes.GET_REVIEWER_ASSIGNMENTS_BY_SUBMISSION_SUCCESS,
//         reviewerAssignments: reviewerAssignments
//     };
// };

const getMyEditorAssignmentsSuccess = (data) => {
    return {
        type: actionTypes.GET_MY_EDITOR_ASSIGNMENTS_SUCCESS,
        editorAssignments: data.editorAssignments,
        total: data.total,
        currentPage: data.currentPage
    };
};

const getMyReviewerAssignmentsSuccess = (data) => {
    return {
        type: actionTypes.GET_MY_REVIEWER_ASSIGNMENTS_SUCCESS,
        reviewerAssignments: data.reviewerAssignments,
        total: data.total,
        currentPage: data.currentPage
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
        type: actionTypes.EDIT_REVIEW_SUBMISSION_SUCCESS,
        message: message
    }
}

const createEditorSubmissionSuccess = (message) => {
    return {
        type: actionTypes.CREATE_EDITOR_SUBMISSION_SUCCESS,
        message: message
    }
}

const editEditorSubmissionSuccess = (message) => {
    return {
        type: actionTypes.EDIT_EDITOR_SUBMISSION_SUCCESS,
        message: message
    }
}

const requestAuthorRevisionSuccess = (message) => {
    return {
        type: actionTypes.REQUEST_AUTHOR_REVISION_SUCCESS,
        message: message
    }
}

const getAuthorAssignmentSuccess = (authorAssignment) => {
    return {
        type: actionTypes.GET_AUTHOR_ASSIGNMENT_SUCCESS,
        authorAssignment: authorAssignment
    };
};

const createAuthorRevisionSuccess = (submission) => {
    return {
        type: actionTypes.AUTHOR_SUBMIT_REVISION_SUCCESS,
        submission: submission
    }
};

const acceptSubmissionSuccess = (message) => {
    return {
        type: actionTypes.ACCEPT_SUBMISSION_SUCCESS,
        message: message
    }
}

const declineSubmissionSuccess = (message) => {
    return {
        type: actionTypes.DECLINE_SUBMISSION_SUCCESS,
        message: message
    }
}

const getChiefEditorSubmissionSuccess = (chiefEditorSubmission) => {
    return {
        type: actionTypes.GET_CE_SUBMISSION_SUCCESS,
        chiefEditorSubmission: chiefEditorSubmission
    };
};

// Error
const reviewProcessError = (error) => {
    return {
        type: actionTypes.REVIEW_PROCESS_ERROR,
        error: error
    };
};

// --------------------------------| Axios |-------------------------------------

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
export const assignEditor = (reqBody) => (dispatch, getState) => {
    const token = getState().auth.token;
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
export const assignReviewer = (reqBody) => (dispatch, getState) => {
    const token = getState().auth.token;
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

// Editor get My Assignments
export const getMyEditorAssignments = (page, limit) => (dispatch, getState) => {
    dispatch(reviewProcessStart());
    const token = getState().auth.token;
    axios.get('/reviews/editor-assignments/my/all?page=' + page + '&limit=' + limit, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getMyEditorAssignmentsSuccess(res.data));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Reviewer get My Assignments
export const getMyReviewerAssignments = (page, limit) => (dispatch, getState) => {
    dispatch(reviewProcessStart());
    const token = getState().auth.token;
    axios.get('/reviews/reviewer-assignments/my/all?page=' + page + '&limit=' + limit, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getMyReviewerAssignmentsSuccess(res.data));
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
export const editReviewSubmission = (submissionId, reqBody) => (dispatch, getState) => {
    dispatch(uploadStart());
    const token = getState().auth.token;
    axios.put('/reviews/reviewer-submission/' + submissionId, reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
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

// Editor create review for a submission
export const createEditorSubmission = (submissionId, reqBody) => (dispatch, getState) => {
    dispatch(uploadStart());
    const token = getState().auth.token;
    axios.post('/reviews/editor-submission/' + submissionId, reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(createEditorSubmissionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetCreateEditorSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_CREATE_EDITOR_SUBMISSION_STATE
    })
};

// Editor edit review for a submission
export const editEditorSubmission = (submissionId, reqBody) => (dispatch, getState) => {
    dispatch(uploadStart());
    const token = getState().auth.token;
    axios.put('/reviews/editor-submission/' + submissionId, reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(editEditorSubmissionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetEditEditorSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_EDIT_EDITOR_SUBMISSION_SUCCESS
    })
};

// Editor request author revision
export const requestAuthorRevision = (submissionId, reqBody) => (dispatch, getState) => {
    dispatch(uploadStart());
    const token = getState().auth.token;
    axios.post('/reviews/request-author-revision/' + submissionId, reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(requestAuthorRevisionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetRequestAuthorRevisionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_REQUEST_AUTHOR_REVISION_STATE
    })
};

// Editor and Author get Author Assignment by Submission
export const getAuthorAssignmentBySubmission = (submissionId) => (dispatch, getState) => {
    ;
    const token = getState().auth.token;
    axios.get('/reviews/author-assignment/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getAuthorAssignmentSuccess(res.data.authorAssignment));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};

// Author Submit Revision of Submissison
export const authorCreateRevision = (submissionId, formData) => (dispatch, getState) => {
    dispatch(uploadStart());
    const token = getState().auth.token;
    axios.put('/reviews/author-assignment/' + submissionId, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        dispatch(createAuthorRevisionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetAuthorRevisionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_SUBMIT_REVISION_STATE
    })
};

// Chief Editor Accept or Decline Submisison
export const acceptSubmisison = (submissionId, content, authorEmail, htmlContent) => (dispatch, getState) => {
    const token = getState().auth.token;
    const reqBody = {
        content: content,
        authorEmail: authorEmail,
        htmlContent: htmlContent
    };
    axios.put('/reviews/accept-submission/' + submissionId, reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(acceptSubmissionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetAcceptSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_ACCEPT_SUBMISSION_STATE
    });
};

export const declineSubmisison = (submissionId, content, authorEmail, htmlContent) => (dispatch, getState) => {
    const token = getState().auth.token;
    const reqBody = {
        content: content,
        authorEmail: authorEmail,
        htmlContent: htmlContent
    };
    axios.put('/reviews/decline-submission/' + submissionId, reqBody, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(declineSubmissionSuccess(res.data.message));
    }).catch(err => {
        dispatch(reviewProcessError(err.response.data.error));
    });
};

export const resetDeclineSubmissionState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_DECLINE_SUBMISSION_STATE
    });
};

// All: Get Chief Editor Submission
export const getChiefEditorSubmission = (submissionId) => (dispatch, getState) => {
    ;
    const token = getState().auth.token;
    axios.get('/reviews/chief-editor-submission/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getChiefEditorSubmissionSuccess(res.data.chiefEditorSubmission));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};