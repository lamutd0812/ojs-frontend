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
                                {/* <img src="img/core-img/logo.png" alt="" /> */}
                                <img src="img/core-img/logo3.png" style={{width:'60%', height:'60%'}} alt="" />
                            </NavLink>

                            <div className="nav-content d-flex align-items-center">
                                <div className="classy-menu">
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                                    </div>
                                    <div className="classynav">
                                        <ul>
                                            <li className="active"><Link to="/" >Home</Link></li>
                                            <li><NavLink to="/single-article">Article</NavLink></li>
                                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                            <li className="cn-dropdown-item has-down">
                                                <NavLink to="#">Contact</NavLink>
                                                <ul className="dropdown">
                                                    <li><a href="index.html">Home</a></li>
                                                    <li><a href="archive.html">Archive</a></li>
                                                </ul>
                                            </li>
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
                                        <div className="classynav">
                                            <ul><li className="cn-dropdown-item has-down mr-1">
                                                <NavLink to="#">
                                                    <i className="fa fa-user" aria-hidden="true"></i> {this.props.fullname}
                                                </NavLink>
                                                <ul class="dropdown">
                                                    <li>
                                                        <NavLink to="#" style={{ fontSize:'14px', fontWeight:'400' }}>
                                                            <i className="far fa-id-badge"></i> Trang cá nhân
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/logout" style={{ fontSize:'14px', fontWeight:'400' }}>
                                                            <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li></ul>
                                        </div>
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
        avatar: state.auth.avatar,
        fullname: state.auth.fullname
    };
};

export default connect(mapStateToProps, null)(Navigation);