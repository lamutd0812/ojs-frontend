import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    editors: [],
    reviewers: [],
    isEditorAssigned: false,
    isReviewerAssigned: false,
    editorAssignments: [],
    editorAssignment: null,
    reviewerAssignments: [],
    reviewerAssignment: null,
    message: null,
    error: null,
    loading: false,
};

const reviewProcessStart = (state) => {
    return updateObject(state, { loading: true, error: null });
};

// Chief Editor get all Editors
const getAllEditorsSuccess = (state, action) => {
    return updateObject(state, {
        editors: action.editors,
        loading: false,
        error: null
    });
};

// Editor get all Reviewers
const getAllReviewersSuccess = (state, action) => {
    return updateObject(state, {
        reviewers: action.reviewers,
        loading: false,
        error: null
    });
};

// Chief Editor assign Editors
const assignEditorSuccess = (state, action) => {
    return updateObject(state, {
        isEditorAssigned: true,
        responseMessage: action.message,
        error: null
    });
}

const resetEditorAssignmentState = (state) => {
    return updateObject(state, {
        isEditorAssigned: false,
        error: null
    });
};

// Editor assign Reviewers
const assignReviewerSuccess = (state, action) => {
    return updateObject(state, {
        isReviewerAssigned: true,
        responseMessage: action.message,
        error: null
    });
}

const resetReviewerAssignmentState = (state) => {
    return updateObject(state, {
        isReviewerAssigned: false,
        error: null
    });
};

// Get Editor Assignment By Submission
const getEditorAssignmentBySubmissionSuccess = (state, action) => {
    return updateObject(state, {
        editorAssignment: action.editorAssignment,
        error: null
    });
};

// Get Reviewer Assignments By Submission
const getReviewerAssignmentsBySubmissionSuccess = (state, action) => {
    return updateObject(state, {
        reviewerAssignments: action.reviewerAssignments,
        error: null
    });
};

// Editor get my Assignments
const getMyEditorAssignmentsSuccess = (state, action) => {
    return updateObject(state, {
        editorAssignments: action.editorAssignments,
        loading: false,
        error: null
    });
};

// Reviewer get my Assignments
const getMyReviewerAssignmentsSuccess = (state, action) => {
    return updateObject(state, {
        reviewerAssignments: action.reviewerAssignments,
        loading: false,
        error: null
    });
};

// Reviewer get my Assignment Detail by Submission
const getMyReviewerAssignmentDetailSuccess = (state, action) => {
    return updateObject(state, {
        reviewerAssignment: action.reviewerAssignment,
        loading: false,
        error: null
    });
};

// Reviewer create review for a submission
const createReviewSubmissionSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        loading: false,
        error: null
    });
};

// Reviewer edit review for a submission
const editReviewSubmissionSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        loading: false,
        error: null
    });
};

const reviewProcessError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: true
    });
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REVIEW_PROCESS_START: return reviewProcessStart(state);
        case actionTypes.REVIEW_PROCESS_ERROR: return reviewProcessError(state, action);

        case actionTypes.GET_ALL_EDITORS_SUCCESS: return getAllEditorsSuccess(state, action);
        case actionTypes.ASSIGN_EDITOR_SUCCESS: return assignEditorSuccess(state, action);
        case actionTypes.RESET_EDITOR_ASSIGNMENT_STATE: return resetEditorAssignmentState(state);

        case actionTypes.GET_EDITOR_ASSIGNMENT_BY_SUBMISSION_SUCCESS: return getEditorAssignmentBySubmissionSuccess(state, action);
        case actionTypes.GET_REVIEWER_ASSIGNMENTS_BY_SUBMISSION_SUCCESS: return getReviewerAssignmentsBySubmissionSuccess(state, action);
        case actionTypes.GET_MY_EDITOR_ASSIGNMENTS_SUCCESS: return getMyEditorAssignmentsSuccess(state, action);

        case actionTypes.GET_ALL_REVIEWERS_SUCCESS: return getAllReviewersSuccess(state, action);
        case actionTypes.ASSIGN_REVIEWER_SUCCESS: return assignReviewerSuccess(state, action);
        case actionTypes.RESET_REVIEWER_ASSIGNMENT_STATE: return resetReviewerAssignmentState(state);

        case actionTypes.GET_MY_REVIEWER_ASSIGNMENTS_SUCCESS: return getMyReviewerAssignmentsSuccess(state, action);
        case actionTypes.GET_MY_REVIEWER_ASSIGNMENT_DETAIL_SUCCESS: return getMyReviewerAssignmentDetailSuccess(state, action)

        case actionTypes.CREATE_REVIEW_SUBMISSION_SUCCESS: return createReviewSubmissionSuccess(state, action);
        case actionTypes.EDIT_REVIEW_SUBMISSION_SUCCESS: return editReviewSubmissionSuccess(state, action);

        default: return state;
    }
};

export default reviewReducer;