import axios from '../../utils/axios';
import * as actionTypes from './actionTypes';

const articleStart = () => {
    return {
        type: actionTypes.ARTICLE_START
    };
};

const getAllArticlesSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_ARTICLES_SUCCESS,
        articles: data.articles,
        total: data.total,
        currentPage: data.currentPage,
    }
};

const getLatestArticlesHomeSuccess = (data) => {
    return {
        type: actionTypes.GET_LATEST_ARTICLES_SUCCESS,
        articles: data.articles,
    }
};

const getMostViewedArticlesSuccess = (data) => {
    return {
        type: actionTypes.GET_MOST_VIEWED_ARTICLES_SUCCESS,
        articles: data.articles,
        total: data.total,
        currentPage: data.currentPage,
    }
};

const getMostViewedArticlesHomeSuccess = (data) => {
    return {
        type: actionTypes.GET_MOST_VIEWED_ARTICLES_HOME_SUCCESS,
        articles: data.articles,
    }
};

const getMostDownloadedArticlesSuccess = (data) => {
    return {
        type: actionTypes.GET_MOST_DOWNLOADED_ARTICLES_SUCCESS,
        articles: data.articles,
        total: data.total,
        currentPage: data.currentPage,
    }
};

const getMostDownloadedArticlesHomeSuccess = (data) => {
    return {
        type: actionTypes.GET_MOST_DOWNLOADED_ARTICLES_HOME_SUCCESS,
        articles: data.articles,
    }
};

const getSingleArticleSuccess = (article) => {
    return {
        type: actionTypes.GET_SINGLE_ARTICLE_SUCCESS,
        article: article
    }
};

const getRelatedArticlesSuccess = (data) => {
    return {
        type: actionTypes.GET_RELATED_ARTICLES_SUCCESS,
        relatedArticles: data.relatedArticles,
        total: data.total,
        currentPage: data.currentPage,
    }
};

const updateDownloadCountSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_DOWNLOADED_COUNT_SUCCESS
    }
};

const searchArticlesSuccess = (articles) => {
    return {
        type: actionTypes.SEARCH_ARTICLES_SUCCESS,
        articles: articles
    }
}

const articleError = (error) => {
    return {
        type: actionTypes.ARTICLE_ERROR,
        error: error
    }
};

export const getAllArticles = (page, limit) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles?page=' + page + '&limit=' + limit)
        .then(res => {
            dispatch(getAllArticlesSuccess(res.data));
        })
        .catch(err => {
            dispatch(articleError(err.message));
        });
};

export const getLatestArticlesHome = (page, limit) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles?page=' + page + '&limit=' + limit)
        .then(res => {
            dispatch(getLatestArticlesHomeSuccess(res.data));
        })
        .catch(err => {
            dispatch(articleError(err.message));
        });
};

export const getMostViewedArticles = (page, limit) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles/most-viewed?page=' + page + '&limit=' + limit)
        .then(res => {
            dispatch(getMostViewedArticlesSuccess(res.data));
        })
        .catch(err => {
            dispatch(articleError(err.message));
        });
};

export const getMostViewedArticlesHome = (page, limit) => (dispatch) => {
    axios.get('/articles/most-viewed?page=' + page + '&limit=' + limit)
        .then(res => {
            dispatch(getMostViewedArticlesHomeSuccess(res.data));
        })
        .catch(err => {
            dispatch(articleError(err.message));
        });
};

export const getMostDownloadedArticles = (page, limit) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles/most-downloaded?page=' + page + '&limit=' + limit)
        .then(res => {
            dispatch(getMostDownloadedArticlesSuccess(res.data));
        })
        .catch(err => {
            dispatch(articleError(err.message));
        });
};

export const getMostDownloadedArticlesHome = (page, limit) => (dispatch) => {
    axios.get('/articles/most-downloaded?page=' + page + '&limit=' + limit)
        .then(res => {
            dispatch(getMostDownloadedArticlesHomeSuccess(res.data));
        })
        .catch(err => {
            dispatch(articleError(err.message));
        });
};

export const getSingleArticle = (id) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles/' + id)
        .then(res => {
            dispatch(getSingleArticleSuccess(res.data.article));
        }).catch(err => {
            dispatch(articleError(err));
        });
};

export const getRelatedArticles = (articleId, page, limit) => (dispatch) => {
    axios.get('/articles/realated/' + articleId + '?page=' + page + '&limit=' + limit)
        .then(res => {
            dispatch(getRelatedArticlesSuccess(res.data));
        })
        .catch(err => {
            dispatch(articleError(err.message));
        });
};

export const updateDownloadedCount = (articleId) => (dispatch) => {
    axios.put('/articles/update-downloaded-count/' + articleId)
        .then(res => {
            dispatch(updateDownloadCountSuccess());
        }).catch(err => {
            dispatch(articleError(err));
        });
};

export const searchArticlesByKeyword = (keyword) => (dispatch) => {
    axios.get('/articles/search/all?keyword=' + keyword)
        .then(res => {
            dispatch(searchArticlesSuccess(res.data.articles));
        }).catch(err => {
            dispatch(articleError(err));
        });
};
