import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate } from '../../../utils/utility';

class Navigation extends Component {
    render() {
        return (
            <div>
                {/* <!-- Navbar --> */}
                <nav className="main-header navbar navbar-expand navbar-dark">
                    {/* <!-- Left navbar links --> */}
                    <ul className="navbar-nav">
                        <li className="nav-item d-none d-sm-inline-block">
                            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                        </li>
                    </ul>

                    {/* <!-- SEARCH FORM --> */}
                    <form className="form-inline ml-3">
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-navbar btn-flat" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* <!-- Right navbar links --> */}
                    <ul className="navbar-nav ml-auto">
                        {/* <!-- Notifications Dropdown Menu --> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#a">
                                <i className="far fa-bell"></i>
                                <span className="badge badge-secondary navbar-badge font-weight-bold" style={{ fontSize: '12px' }}>{this.props.notifications.length}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{ minWidth: '450px' }}>
                                <div className="text-center p-2" style={{ fontSize: '14px' }}>
                                    {this.props.notifications.length} thông báo mới
                                </div>
                                <div className="dropdown-divider"></div>
                                {this.props.notifications.length > 0 ? (
                                    <Aux>
                                        {this.props.notifications.map(noti => (
                                            <Aux key={noti._id}>
                                                <Link to={noti.link} className="dropdown-item">
                                                    <div className="media">
                                                        <img src={noti.senderId.avatar} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                                        <div className="media-body">
                                                            <h3 className="dropdown-item-title">
                                                                {noti.title}
                                                                <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                                            </h3>
                                                            <p className="text-sm">{noti.content}</p>
                                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i>{getFormattedDate(noti.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                            </Aux>
                                        ))}
                                    </Aux>
                                ) : null}
                                <Link to="/dashboard/notifications" className="dropdown-item dropdown-footer">Xem tất cả thông báo</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="dropdown" href="#a">
                                <i className="fas fa-user"></i> {" "} {this.props.fullname}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right mr-2">
                                <NavLink to="/dashboard/profile" className="dropdown-item">
                                    <i className="far fa-id-badge"></i> Trang cá nhân
                                </NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink to="/logout" className="dropdown-item">
                                    <i className="fa fa-sign-out"></i> Đăng xuất
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/* <!-- /.navbar --> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        userId: state.auth.userId,
        fullname: state.auth.fullname,
        notifications: state.auth.notifications
    };
};

export default connect(mapStateToProps, null)(Navigation);