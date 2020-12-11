import React from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import { getFormattedDateOnly, getShortArticleAbstract } from '../../utils/utility';

const Sports = (props) => {
    return (
        <div className="sports-videos-area">
            <div className="section-heading">
                <h5>Lựa chọn của ban biên tập</h5>
            </div>

            <OwlCarousel className="sports-videos-slides mb-30"
                margin={30}
                nav
                items={1}
                loop
                dots={false}
                autoplay
                autoplayTimeout={4000}
                smartSpeed={1000}
                navText={['<i className="ti-angle-left"></i>', '<i className="ti-angle-right"></i>']}
            >

                {props.articles.map(article => (
                    <div className="single-featured-post" key={article._id}>
                        <div className="post-thumbnail mb-50">
                            <img src="img/bg-img/35.jpg" alt="" />
                        </div>
                        <div className="post-content">
                            <div className="post-meta">
                                <p>{getFormattedDateOnly(article.publishedDate)}</p>
                                <Link to="#"><p>{article.submissionId.categoryId.name}</p></Link>
                                <br />
                                <Link to="#" className="text-dark">
                                    <i className="fas fa-user"></i>{" "}
                                    {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                </Link>
                            </div>
                            <Link to={`/single-article/${article._id}`} className="post-title">
                                {article.submissionId.title}
                            </Link>

                            <p>{getShortArticleAbstract(article.submissionId.abstract)}</p>
                        </div>
                    </div>
                ))}
            </OwlCarousel>

            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="single-blog-post d-flex style-3 mb-30">
                        <div className="post-thumbnail">
                            <img src="img/bg-img/31.jpg" alt="" />
                        </div>
                        <div className="post-content">
                            <Link to="#" className="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div className="post-meta d-flex">
                                <Link to="#"><i className="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="single-blog-post d-flex style-3 mb-30">
                        <div className="post-thumbnail">
                            <img src="img/bg-img/32.jpg" alt="" />
                        </div>
                        <div className="post-content">
                            <Link to="#" className="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div className="post-meta d-flex">
                                <Link to="#"><i className="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="single-blog-post d-flex style-3 mb-30">
                        <div className="post-thumbnail">
                            <img src="img/bg-img/33.jpg" alt="" />
                        </div>
                        <div className="post-content">
                            <Link to="#" className="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div className="post-meta d-flex">
                                <Link to="#"><i className="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="single-blog-post d-flex style-3 mb-30">
                        <div className="post-thumbnail">
                            <img src="img/bg-img/34.jpg" alt="" />
                        </div>
                        <div className="post-content">
                            <Link to="#" className="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div className="post-meta d-flex">
                                <Link to="#"><i className="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Sports;