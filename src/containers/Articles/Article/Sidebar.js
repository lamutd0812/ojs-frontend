import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Sidebar = () => {
    return (
        <Aux>
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
        </Aux>
    );
};

export default Sidebar;