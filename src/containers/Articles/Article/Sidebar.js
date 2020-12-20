import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Sidebar = (props) => {
    return (
        <Aux>
            <div className="post-sidebar-area right-sidebar mt-30 mb-30 box-shadow">
                {/* <div className="single-sidebar-widget p-30">
                    <div className="social-followers-info">
                        <a href="a" className="facebook-fans"><i className="fa fa-facebook"></i> 4,360 <span>Fans</span></a>
                        <a href="a" className="twitter-followers"><i className="fa fa-twitter"></i> 3,280 <span>Followers</span></a>
                        <a href="a" className="youtube-subscribers"><i className="fa fa-youtube"></i> 1250 <span>Subscribers</span></a>
                        <a href="a" className="google-followers"><i className="fa fa-google-plus"></i> 4,230 <span>Followers</span></a>
                    </div>
                </div> */}

                <div className="single-sidebar-widget p-30">
                    <div className="section-heading" style={{ paddingRight: '10px' }}>
                        <h5>Tải xuống bài báo</h5>
                    </div>
                    <div className="social-followers-info">
                        <a href={props.articleUrl}
                            className="google-followers"
                            style={{ paddingRight: '0', cursor: 'auto' }}
                            download target="_blank" rel="noopener noreferrer"
                            onClick={props.updateDownloadedTimes}
                        >
                            <i className="fas fa-file-pdf"></i>{" "}
                            <span>PDF</span>
                            <span style={{ float: 'right', cursor: 'pointer' }}>
                                <i className="fas fa-download"></i>
                            </span>
                        </a>
                    </div>
                </div>

                <div className="single-sidebar-widget p-30">
                    <div className="section-heading">
                        <h5>Chủ đề</h5>
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
                    <div className="section-heading" style={{ paddingRight: '10px' }}>
                        <h5>Bài báo liên quan</h5>
                    </div>
                    {props.related_articles.map(article => (
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
                                        <i className="fas fa-eye" aria-hidden="true"></i> {article.views}
                                    </Link>
                                    <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-download" aria-hidden="true"></i> {article.downloaded}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="single-sidebar-widget p-30">
                    <div className="section-heading" style={{ paddingRight: '10px' }}>
                        <h5>Nổi bật</h5>
                    </div>
                    {props.most_viewed_articles.map(article => (
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
                                        <i className="fas fa-eye" aria-hidden="true"></i> {article.views}
                                    </Link>
                                    <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-download" aria-hidden="true"></i> {article.downloaded}
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
                        <p>Đăng kí theo dõi để nhận thông báo về các bài báo hay trên hệ thống</p>
                        <form action="#" method="get">
                            <input type="search" name="widget-search" placeholder="Email của bạn" />
                            <button type="submit" className="btn mag-btn w-100">Theo dõi</button>
                        </form>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default Sidebar;