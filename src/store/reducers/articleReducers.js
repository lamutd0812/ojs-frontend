import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    articles: [],
    article: null,
    loading: false,
    error: false,
    total_items: 0,
    currentPage: 1,
    submissions: [],
};

const articleStart = (state) => {
    return updateObject(state, { loading: true, error: null });
};

const getAllArticlesSuccess = (state, action) => {
    return updateObject(state, {
        articles: action.articles,
        total_items: action.total,
        currentPage: action.currentPage,
        loading: false,
        error: null
    });
};

const getSingleArticleSuccess = (state, action) => {
    return updateObject(state, {
        article: action.article,
        loading: false,
        error: null
    })
};

const searchSubmissionsByKeywordSuccess = (state, action) => {
    return updateObject(state, {
        submissions: action.submissions,
        loading: false,
        error: null
    })
};

const getArticleBySubmissionSuccess = (state, action) => {
    return updateObject(state, {
        article: action.article,
        loading: false,
        error: null
    })
};

const updateDownloadedCountSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        error: null
    })
};

const articleError = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ARTICLE_START: return articleStart(state);
        case actionTypes.ARTICLE_ERROR: return articleError(state, action);

        case actionTypes.GET_ALL_ARTICLES_SUCCESS: return getAllArticlesSuccess(state, action);
        case actionTypes.GET_SINGLE_ARTICLE_SUCCESS: return getSingleArticleSuccess(state, action);

        case actionTypes.UPDATE_DOWNLOADED_COUNT_SUCCESS: return updateDownloadedCountSuccess(state);

        case actionTypes.SEARCH_SUBMISSIONS_SUCCESS: return searchSubmissionsByKeywordSuccess(state, action);
        case actionTypes.GET_ARTICLE_BY_SUBMISSION_SUCCESS: return getArticleBySubmissionSuccess(state, action);

        default: return state;
    }
};

export default articleReducer;