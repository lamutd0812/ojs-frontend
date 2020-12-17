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

const getSingleArticleSuccess = (article) => {
    return {
        type: actionTypes.GET_SINGLE_ARTICLE_SUCCESS,
        article: article
    }
};

const updateDownloadCountSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_DOWNLOADED_COUNT_SUCCESS
    }
};

const searchSubmisisonsSuccess = (submissions) => {
    return {
        type: actionTypes.SEARCH_SUBMISSIONS_SUCCESS,
        submissions: submissions
    }
}

const getArticleBySubmissionSuccess = (article) => {
    return {
        type: actionTypes.GET_ARTICLE_BY_SUBMISSION_SUCCESS,
        article: article
    }
}; 

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

export const getSingleArticle = (id) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles/' + id)
        .then(res => {
            dispatch(getSingleArticleSuccess(res.data.article));
        }).catch(err => {
            dispatch(articleError(err));
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

export const searchSubmissionsByKeyword = (keyword) => (dispatch) => {
    axios.get('/articles/search/submissions?keyword=' + keyword)
        .then(res => {
            dispatch(searchSubmisisonsSuccess(res.data.submissions));
        }).catch(err => {
            dispatch(articleError(err));
        });
};

export const getArticleBySubmission = (submissionId) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles/submission/' + submissionId)
        .then(res => {
            dispatch(getArticleBySubmissionSuccess(res.data.article));
        }).catch(err => {
            dispatch(articleError(err));
        });
};