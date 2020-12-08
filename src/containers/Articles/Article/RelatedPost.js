import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const RelatedPost = () => {
    return (
        <Aux>
            {/* <!-- Related Post Area --> */}
            <div className="related-post-area bg-white mb-30 px-30 pt-30 box-shadow">
                {/* <!-- Section Title --> */}
                <div className="section-heading">
                    <h5>Related Post</h5>
                </div>

                <div className="row">
                    {/* <!-- Single Blog Post --> */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="single-blog-post style-4 mb-30">
                            <div className="post-thumbnail">
                                <img src="img/bg-img/29.jpg" alt="" />
                            </div>
                            <div className="post-content">
                                <a href="single-post.html" className="post-title">Dentists Are Smiling Over Painless Veneer</a>
                                <div className="post-meta d-flex">
                                    <a href="a"><i className="fa fa-eye" aria-hidden="true"></i> 1034</a>
                                    <a href="a"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</a>
                                    <a href="a"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Blog Post --> */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="single-blog-post style-4 mb-30">
                            <div className="post-thumbnail">
                                <img src="img/bg-img/30.jpg" alt="" />
                                <a href="video-post.html" className="video-play"><i className="fa fa-play"></i></a>
                                <span className="video-duration">09:27</span>
                            </div>
                            <div className="post-content">
                                <a href="single-post.html" className="post-title">Will The Democrats Be Able To Reverse</a>
                                <div className="post-meta d-flex">
                                    <a href="a"><i className="fa fa-eye" aria-hidden="true"></i> 1034</a>
                                    <a href="a"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</a>
                                    <a href="a"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Single Blog Post --> */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="single-blog-post style-4 mb-30">
                            <div className="post-thumbnail">
                                <img src="img/bg-img/28.jpg" alt="" />
                            </div>
                            <div className="post-content">
                                <a href="single-post.html" className="post-title">A Guide To Rocky Mountain Vacations</a>
                                <div className="post-meta d-flex">
                                    <a href="a"><i className="fa fa-eye" aria-hidden="true"></i> 1034</a>
                                    <a href="a"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</a>
                                    <a href="a"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Aux>
    );
};

export default RelatedPost;