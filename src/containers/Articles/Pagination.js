import React from 'react';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const Pagination = (props) => {
    return (
        <nav>
            <ul className="pagination">
                {props.currentPage !== 1 && props.prevPage !== 1 ? (
                    <li className="page-item">
                        <Link className="page-link"
                            to={{
                                pathname: props.location.pathname,
                                search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: 1 }))
                            }}>
                            1
                        </Link>
                    </li>
                ) : null}

                {props.hasPrevPage ? (
                    <Aux>
                        {props.prevPage !== 1 && (
                            <li className="page-item">
                                <Link className="page-link"
                                    to={{
                                        pathname: props.location.pathname,
                                        search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.prevPage }))
                                    }}>
                                    <i className="ti-angle-left"></i>
                                </Link>
                            </li>
                        )}
                        <li className="page-item">
                            <Link className="page-link"
                                to={{
                                    pathname: props.location.pathname,
                                    search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.prevPage }))
                                }}>
                                {props.prevPage}
                            </Link>
                        </li>
                    </Aux>
                ) : null}

                <li className="page-item active">
                    <Link className="page-link"
                        to={{
                            pathname: props.location.pathname,
                            search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.currentPage }))
                        }}>
                        {props.currentPage}
                    </Link>
                </li>

                {props.hasNextPage ? (
                    <Aux>
                        <li className="page-item">
                            <Link className="page-link"
                                to={{
                                    pathname: props.location.pathname,
                                    search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.nextPage }))
                                }}>
                                {props.nextPage}
                            </Link>
                        </li>
                        {props.nextPage !== props.lastPage && (
                            <li className="page-item">
                                <Link className="page-link"
                                    to={{
                                        pathname: props.location.pathname,
                                        search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.nextPage }))
                                    }}>
                                    <i className="ti-angle-right"></i>
                                </Link>
                            </li>
                        )}
                    </Aux>

                ) : null}

                {props.currentPage !== props.lastPage && props.nextPage !== props.lastPage ? (
                    <li className="page-item">
                        <Link className="page-link"
                            to={{
                                pathname: props.location.pathname,
                                search: queryString.stringify(Object.assign({}, queryString.parse(props.location.search), { page: props.lastPage }))
                            }}>
                            {props.lastPage}
                        </Link>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default Pagination;