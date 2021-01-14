import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    allArticles: [],
    articles: [],
    loading: false,
    error: false,
    total: 0,
    currentPage: 1,
    publishedArticle: null
};

const articlesCrawlStart = (state) => {
    return updateObject(state, { loading: true, error: null });
};

const articlesCrawlSuccess = (state, action) => {
    return updateObject(state, {
        allArticles: action.allArticles,
        articles: action.articles,
        total: action.total,
        currentPage: action.currentPage,
        loading: false,
        error: null
    });
};

const jumpToAnotherPageSuccess = (state, action) => {
    const page = +action.currentPage;
    const ITEMS_PER_PAGE = 10;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const limit = ITEMS_PER_PAGE;

    return updateObject(state, {
        currentPage: +action.currentPage,
        articles: state.allArticles.slice(skip, skip + limit)
    })
}

const getPublishedArticleByDOISuccess = (state, action) => {
    return updateObject(state, {
        publishedArticle: action.publishedArticle,
        loading: false,
        error: null
    });
};

const articlesCrawlError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const vastReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ARTICLES_CRAWL_START: return articlesCrawlStart(state);
        case actionTypes.ARTICLES_CRAWL_ERROR: return articlesCrawlError(state, action);
        case actionTypes.ARTICLES_CRAWL_SUCCESS: return articlesCrawlSuccess(state, action);
        case actionTypes.JUMP_TO_PAGE_SUCCESS: return jumpToAnotherPageSuccess(state, action);

        case actionTypes.GET_PUBLISHED_ARTICLE_BY_DOI_SUCCESS: return getPublishedArticleByDOISuccess(state, action);

        default: return state;
    }
};

export default vastReducer;