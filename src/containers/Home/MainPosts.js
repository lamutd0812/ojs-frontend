import React from 'react';
import OwlCarousel from 'react-owl-carousel';

const MainPosts = () => {
    return (
        <div className="mag-posts-content mt-30 mb-30 p-30 box-shadow">
            {/* Trending Now Posts Area */}
            <div className="trending-now-posts mb-30">
                <div className="section-heading">
                    <h5>TRENDING NOW</h5>
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
                    <div className="single-trending-post">
                        <img src="img/bg-img/19.jpg" alt="" />
                        <div className="post-content">
                            <a href="index.html" className="post-cata">Video</a>
                            <a href="video-post.html" className="post-title">Big Savings On Gas While You Travel</a>
                        </div>
                    </div>

                    <div className="single-trending-post">
                        <img src="img/bg-img/20.jpg" alt="" />
                        <div className="post-content">
                            <a href="index.html" className="post-cata">TV Show</a>
                            <a href="video-post.html" className="post-title">A Guide To Rocky Mountain Vacations</a>
                        </div>
                    </div>

                    <div className="single-trending-post">
                        <img src="img/bg-img/21.jpg" alt="" />
                        <div className="post-content">
                            <a href="index.html" className="post-cata">Sports</a>
                            <a href="video-post.html" className="post-title">The Health Benefits Of Sunglasses</a>
                        </div>
                    </div>

                    <div className="single-trending-post">
                        <img src="img/bg-img/19.jpg" alt="" />
                        <div className="post-content">
                            <a href="index.html" className="post-cata">Video</a>
                            <a href="video-post.html" className="post-title">Big Savings On Gas While You Travel</a>
                        </div>
                    </div>

                    <div className="single-trending-post">
                        <img src="img/bg-img/20.jpg" alt="" />
                        <div className="post-content">
                            <a href="index.html" className="post-cata">TV Show</a>
                            <a href="video-post.html" className="post-title">A Guide To Rocky Mountain Vacations</a>
                        </div>
                    </div>

                    <div className="single-trending-post">
                        <img src="img/bg-img/21.jpg" alt="" />
                        <div className="post-content">
                            <a href="index.html" className="post-cata">Sports</a>
                            <a href="video-post.html" className="post-title">The Health Benefits Of Sunglasses</a>
                        </div>
                    </div>
                </OwlCarousel>

            </div>
        </div>
    );
};

export default MainPosts;