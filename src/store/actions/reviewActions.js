import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const getAllEditorsSuccess = (editors) => {
    return {
        type: actionTypes.GET_ALL_EDITORS_SUCCESS,
        editors: editors
    };
};

const assignEditorSuccess = (message) => {
    return {
        type: actionTypes.ASSIGN_EDITOR_SUCCESS,
        message: message
    };
};

const getEditorAssignmentSuccess = (editorAssignment) => {
    return {
        type: actionTypes.GET_EDITOR_ASSIGNMENT_SUCCESS,
        editorAssignment: editorAssignment
    };
};

const reviewProcessError = (error) => {
    return {
        type: actionTypes.REVIEW_PROCESS_ERROR,
        error: error
    };
};

// Chief Editor get All Editors
export const getAllEditors = () => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.get('/reviews/editors', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getAllEditorsSuccess(res.data.editors));
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

export const resetEditorAssignmentState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_EDITOR_ASSIGNMENT_STATE
    })
};

// CE and other roles get Editor Assignment
export const getEditorAssignment = (submissionId) => (dispatch, getState) => {
    const token = getState().auth.token;
    axios.get('/reviews/editor-assignment/' + submissionId, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(getEditorAssignmentSuccess(res.data.editorAssignment));
    }).catch(err => {
        dispatch(reviewProcessError(err.message));
    });
};