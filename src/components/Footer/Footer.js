import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const footer = (
            <footer className="footer-area">
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="footer-widget">
                        <a href="index.html" className="foo-logo"><img src="img/core-img/logo2.png" alt="" /></a>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="footer-social-info">
                            <a href="a" className="facebook"><i className="fa fa-facebook"></i></a>
                            <a href="a" className="google-plus"><i className="fa fa-google-plus"></i></a>
                            <a href="a" className="instagram"><i className="fa fa-instagram"></i></a>
                            <a href="a" className="twitter"><i className="fa fa-twitter"></i></a>
                            <a href="a" className="linkedin"><i className="fa fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="footer-widget">
                        <h6 className="widget-title">Categories</h6>
                        <nav className="footer-widget-nav">
                            <ul>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Life Style</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Tech</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Travel</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Music</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Foods</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Fashion</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Game</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Football</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Sports</a></li>
                                <li><a href="index.html"><i className="fa fa-angle-double-right" aria-hidden="true"></i> TV Show</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="footer-widget">
                        <h6 className="widget-title">Sport Videos</h6>
                        <div className="single-blog-post style-2 d-flex">
                            <div className="post-thumbnail">
                                <img src="img/bg-img/12.jpg" alt="" />
                            </div>
                            <div className="post-content">
                                <a href="single-post.html" className="post-title">Take A Romantic Break In A Boutique Hotel</a>
                                <div className="post-meta d-flex justify-content-between">
                                    <a href="index.html"><i className="fa fa-eye" aria-hidden="true"></i> 34</a>
                                    <a href="index.html"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 84</a>
                                    <a href="index.html"><i className="fa fa-comments-o" aria-hidden="true"></i> 14</a>
                                </div>
                            </div>
                        </div>

                        <div className="single-blog-post style-2 d-flex">
                            <div className="post-thumbnail">
                                <img src="img/bg-img/13.jpg" alt="" />
                            </div>
                            <div className="post-content">
                                <a href="single-post.html" className="post-title">Travel Prudently Luggage And Carry On</a>
                                <div className="post-meta d-flex justify-content-between">
                                    <a href="index.html"><i className="fa fa-eye" aria-hidden="true"></i> 34</a>
                                    <a href="index.html"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 84</a>
                                    <a href="index.html"><i className="fa fa-comments-o" aria-hidden="true"></i> 14</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="footer-widget">
                        <h6 className="widget-title">Channels</h6>
                        <ul className="footer-tags">
                            <li><a href="index.html">Travel</a></li>
                            <li><a href="index.html">Fashionista</a></li>
                            <li><a href="index.html">Music</a></li>
                            <li><a href="index.html">DESIGN</a></li>
                            <li><a href="index.html">NEWS</a></li>
                            <li><a href="index.html">TRENDING</a></li>
                            <li><a href="index.html">VIDEO</a></li>
                            <li><a href="index.html">Game</a></li>
                            <li><a href="index.html">Sports</a></li>
                            <li><a href="index.html">Lifestyle</a></li>
                            <li><a href="index.html">Foods</a></li>
                            <li><a href="index.html">TV Show</a></li>
                            <li><a href="index.html">Twitter Video</a></li>
                            <li><a href="index.html">Playing</a></li>
                            <li><a href="index.html">clips</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="copywrite-area">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="copywrite-text">
Copyright @2020 All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com">Colorlib</a></p>
                    </div>
                    <div className="col-12 col-sm-6">
                        <nav className="footer-nav">
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="index.html">Privacy</a></li>
                                <li><a href="index.html">Advertisement</a></li>
                                <li><a href="index.html">Contact Us</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        );
        return (
            <div>
                {footer}
            </div>
        );
    }
}

export default Footer;