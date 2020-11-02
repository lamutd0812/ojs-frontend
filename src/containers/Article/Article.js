import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import RouteBreadcrumb from '../../components/Breadcrumb/RouteBreadcrumb';

const url = "https://ojs.s3.ap-southeast-1.amazonaws.com/1604286906976-Detection%20of%20spam-posting%20accounts%20on%20Twitter.pdf";

const Article = () => {

    return (
        <Aux>
            <Navigation />
            <Breadcrumb
                title="Single Post"
                imageUrl={`url(${require("../../resources/imgs/40.jpg")})`} />
            <RouteBreadcrumb />

            <section className="post-details-area">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* Post Details Content Area */}
                        <div className="col col-9">
                            <div className="post-details-content bg-white mb-30 p-30 box-shadow">
                                <div className="blog-content">
                                    <div className="post-meta">
                                        <a href="a">MAY 8, 2018</a>
                                        <a href="archive.html">lifestyle</a>
                                    </div>
                                    <h4 className="post-title">Detection of spam-posting accounts on Twitter</h4>
                                    {/* <!-- Post Meta --> */}
                                    <div className="post-meta-2">
                                        <a href="a"><i className="fa fa-eye" aria-hidden="true"></i> 1034</a>
                                        <a href="a"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</a>
                                        <a href="a"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</a>
                                    </div>

                                    <div>
                                        <embed
                                            src={url}
                                            type="application/pdf"
                                            frameBorder="0"
                                            scrolling="auto"
                                            height="800px"
                                            width="100%"
                                        />
                                    </div>
                                    
                                    {/* Like Disklike Share */}
                                    <div className="like-dislike-share my-5">
                                        <h4 className="share">240<span>Share</span></h4>
                                        <a href="a" className="facebook"><i className="fa fa-facebook" aria-hidden="true"></i> Share on Facebook</a>
                                        <a href="a" className="twitter"><i className="fa fa-twitter" aria-hidden="true"></i> Share on Twitter</a>
                                    </div>

                                    {/* <!-- Post Author --> */}
                                    <div className="post-author d-flex align-items-center">
                                        <div className="post-author-thumb">
                                            <img src="img/bg-img/52.jpg" alt="" />
                                        </div>
                                        <div className="post-author-desc pl-4">
                                            <a href="a" className="author-name">Alan Shaerer</a>
                                            <p>Duis tincidunt turpis sodales, tincidunt nisi et, auctor nisi. Curabitur vulputate sapien eu metus ultricies fermentum nec vel augue. Maecenas eget lacinia est.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

                            {/* Comment Area Start */}
                            <div className="comment_area clearfix bg-white mb-30 p-30 box-shadow">
                                {/* <!-- Section Title --> */}
                                <div className="section-heading">
                                    <h5>COMMENTS</h5>
                                </div>

                                <ol>
                                    {/* <!-- Single Comment Area --> */}
                                    <li className="single_comment_area">
                                        {/* <!-- Comment Content --> */}
                                        <div className="comment-content d-flex">
                                            {/* <!-- Comment Author --> */}
                                            <div className="comment-author">
                                                <img src="img/bg-img/53.jpg" alt="author" />
                                            </div>
                                            {/* <!-- Comment Meta --> */}
                                            <div className="comment-meta">
                                                <a href="a" className="comment-date">27 Aug 2019</a>
                                                <h6>Tomas Mandy</h6>
                                                <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius</p>
                                                <div className="d-flex align-items-center">
                                                    <a href="a" className="like">like</a>
                                                    <a href="a" className="reply">Reply</a>
                                                </div>
                                            </div>
                                        </div>

                                        <ol className="children">
                                            <li className="single_comment_area">
                                                {/* <!-- Comment Content --> */}
                                                <div className="comment-content d-flex">
                                                    {/* <!-- Comment Author --> */}
                                                    <div className="comment-author">
                                                        <img src="img/bg-img/54.jpg" alt="author" />
                                                    </div>
                                                    {/* <!-- Comment Meta --> */}
                                                    <div className="comment-meta">
                                                        <a href="a" className="comment-date">27 Aug 2019</a>
                                                        <h6>Britney Millner</h6>
                                                        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius</p>
                                                        <div className="d-flex align-items-center">
                                                            <a href="a" className="like">like</a>
                                                            <a href="a" className="reply">Reply</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ol>
                                    </li>

                                    {/* <!-- Single Comment Area --> */}
                                    <li className="single_comment_area">
                                        {/* <!-- Comment Content --> */}
                                        <div className="comment-content d-flex">
                                            {/* <!-- Comment Author --> */}
                                            <div className="comment-author">
                                                <img src="img/bg-img/55.jpg" alt="author" />
                                            </div>
                                            {/* <!-- Comment Meta --> */}
                                            <div className="comment-meta">
                                                <a href="a" className="comment-date">27 Aug 2019</a>
                                                <h6>Simon Downey</h6>
                                                <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius</p>
                                                <div className="d-flex align-items-center">
                                                    <a href="a" className="like">like</a>
                                                    <a href="a" className="reply">Reply</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            {/* Post a Comment Area */}
                            <div className="post-a-comment-area bg-white mb-30 p-30 box-shadow clearfix">
                                {/* <!-- Section Title --> */}
                                <div className="section-heading">
                                    <h5>LEAVE A REPLY</h5>
                                </div>

                                {/* <!-- Reply Form --> */}
                                <div className="contact-form-area">
                                    <form action="#" method="post">
                                        <div className="row">
                                            <div className="col-12 col-lg-6">
                                                <input type="text" className="form-control" id="name" placeholder="Your Name*" required />
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email*" required />
                                            </div>
                                            <div className="col-12">
                                                <textarea name="message" className="form-control" id="message" cols="30" rows="10" placeholder="Message*" required></textarea>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn mag-btn mt-30" type="submit">Submit Comment</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col col-3">
                            <div className="post-sidebar-area right-sidebar mt-30 mb-30 box-shadow">
                                {/* <!-- Sidebar Widget --> */}
                                <div className="single-sidebar-widget p-30">
                                    {/* <!-- Social Followers Info --> */}
                                    <div className="social-followers-info">
                                        {/* <!-- Facebook --> */}
                                        <a href="a" className="facebook-fans"><i className="fa fa-facebook"></i> 4,360 <span>Fans</span></a>
                                        {/* <!-- Twitter --> */}
                                        <a href="a" className="twitter-followers"><i className="fa fa-twitter"></i> 3,280 <span>Followers</span></a>
                                        {/* <!-- YouTube --> */}
                                        <a href="a" className="youtube-subscribers"><i className="fa fa-youtube"></i> 1250 <span>Subscribers</span></a>
                                        {/* <!-- Google --> */}
                                        <a href="a" className="google-followers"><i className="fa fa-google-plus"></i> 4,230 <span>Followers</span></a>
                                    </div>
                                </div>

                                {/* <!-- Sidebar Widget --> */}
                                <div className="single-sidebar-widget p-30">
                                    {/* <!-- Section Title --> */}
                                    <div className="section-heading">
                                        <h5>Categories</h5>
                                    </div>

                                    {/* <!-- Catagory Widget --> */}
                                    <ul className="catagory-widgets">
                                        <li><a href="a"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> Life Style</span> <span>35</span></a></li>
                                        <li><a href="a"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> Travel</span> <span>30</span></a></li>
                                        <li><a href="a"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> Foods</span> <span>13</span></a></li>
                                        <li><a href="a"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> Game</span> <span>06</span></a></li>
                                        <li><a href="a"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> Sports</span> <span>28</span></a></li>
                                        <li><a href="a"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> Football</span> <span>08</span></a></li>
                                        <li><a href="a"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> TV Show</span> <span>13</span></a></li>
                                    </ul>
                                </div>

                                {/* <!-- Sidebar Widget --> */}
                                <div className="single-sidebar-widget">
                                    <a href="a" className="add-img"><img src="img/bg-img/add2.png" alt="" /></a>
                                </div>

                                {/* <!-- Sidebar Widget --> */}
                                <div className="single-sidebar-widget p-30">
                                    {/* <!-- Section Title --> */}
                                    <div className="section-heading">
                                        <h5>Hot Channels</h5>
                                    </div>

                                    {/* <!-- Single YouTube Channel --> */}
                                    <div className="single-youtube-channel d-flex">
                                        <div className="youtube-channel-thumbnail">
                                            <img src="img/bg-img/14.jpg" alt="" />
                                        </div>
                                        <div className="youtube-channel-content">
                                            <a href="single-post.html" className="channel-title">TV Show</a>
                                            <a href="a" className="btn subscribe-btn"><i className="fa fa-play-circle-o" aria-hidden="true"></i> Subscribe</a>
                                        </div>
                                    </div>

                                    {/* <!-- Single YouTube Channel --> */}
                                    <div className="single-youtube-channel d-flex">
                                        <div className="youtube-channel-thumbnail">
                                            <img src="img/bg-img/15.jpg" alt="" />
                                        </div>
                                        <div className="youtube-channel-content">
                                            <a href="single-post.html" className="channel-title">Game Channel</a>
                                            <a href="a" className="btn subscribe-btn"><i className="fa fa-play-circle-o" aria-hidden="true"></i> Subscribe</a>
                                        </div>
                                    </div>

                                    {/* <!-- Single YouTube Channel --> */}
                                    <div className="single-youtube-channel d-flex">
                                        <div className="youtube-channel-thumbnail">
                                            <img src="img/bg-img/16.jpg" alt="" />
                                        </div>
                                        <div className="youtube-channel-content">
                                            <a href="single-post.html" className="channel-title">Sport Channel</a>
                                            <a href="a" className="btn subscribe-btn"><i className="fa fa-play-circle-o" aria-hidden="true"></i> Subscribe</a>
                                        </div>
                                    </div>

                                    {/* <!-- Single YouTube Channel --> */}
                                    <div className="single-youtube-channel d-flex">
                                        <div className="youtube-channel-thumbnail">
                                            <img src="img/bg-img/17.jpg" alt="" />
                                        </div>
                                        <div className="youtube-channel-content">
                                            <a href="single-post.html" className="channel-title">Travel Channel</a>
                                            <a href="a" className="btn subscribe-btn"><i className="fa fa-play-circle-o" aria-hidden="true"></i> Subscribe</a>
                                        </div>
                                    </div>

                                    {/* <!-- Single YouTube Channel --> */}
                                    <div className="single-youtube-channel d-flex">
                                        <div className="youtube-channel-thumbnail">
                                            <img src="img/bg-img/18.jpg" alt="" />
                                        </div>
                                        <div className="youtube-channel-content">
                                            <a href="single-post.html" className="channel-title">LifeStyle Channel</a>
                                            <a href="a" className="btn subscribe-btn"><i className="fa fa-play-circle-o" aria-hidden="true"></i> Subscribe</a>
                                        </div>
                                    </div>

                                </div>

                                {/* <!-- Sidebar Widget --> */}
                                <div className="single-sidebar-widget p-30">
                                    {/* <!-- Section Title --> */}
                                    <div className="section-heading">
                                        <h5>Newsletter</h5>
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
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Aux>
    );
};

export default Article;