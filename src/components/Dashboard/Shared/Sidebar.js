import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Link, NavLink } from 'react-router-dom';
import { USER_ROLES } from '../../../utils/constant';

class Sidebar extends Component {

    render() {
        return (
            <div>
                {/* <!-- Main Sidebar Container --> */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <div className="brand-link p-2">
                        <NavLink to="/">
                            <img src={require("../../../resources/core-imgs/logo3_admin.png")} className="logo-admin" alt="" style={{width:'50%', height:'50%'}}/>
                        </NavLink>
                    </div>

                    {/* <!-- Sidebar --> */}
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image mt-2">
                                <img src={this.props.avatar} alt="UserImage" />
                            </div>
                            <div className="info">
                                <Link to="#" className="d-block">{this.props.fullname}</Link>
                                <div className="d-block text-success">{this.props.roleName}</div>
                            </div>
                        </div>

                        {/* <!-- SidebarSearch Form --> */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Sidebar Menu --> */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item menu-open">
                                    <ul className="nav nav-treeview">
                                        {this.props.roleId === USER_ROLES.CHIEF_EDITOR.roleId ? (
                                            <li className="nav-item">
                                                <NavLink to="/dashboard/chief-editor" className="nav-link">
                                                    <i className="nav-icon fas fa-edit"></i>
                                                    <p>Trang tổng biên tập</p>
                                                </NavLink>
                                                <NavLink to="/dashboard/vast/statistics" className="nav-link">
                                                    <i className="nav-icon fas fa-chart-bar"></i>
                                                    <p>Thống kê NCKH</p>
                                                </NavLink>
                                            </li>
                                        ) : this.props.roleId === USER_ROLES.EDITOR.roleId ? (
                                            <Aux>
                                                <li className="nav-item">
                                                    <NavLink to="/dashboard/author" className="nav-link">
                                                        <i className="nav-icon fas fa-edit"></i>
                                                        <p>Trang tác giả</p>
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink to="/dashboard/editor" className="nav-link">
                                                        <i className="nav-icon fas fa-edit"></i>
                                                        <p>Trang biên tập viên</p>
                                                    </NavLink>
                                                </li>
                                            </Aux>
                                        ) : this.props.roleId === USER_ROLES.REVIEWER.roleId ? (
                                            <Aux>
                                            <li className="nav-item">
                                                <NavLink to="/dashboard/author" className="nav-link">
                                                    <i className="nav-icon fas fa-edit"></i>
                                                    <p>Trang tác giả</p>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/dashboard/reviewer" className="nav-link">
                                                    <i className="nav-icon fas fa-edit"></i>
                                                    <p>Trang thẩm định viên</p>
                                                </NavLink>
                                            </li>
                                        </Aux>
                                        )
                                         : this.props.roleId === USER_ROLES.AUTHOR.roleId ? (
                                            <li className="nav-item">
                                            <NavLink to="/dashboard/author" className="nav-link">
                                                <i className="nav-icon fas fa-edit"></i>
                                                <p>Trang tác giả</p>
                                            </NavLink>
                                        </li>
                                        ) : null}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        {/* <!-- /.sidebar-menu --> */}
                    </div>
                    {/* <!-- /.sidebar --> */}
                </aside>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        userId: state.auth.userId,
        fullname: state.auth.fullname,
        roleName: state.auth.role.name,
        roleId: state.auth.role._id,
        avatar: state.auth.avatar
    };
};

export default connect(mapStateToProps, null)(Sidebar);