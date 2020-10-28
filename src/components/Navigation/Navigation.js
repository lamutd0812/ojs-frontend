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
                            {/* <div className="classy-navbar-toggler">
                                <span className="navbarToggler"><span></span><span></span><span></span></span>
                            </div> */}

                            <div className="nav-content d-flex align-items-center">
                                <div className="classy-menu">
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                                    </div>
                                    <div className="classynav">
                                        <ul>
                                            <li className="active"><Link to="/" >Home</Link></li>
                                            <li><NavLink to="#">Archive</NavLink></li>
                                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                            <li><NavLink to="#">Contact</NavLink></li>
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
                                    {this.props.avatar ? (
                                        <div className="top-avatar">
                                            <img src={this.props.avatar} alt="avatar" />
                                        </div>
                                    ) : null}
                                    {!this.props.isAuth ? (
                                        <NavLink to="/login" className="login-btn">
                                            <i className="fa fa-user" aria-hidden="true"></i> Đăng nhập
                                        </NavLink>
                                    ) : (
                                            <NavLink to="/logout" className="login-btn mr-2">
                                                <i className="fa fa-sign-out"></i>Đăng xuất
                                            </NavLink>
                                        )}

                                    <NavLink to="/dashboard" className="submit-video">
                                        <span><i className="fa fa-cloud-upload"></i></span> <span className="video-text">Dashboard</span>
                                    </NavLink>
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
        avatar: state.auth.avatar
    };
};

export default connect(mapStateToProps, null)(Navigation);