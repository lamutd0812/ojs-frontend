import React from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import { getFormattedDateOnly, getShortArticleAbstract } from '../../utils/utility';

const Sports = (props) => {
    return (
        <div class="sports-videos-area">
            <div class="section-heading">
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
                navText={['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>']}
            >

                {props.articles.map(article => (
                    <div class="single-featured-post">
                        <div class="post-thumbnail mb-50">
                            <img src="img/bg-img/35.jpg" alt="" />
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
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

            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="single-blog-post d-flex style-3 mb-30">
                        <div class="post-thumbnail">
                            <img src="img/bg-img/31.jpg" alt="" />
                        </div>
                        <div class="post-content">
                            <Link to="#" class="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div class="post-meta d-flex">
                                <Link to="#"><i class="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="single-blog-post d-flex style-3 mb-30">
                        <div class="post-thumbnail">
                            <img src="img/bg-img/32.jpg" alt="" />
                        </div>
                        <div class="post-content">
                            <Link to="#" class="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div class="post-meta d-flex">
                                <Link to="#"><i class="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="single-blog-post d-flex style-3 mb-30">
                        <div class="post-thumbnail">
                            <img src="img/bg-img/33.jpg" alt="" />
                        </div>
                        <div class="post-content">
                            <Link to="#" class="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div class="post-meta d-flex">
                                <Link to="#"><i class="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="single-blog-post d-flex style-3 mb-30">
                        <div class="post-thumbnail">
                            <img src="img/bg-img/34.jpg" alt="" />
                        </div>
                        <div class="post-content">
                            <Link to="#" class="post-title">From Wetlands To Canals And Dams Amsterdam Is Alive</Link>
                            <div class="post-meta d-flex">
                                <Link to="#"><i class="fa fa-eye" aria-hidden="true"></i> 1034</Link>
                                <Link to="#"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</Link>
                                <Link to="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 234</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Sports;