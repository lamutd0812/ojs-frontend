import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import { getShortArticleTitle } from '../../utils/utility';

const MainPosts = (props) => {
    return (
        <div className="mag-posts-content mt-30 mb-30 p-30 box-shadow">
            {/* Trending Now Posts Area */}
            <div className="trending-now-posts mb-30">
                <div className="section-heading">
                    <h5>Phổ biến</h5>
                </div>

                <OwlCarousel className="trending-post-slides"
                    margin={30}
                    nav
                    items={2}
                    loop
                    dots={false}
                    autoplay
                    autoplayTimeout={4000}
                    smartSpeed={1000}
                    navText={['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>']}
                >
                    {props.articles.map(article => (
                        <div className="single-trending-post" key={article._id}>
                            <img src="img/bg-img/20.jpg" alt="" />
                            <div className="post-content">
                                <Link to="" className="post-cata">{article.submissionId.categoryId.name}</Link>
                                <Link to={`/single-article/${article._id}`} className="post-title">{getShortArticleTitle(article.submissionId.title)}</Link>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>
        </div>
    );
};

export default MainPosts;