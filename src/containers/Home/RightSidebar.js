import React from 'react';

const RightSidebar = (props) => {
    return (
        <div className="post-sidebar-area right-sidebar mt-30 mb-30 box-shadow">
            <div className="single-sidebar-widget p-30">
                <div className="section-heading">
                    <h5>Thể loại</h5>
                </div>

                <ul className="catagory-widgets">
                    {props.categories.map(category => (
                        <li>
                            <a href="index.html">
                                <span><i className="fa fa-angle-double-right" aria-hidden="true"></i> {category.name}</span>
                                <span>{Math.floor(Math.random() * 10) + 5}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="single-sidebar-widget p-30">
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
    );
};

export default RightSidebar;