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

const submissionStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const getCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        categories: action.categories,
        error: null
    });
};

const getSubmissionsByAuthorSuccess = (state, action) => {
    return updateObject(state, {
        submissions: action.submissions,
        loading: false,
        error: null
    });
};

const getSubmissionDetailSuccess = (state, action) => {
    return updateObject(state, {
        submission: action.submission,
        loading: false,
        error: null
    });
};

const createSubmissionSuccess = (state, action) => {
    return updateObject(state, {
        submission: action.submission,
        isSubmissionCreated: true,
        error: null
    });
};

const resetCreateSubmissionState = (state) => {
    return updateObject(state, {
        isSubmissionCreated: false,
        error: null
    })
};

const fetchSubmissionError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: true
    });
};

// Chief Editor
const getAllSubmissionsSuccess = (state, action) => {
    return updateObject(state, {
        submissions: action.submissions,
        loading: false,
        error: null
    });
};


const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMISSIONS_START: return submissionStart(state);
        case actionTypes.SUBMISSIONS_ERROR: return fetchSubmissionError(state, action);
        case actionTypes.GET_CATEGORIES_SUCCESS: return getCategoriesSuccess(state, action);
        case actionTypes.GET_SUBMISSIONS_BY_AUTHOR_SUCCESS: return getSubmissionsByAuthorSuccess(state, action);
        case actionTypes.GET_SUBMISSIONS_DETAIL_SUCCESS: return getSubmissionDetailSuccess(state, action);
        case actionTypes.CREATE_SUBMISSION_SUCCESS: return createSubmissionSuccess(state, action);
        case actionTypes.RESET_CREATE_SUBMISSION_STATE: return resetCreateSubmissionState(state);
        case actionTypes.GET_ALL_SUBMISSIONS_SUCCESS: return getAllSubmissionsSuccess(state, action);
        default: return state;
    }
};

export default submissionReducer;