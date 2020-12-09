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
                        <div className="post-thumbnail">
                            <img src="img/bg-img/5.jpg" alt="" />
                        </div>
                        <div className="post-content">
                            <Link to={`/single-article/${article._id}`} className="post-title">
                                {article.submissionId.title}
                            </Link>
                            <div className="post-meta d-flex justify-content-between">
                                <Link to="#" className="text-dark">
                                    <i className="fas fa-user"></i>{" "}
                                    {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Mới nhất</h5>
                </div>
                
                {props.articles.map(article => (
                    <div className="single-blog-post d-flex" key={article._id}>
                        <div className="post-thumbnail">
                            <img src="img/bg-img/5.jpg" alt="" />
                        </div>
                        <div className="post-content">
                            <Link to={`/single-article/${article._id}`} className="post-title">
                                {article.submissionId.title}
                            </Link>
                            <div className="post-meta d-flex justify-content-between">
                                <Link to="#" className="text-dark">
                                    <i className="fas fa-user"></i>{" "}
                                    {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default LeftSidebar;