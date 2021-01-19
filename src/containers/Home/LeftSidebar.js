import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = (props) => {
    return (
        <div className="post-sidebar-area left-sidebar mt-30 mb-30 bg-white box-shadow">
            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Xem nhiều nhất</h5>
                </div>
                {props.most_viewed_articles.map(article => (
                    <div className="single-blog-post d-flex" key={article._id}>
                        <div className="post-content">
                            <Link to={`/single-article/${article._id}`} className="post-title">
                                {article.submissionId.title}
                            </Link>
                            <div className="post-meta">
                                <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-user"></i>{" "}
                                    {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                </Link>
                                <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-eye" aria-hidden="true"></i> {article.views}
                                </Link>
                                <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-download" aria-hidden="true"></i> {article.downloaded}
                                </Link>
                            </div>
                            <Link to="#" className="badge-ol badge-ol-dark badge-outlined mt-1" style={{ fontSize: '12px' }}>{article.submissionId.typeId.name}</Link>
                            <Link to="#" className="badge-ol badge-ol-dark badge-outlined ml-1 mt-1" style={{ fontSize: '12px' }}>{article.submissionId.categoryId.name}</Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Mới nhất</h5>
                </div>

                {props.latest_articles.map(article => (
                    <div className="single-blog-post d-flex" key={article._id}>
                        <div className="post-content">
                            <Link to={`/single-article/${article._id}`} className="post-title">
                                {article.submissionId.title}
                            </Link>
                            <div className="post-meta">
                                <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-user"></i>{" "}
                                    {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                </Link>
                                <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-eye" aria-hidden="true"></i> {article.views}
                                </Link>
                                <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-download" aria-hidden="true"></i> {article.downloaded}
                                </Link>
                            </div>
                            <div className="badge-ol badge-ol-dark badge-outlined mt-1" style={{ fontSize: '12px' }}>{article.submissionId.typeId.name}</div>
                            <div className="badge-ol badge-ol-dark badge-outlined ml-1 mt-1" style={{ fontSize: '12px' }}>{article.submissionId.categoryId.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftSidebar;