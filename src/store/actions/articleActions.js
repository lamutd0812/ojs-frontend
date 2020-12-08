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

const articleError = (error) => {
    return {
        type: actionTypes.ARTICLE_ERROR,
        error: error
    }
};

export const getAllArticles = (page) => (dispatch) => {
    dispatch(articleStart());
    axios.get('/articles?page=' + page)
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