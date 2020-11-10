import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    categories: null,
    submissions: [],
    submission: null,
    fileUploading: false,
    isSubmissionCreated: false,
    isSubmissionEdited: false,
    isSubmissionDeleted: false,
    message: '',
    loading: false,
    error: null
};

const submissionStart = (state) => {
    return updateObject(state, { loading: true });
};

const uploadStart = (state) => {
    return updateObject(state, { fileUploading: true });
}

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
        fileUploading: false,
        error: null
    });
};

const resetCreateSubmissionState = (state) => {
    return updateObject(state, {
        isSubmissionCreated: false
    })
};

const editSubmissionSuccess = (state, action) => {
    return updateObject(state, {
        submission: action.submission,
        isSubmissionEdited: true,
        fileUploading: false,
        error: null
    });
};

const resetEditSubmissionState = (state) => {
    return updateObject(state, {
        isSubmissionEdited: false
    })
};

const deleteSubmissionSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        isSubmissionDeleted: true,
        error: null
    });
}

const resetDeleteSubmissionState = (state) => {
    return updateObject(state, {
        isSubmissionDeleted: false
    })
};

const fetchSubmissionError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fileUploading: false
        // loading: true
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
        case actionTypes.UPLOAD_START: return uploadStart(state);
        case actionTypes.SUBMISSIONS_ERROR: return fetchSubmissionError(state, action);

        case actionTypes.GET_CATEGORIES_SUCCESS: return getCategoriesSuccess(state, action);

        case actionTypes.GET_SUBMISSIONS_BY_AUTHOR_SUCCESS: return getSubmissionsByAuthorSuccess(state, action);

        case actionTypes.GET_SUBMISSIONS_DETAIL_SUCCESS: return getSubmissionDetailSuccess(state, action);

        case actionTypes.CREATE_SUBMISSION_SUCCESS: return createSubmissionSuccess(state, action);
        case actionTypes.RESET_CREATE_SUBMISSION_STATE: return resetCreateSubmissionState(state);

        case actionTypes.EDIT_SUBMISSION_SUCCESS: return editSubmissionSuccess(state, action);
        case actionTypes.RESET_EDIT_SUBMISSION_STATE: return resetEditSubmissionState(state);

        case actionTypes.DELETE_SUBMISSION_SUCCESS: return deleteSubmissionSuccess(state, action);
        case actionTypes.RESET_DELETE_SUBMISSION_STATE: return resetDeleteSubmissionState(state);

        case actionTypes.GET_ALL_SUBMISSIONS_SUCCESS: return getAllSubmissionsSuccess(state, action);
        default: return state;
    }
};

export default submissionReducer;