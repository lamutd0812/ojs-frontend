import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = (props) => {
    return (
        <div className="post-sidebar-area left-sidebar mt-30 mb-30 bg-white box-shadow">
            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Xem nhiều nhất</h5>
                </div>
                {props.articles.map(article => (
                    <div className="single-blog-post d-flex" key={article._id}>
                        <div className="post-content">
                            <Link to={`/single-article/${article._id}`} className="post-title">
                                {article.submissionId.title}
                            </Link>
                            <div className="post-meta">
                                <Link to="#" className="text-secondary" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-user"></i>{" "}
                                    {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                </Link>
                                <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-eye" aria-hidden="true"></i> 341
                                </Link>
                                <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-download" aria-hidden="true"></i> 845
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Mới nhất</h5>
                </div>

                {props.articles.map(article => (
                    <div className="single-blog-post d-flex" key={article._id}>
                        <div className="post-content">
                            <Link to={`/single-article/${article._id}`} className="post-title">
                                {article.submissionId.title}
                            </Link>
                            <div className="post-meta">
                                <Link to="#" className="text-secondary" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-user"></i>{" "}
                                    {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                </Link>
                                <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-eye" aria-hidden="true"></i> 34
                                </Link>
                                <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                    <i className="fas fa-download" aria-hidden="true"></i> 84
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftSidebar;