import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    articles: [],
    loading: false,
    error: false,
    total: 0,
    currentPage: 1,
};

const articlesCrawlStart = (state) => {
    return updateObject(state, { loading: true, error: null });
};

const articlesCrawlSuccess = (state, action) => {
    return updateObject(state, {
        articles: action.articles,
        total: action.total,
        currentPage: action.currentPage,
        loading: false,
        error: null
    });
}

const articlesCrawlError = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const vastReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ARTICLES_CRAWL_START: return articlesCrawlStart(state);
        case actionTypes.ARTICLES_CRAWL_ERROR: return articlesCrawlError(state, action);
        case actionTypes.ARTICLES_CRAWL_SUCCESS: return articlesCrawlSuccess(state, action);

        default: return state;
    }
};

export default vastReducer;