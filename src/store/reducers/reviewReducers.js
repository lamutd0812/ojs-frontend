import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    editors: [],
    error: null,
    loading: true,
    isEditorAssigned: false,
    responseMessage: null
};

// Chief Editor get all Editors
const getAllEditorsSuccess = (state, action) => {
    return updateObject(state, {
        editors: action.editors,
        error: null
    });
};

// Chief Editor Assign editors
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
    })
};

const reviewProcessError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: true
    });
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_EDITORS_SUCCESS: return getAllEditorsSuccess(state, action);
        case actionTypes.REVIEW_PROCESS_ERROR: return reviewProcessError(state, action);
        case actionTypes.ASSIGN_EDITOR_SUCCESS: return assignEditorSuccess(state, action);
        case actionTypes.RESET_EDITOR_ASSIGNMENT_STATE: return resetEditorAssignmentState(state);
        default: return state;
    }
};

export default reviewReducer;