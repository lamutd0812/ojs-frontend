import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import { getFormattedDateOnly, getListContributors, getShortArticleAbstract } from '../../utils/utility';

const MainPosts = (props) => {
    return (
        <div className="mag-posts-content mt-30 mb-30 p-30 box-shadow">
            <div className="trending-now-posts mb-30">
                <div className="section-heading">
                    <h5>Phổ biến</h5>
                </div>

                <OwlCarousel className="trending-post-slides"
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
                    {props.most_viewed_articles.map(article => (
                        <div className="single-featured-post" key={article._id}>
                            <div className="post-content">
                                <div className="post-meta">
                                    {/* <p>{article.submissionId.typeId.name}</p>
                                    <Link to="#"><p>{article.submissionId.categoryId.name}</p></Link>
                                    <br /> */}
                                    <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-user"></i>{" "}
                                        {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                    </Link>
                                    <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-clock" aria-hidden="true"></i> {getFormattedDateOnly(article.publishedDate)}
                                    </Link>
                                    <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-eye" aria-hidden="true"></i> {article.views}
                                    </Link>
                                    <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-download" aria-hidden="true"></i> {article.downloaded}
                                    </Link>
                                </div>
                                <Link to={`/single-article/${article._id}`} className="post-title" style={{ fontSize: '18px' }}>
                                    {article.submissionId.title}
                                </Link>

                                <p>{getShortArticleAbstract(article.submissionId.abstract)}</p>
                                <div className="badge-ol badge-ol-dark badge-outlined">{article.submissionId.typeId.name}</div>
                                <div className="badge-ol badge-ol-dark badge-outlined ml-1">{article.submissionId.categoryId.name}</div>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>

            <div className="trending-now-posts mb-30">
                <div className="section-heading">
                    <h5>Lựa chọn của ban biên tập</h5>
                </div>

                <OwlCarousel className="trending-post-slides"
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
                    {props.most_downloaded_articles.map(article => (
                        <div className="single-featured-post" key={article._id}>
                            <div className="post-content">
                                <div className="post-meta">
                                    <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-user"></i>{" "}
                                        {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                    </Link>
                                    <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-clock" aria-hidden="true"></i> {getFormattedDateOnly(article.publishedDate)}
                                    </Link>
                                    <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-eye" aria-hidden="true"></i> {article.views}
                                    </Link>
                                    <Link to="#" className="text-dark ml-2" style={{ fontWeight: '400' }}>
                                        <i className="fas fa-download" aria-hidden="true"></i> {article.downloaded}
                                    </Link>
                                </div>
                                <Link to={`/single-article/${article._id}`} className="post-title" style={{ fontSize: '18px' }}>
                                    {article.submissionId.title}
                                </Link>

                                <p>{getShortArticleAbstract(article.submissionId.abstract)}</p>
                                <div className="badge-ol badge-ol-dark badge-outlined">{article.submissionId.typeId.name}</div>
                                <div className="badge-ol badge-ol-dark badge-outlined ml-1">{article.submissionId.categoryId.name}</div>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>

            <div className="sports-videos-area">
                <div className="section-heading">
                    <h5>Yêu thích</h5>
                </div>

                <div className="row">
                    {props.most_viewed_articles.map(article => (
                        <div className="col-12 col-lg-6" key={article._id}>
                            <div className="single-blog-post d-flex style-3 mb-30" key={article._id}>
                                <div className="post-content">
                                    <Link to={`/single-article/${article._id}`} className="post-title">
                                        {article.submissionId.title}
                                    </Link>
                                    <div className="post-meta">
                                        <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                            <i className="fas fa-user"></i>{" "}
                                            {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                            {article.submissionId.contributors.length > 0 && ", " + getListContributors(article.submissionId.contributors)}
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
                        </div>
                    ))}
                    {props.latest_articles.map(article => (
                        <div className="col-12 col-lg-6" key={article._id}>
                            <div className="single-blog-post d-flex style-3 mb-30" key={article._id}>
                                <div className="post-content">
                                    <Link to={`/single-article/${article._id}`} className="post-title">
                                        {article.submissionId.title}
                                    </Link>
                                    <div className="post-meta">
                                        <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                            <i className="fas fa-user"></i>{" "}
                                            {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                            {article.submissionId.contributors.length > 0 && ", " + getListContributors(article.submissionId.contributors)}
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPosts;