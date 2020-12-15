import React from 'react';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import classes from './Pagination.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Pagination = (props) => {
    return (
        <div className={classes.pagination}>
            {props.currentPage !== 1 && props.prevPage !== 1 ?
                <Link className={classes.item}
                    to={{
                        pathname: props.location.pathname,
                        search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: 1 }))
                    }}>
                    1
                </Link> : null}

            {props.hasPrevPage ? (
                <Aux>
                    {props.prevPage !== 1 && (
                        <Link className={classes.item}
                            to={{
                                pathname: props.location.pathname,
                                search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.prevPage }))
                            }}>
                            <i className="fas fa-angle-left"></i>
                        </Link>
                    )}
                    <Link className={classes.item}
                        to={{
                            pathname: props.location.pathname,
                            search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.prevPage }))
                        }}>
                        {props.prevPage}
                    </Link>
                </Aux>

            ) : null}

            <Link className={classes.item + ' ' + classes.active}
                to={{
                    pathname: props.location.pathname,
                    search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.currentPage }))
                }}>
                {props.currentPage}
            </Link>

            {props.hasNextPage ? (
                <Aux>
                    <Link className={classes.item}
                        to={{
                            pathname: props.location.pathname,
                            search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.nextPage }))
                        }}>
                        {props.nextPage}
                    </Link>
                    {props.nextPage !== props.lastPage && (
                        <Link className={classes.item}
                            to={{
                                pathname: props.location.pathname,
                                search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.nextPage }))
                            }}>
                            <i className="fas fa-angle-right"></i>
                        </Link>
                    )}
                </Aux>

            ) : null}

            {props.currentPage !== props.lastPage && props.nextPage !== props.lastPage ?
                <Link className={classes.item}
                    to={{
                        pathname: props.location.pathname,
                        search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.lastPage }))
                    }}>
                    {props.lastPage}
                </Link> : null}
        </div>
    );
};

export default Pagination;