import axios from 'axios';
import { getFormattedDateVAST } from '../../utils/utility';
import * as actionTypes from './actionTypes';
const ITEMS_PER_PAGE = 10;

// const url = 'https://api.crossref.org/works?select=publisher,DOI,type,title,author,container-title,published-print,ISSN,subject,link&filter=from-pub-date:2020-12-01,until-pub-date:2021-01-01&query.affiliation=Vietnam%20Academy%20of%20Science%20and%20Technology&offset=1&rows=10';

const getUrl = (startDate, endDate, page, limit) => {
    let offset = (page - 1) * limit;
    if (offset === 0) {
        offset = 1;
    }
    const affiliation = 'Vietnam Academy of Science and Technology';
    const url = 'https://api.crossref.org/works?select=publisher,DOI,type,title,author,container-title,published-print,ISSN,subject,link&filter=from-pub-date:' + startDate + ',until-pub-date:' + endDate + '&query.affiliation=' + affiliation + '&offset=' + offset + '&rows=' + limit;
    return url;
}

// case;

const articlesCrawlStart = () => {
    return {
        type: actionTypes.ARTICLES_CRAWL_START
    };
};

// const articlesCrawlSuccess = (data) => {
//     let cur = data.message.query["start-index"] / data.message["items-per-page"];
//     if (cur < 1) {
//         cur = 1;
//     } else {
//         cur = Math.ceil(cur) + 1;
//     }
//     return {
//         type: actionTypes.ARTICLES_CRAWL_SUCCESS,
//         articles: data.message.items,
//         total: data.message["total-results"],
//         currentPage: cur,
//     }
// };

const articlesCrawlSuccess = (data) => {
    const affiliation = 'Vietnam Academy of Science and Technology';
    const allArticles = data.message.items.filter(item => {
        let isValid = false;
        if (item.author) {
            item.author.forEach(author => {
                const dataOrg = author.affiliation.length > 0 ? author.affiliation[0].name.split(/,(.+)/) : '';
                const org = dataOrg[1] ? dataOrg[1] : ' ';
                if (org.includes(affiliation)) {
                    isValid = true;
                }
            })
        }
        return isValid === true;
    });

    const skip = 0;
    const limit = ITEMS_PER_PAGE;
    const articles = allArticles.slice(skip, limit);

    return {
        type: actionTypes.ARTICLES_CRAWL_SUCCESS,
        allArticles: allArticles,
        articles: articles,
        total: allArticles.length,
        currentPage: 1,
    }
};

const articlesCrawlError = (error) => {
    return {
        type: actionTypes.ARTICLES_CRAWL_ERROR,
        error: error
    }
};

export const vastArticlesCrawl = (startDate, endDate, page, limit) => (dispatch) => {
    const start = getFormattedDateVAST(startDate);
    const end = getFormattedDateVAST(endDate);
    dispatch(articlesCrawlStart());
    const url = getUrl(start, end, page, limit);
    axios.get(url)
        .then(res => {
            dispatch(articlesCrawlSuccess(res.data));
        })
        .catch(err => {
            dispatch(articlesCrawlError(err.message));
        });
};

export const junmpToPage = (page) => (dispatch) => {
    dispatch({
        type: actionTypes.JUMP_TO_PAGE_SUCCESS,
        currentPage: page
    });
}