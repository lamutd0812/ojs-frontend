import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    categories: null,
    submissions: [],
    submission: null,
    isSubmissionCreated: false,
    loading: true,
    error: null
};

const getCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        categories: action.categories,
        error: null
    });
};

const getCategoriesFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const getSubmissionsByAuthorSuccess = (state, action) => {
    return updateObject(state, {
        submissions: action.submissions,
        loading: false,
        error: null
    });
};

const getSubmissionsByAuthorFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const getSubmissionDetailSuccess = (state, action) => {
    return updateObject(state, {
        submission: action.submission,
        loading: false,
        error: null
    });
};

const getSubmissionDetailFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const createSubmissionSuccess = (state, action) => {
    return updateObject(state, {
        submission: action.submission,
        isSubmissionCreated: true,
        error: null
    });
};

const createSubmissionFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const resetCreateSubmissionState = (state) => {
    return updateObject(state, {
        isSubmissionCreated: false,
        error: null
    })
};

// Chief Editor
const getAllSubmissionsSuccess = (state, action) => {
    return updateObject(state, {
        submissions: action.submissions,
        loading: false,
        error: null
    });
};

const getAllSubmissionsFailed = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_SUCCESS: return getCategoriesSuccess(state, action);
        case actionTypes.GET_CATEGORIES_FAILED: return getCategoriesFailed(state, action);
        case actionTypes.GET_SUBMISSIONS_BY_AUTHOR_SUCCESS: return getSubmissionsByAuthorSuccess(state, action);
        case actionTypes.GET_SUBMISSIONS_BY_AUTHOR_FAILED: return getSubmissionsByAuthorFailed(state, action);
        case actionTypes.GET_SUBMISSIONS_DETAIL_SUCCESS: return getSubmissionDetailSuccess(state, action);
        case actionTypes.GET_SUBMISSIONS_DETAIL_FAILED: return getSubmissionDetailFailed(state, action);
        case actionTypes.CREATE_SUBMISSION_SUCCESS: return createSubmissionSuccess(state, action);
        case actionTypes.CREATE_SUBMISSION_FAILED: return createSubmissionFailed(state, action);
        case actionTypes.RESET_CREATE_SUBMISSION_STATE: return resetCreateSubmissionState(state);
        case actionTypes.GET_ALL_SUBMISSIONS_SUCCESS: return getAllSubmissionsSuccess(state,action);
        case actionTypes.GET_ALL_SUBMISSIONS_FAILED: return getAllSubmissionsFailed(state,action);
        default: return state;
    }
};

export default submissionReducer;