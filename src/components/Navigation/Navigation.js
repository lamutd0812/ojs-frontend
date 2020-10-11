import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        const header = (
            <header className="header-area">
                <div className="mag-main-menu" id="sticker">
                    <div className="classy-nav-container breakpoint-off">
                        <nav className="classy-navbar justify-content-between" id="magNav">
                            <NavLink to="/" className="nav-brand">
                                <img src="img/core-img/logo.png" alt="" />
                            </NavLink>
                            <div className="classy-navbar-toggler">
                                <span className="navbarToggler"><span></span><span></span><span></span></span>
                            </div>

                            <div className="nav-content d-flex align-items-center">
                                <div className="classy-menu">
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                                    </div>
                                    <div className="classynav">
                                        <ul>
                                            <li className="active"><Link to="/home" >Home</Link></li>
                                            <li><a href="archive.html">Archive</a></li>
                                            <li><a href="index.html">Pages</a>
                                                <ul className="dropdown">
                                                    <li><a href="index.html">Home</a></li>
                                                    <li><a href="archive.html">Archive</a></li>
                                                    <li><a href="video-post.html">Single Video Post</a></li>
                                                    <li><a href="single-post.html">Single Post</a></li>
                                                    <li><a href="about.html">About Us</a></li>
                                                    <li><a href="contact.html">Contact</a></li>
                                                    <li><a href="submit-video.html">Submit Video</a></li>
                                                    <li><a href="login.html">Login</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="index.html">Mega</a>
                                                <div className="megamenu">
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="index.html">Home</a></li>
                                                        <li><a href="archive.html">Archive</a></li>
                                                        <li><a href="video-post.html">Single Video Post</a></li>
                                                        <li><a href="single-post.html">Single Post</a></li>
                                                        <li><a href="about.html">About Us</a></li>
                                                        <li><a href="contact.html">Contact</a></li>
                                                        <li><a href="login.html">Login</a></li>
                                                    </ul>
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="index.html">Home</a></li>
                                                        <li><a href="archive.html">Archive</a></li>
                                                        <li><a href="video-post.html">Single Video Post</a></li>
                                                        <li><a href="single-post.html">Single Post</a></li>
                                                        <li><a href="about.html">About Us</a></li>
                                                        <li><a href="contact.html">Contact</a></li>
                                                        <li><a href="login.html">Login</a></li>
                                                    </ul>
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="index.html">Home</a></li>
                                                        <li><a href="archive.html">Archive</a></li>
                                                        <li><a href="video-post.html">Single Video Post</a></li>
                                                        <li><a href="single-post.html">Single Post</a></li>
                                                        <li><a href="about.html">About Us</a></li>
                                                        <li><a href="contact.html">Contact</a></li>
                                                        <li><a href="login.html">Login</a></li>
                                                    </ul>
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="index.html">Home</a></li>
                                                        <li><a href="archive.html">Archive</a></li>
                                                        <li><a href="video-post.html">Single Video Post</a></li>
                                                        <li><a href="single-post.html">Single Post</a></li>
                                                        <li><a href="about.html">About Us</a></li>
                                                        <li><a href="contact.html">Contact</a></li>
                                                        <li><a href="login.html">Login</a></li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li><a href="about.html">About</a></li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="top-meta-data d-flex align-items-center">
                                    <div className="top-search-area">
                                        <form action="index.html" method="post">
                                            <input type="search" name="top-search" id="topSearch" placeholder="Search and hit enter..." />
                                            <button type="submit" className="btn"><i className="fa fa-search" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                    {!this.props.isAuth ? (
                                        <NavLink to="/login" className="login-btn">
                                            <i className="fa fa-user" aria-hidden="true"></i> Đăng nhập
                                        </NavLink>
                                    ) : (
                                        <div className="login-btn">
                                            Hello {this.props.firstname} | {" "}
                                            <NavLink className="logout-btn" to="/logout">
                                                <i className="fa fa-sign-out"></i>Đăng xuất
                                            </NavLink>
                                        </div>
                                    )}

                                    <a href="submit-video.html" className="submit-video"><span><i className="fa fa-cloud-upload"></i></span> <span className="video-text">Submit Video</span></a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header >
        );

        return (
            <div>
                {header}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        userId: state.auth.userId,
        firstname: state.auth.firstname
    };
};

export default connect(mapStateToProps, null)(Navigation);