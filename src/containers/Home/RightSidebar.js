import React from 'react';
import { Link } from 'react-router-dom';

const RightSidebar = (props) => {
    return (
        <div className="post-sidebar-area right-sidebar mt-30 mb-30 box-shadow">
            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Thể loại</h5>
                </div>

                <ul className="catagory-widgets">
                    {props.categories.map(category => (
                        <li key={category._id}>
                            <Link to="#">
                                <span><i className="fa fa-angle-double-right" aria-hidden="true"></i> {category.name}</span>
                                <span>{Math.floor(Math.random() * 10) + 5}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Tải xuống nhiều</h5>
                </div>
                
                {props.articles.map(article => (
                    <div className="single-blog-post d-flex" key={article._id}>
                        <div className="post-thumbnail">
                            <img src="img/bg-img/1.jpg" alt="" />
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

            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Hòm thư</h5>
                </div>
                <div className="newsletter-form">
                    <p>Subscribe our newsletter gor get notification about new updates, information discount, etc.</p>
                    <form action="#" method="get">
                        <input type="search" name="widget-search" placeholder="Enter your email" />
                        <button type="submit" className="btn mag-btn w-100">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;