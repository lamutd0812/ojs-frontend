import axios from 'axios';
import * as actionTypes from './actionTypes';

// const url = 'https://api.crossref.org/works?select=publisher,DOI,type,title,author,container-title,published-print,ISSN,subject,link&filter=from-pub-date:2020-12-01,until-pub-date:2021-01-01&query.affiliation=Vietnam%20Academy%20of%20Science%20and%20Technology&offset=1&rows=10';

const getUrl = (page, limit) => {
    let offset = page * limit;
    if (offset === 0) {
        offset = 1;
    }
    const url = 'https://api.crossref.org/works?select=publisher,DOI,type,title,author,container-title,published-print,ISSN,subject,link&filter=from-pub-date:2020-12-01,until-pub-date:2021-01-01&query.affiliation=Vietnam%20Academy%20of%20Science%20and%20Technology&offset=' + offset + '&rows=' + limit;
    return url;
}

// case;

const articlesCrawlStart = () => {
    return {
        type: actionTypes.ARTICLES_CRAWL_START
    };
};

const articlesCrawlSuccess = (data) => {
    return {
        type: actionTypes.ARTICLES_CRAWL_SUCCESS,
        articles: data.message.items,
        total: data.message["total-results"],
        currentPage: data.message.query["start-index"] / data.message["items-per-page"],
    }
};

const articlesCrawlError = (error) => {
    return {
        type: actionTypes.ARTICLES_CRAWL_ERROR,
        error: error
    }
};

export const vastArticlesCrawl = (page, limit) => (dispatch) => {
    dispatch(articlesCrawlStart());
    const url = getUrl(page, limit);
    axios.get(url)
        .then(res => {
            dispatch(articlesCrawlSuccess(res.data));
        })
        .catch(err => {
            dispatch(articlesCrawlError(err.message));
        });
};