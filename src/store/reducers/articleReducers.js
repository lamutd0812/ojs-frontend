import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    articles: [],
    latest_articles: [],
    most_viewed_articles: [],
    most_downloaded_articles: [],
    article: null,
    loading: false,
    error: false,
    total_items: 0,
    currentPage: 1,
    articles_search: [],
    related_articles: [],
    comments: [],
    message: '',
    isCommentPosted: false,
    isReplyPosted: false
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

const getLatestArticlesHomeSuccess = (state, action) => {
    return updateObject(state, {
        latest_articles: action.articles,
        loading: false,
        error: null
    });
};

const getMostViewedArticlesHomeSuccess = (state, action) => {
    return updateObject(state, {
        most_viewed_articles: action.articles,
        loading: false,
        error: null
    });
};

const getMostDownloadedArticlesHomeSuccess = (state, action) => {
    return updateObject(state, {
        most_downloaded_articles: action.articles,
        loading: false,
        error: null
    });
};

const getSingleArticleSuccess = (state, action) => {
    return updateObject(state, {
        article: action.article,
        loading: false,
        error: null
    });
};

const getCommentsOfArticleSuccess = (state, action) => {
    return updateObject(state, {
        comments: action.comments
    });
};

const postCommentSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        isCommentPosted: true,
    });
};

const resetPostCommentState = state => {
    return updateObject(state, {
        isCommentPosted: false
    });
}

const replyACommentSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        isReplyPosted: true
    });
};

const resetreplyACommentState = state => {
    return updateObject(state, {
        isReplyPosted: false
    });
}

const getRelatedArticlesSuccess = (state, action) => {
    return updateObject(state, {
        related_articles: action.relatedArticles,
        loading: false,
        error: null
    });
};

const searchArticlesByKeywordSuccess = (state, action) => {
    return updateObject(state, {
        articles_search: action.articles,
        loading: false,
        error: null
    });
};

const updateDownloadedCountSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        error: null,
    });
};

const articleError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        isCommentPosted: false,
        isReplyPosted: false
    });
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ARTICLE_START: return articleStart(state);
        case actionTypes.ARTICLE_ERROR: return articleError(state, action);

        case actionTypes.GET_ALL_ARTICLES_SUCCESS: return getAllArticlesSuccess(state, action);
        case actionTypes.GET_LATEST_ARTICLES_SUCCESS: return getLatestArticlesHomeSuccess(state, action);
        case actionTypes.GET_MOST_VIEWED_ARTICLES_SUCCESS: return getAllArticlesSuccess(state, action);
        case actionTypes.GET_MOST_VIEWED_ARTICLES_HOME_SUCCESS: return getMostViewedArticlesHomeSuccess(state, action);
        case actionTypes.GET_MOST_DOWNLOADED_ARTICLES_SUCCESS: return getAllArticlesSuccess(state, action);
        case actionTypes.GET_MOST_DOWNLOADED_ARTICLES_HOME_SUCCESS: return getMostDownloadedArticlesHomeSuccess(state, action);

        case actionTypes.GET_SINGLE_ARTICLE_SUCCESS: return getSingleArticleSuccess(state, action);
        case actionTypes.GET_COMMENTS_SUCCESS: return getCommentsOfArticleSuccess(state, action);

        case actionTypes.POST_COMMENTS_SUCCESS: return postCommentSuccess(state, action);
        case actionTypes.RESET_POST_COMMENTS_STATE: return resetPostCommentState(state);
        case actionTypes.REPLY_A_COMMENT_SUCCESS: return replyACommentSuccess(state, action);
        case actionTypes.RESET_REPLY_A_COMMENT_STATE: return resetreplyACommentState(state, action);

        case actionTypes.GET_RELATED_ARTICLES_SUCCESS: return getRelatedArticlesSuccess(state, action);

        case actionTypes.UPDATE_DOWNLOADED_COUNT_SUCCESS: return updateDownloadedCountSuccess(state);

        case actionTypes.SEARCH_ARTICLES_SUCCESS: return searchArticlesByKeywordSuccess(state, action);

        default: return state;
    }
};

export default articleReducer;