import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <div>
                {/* <!-- Main Sidebar Container --> */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <div className="brand-link">
                        <NavLink to="/">
                            <img src="https://w7.pngwing.com/pngs/791/922/png-transparent-react-javascript-library-redux-user-interface-tesseract-logo-symmetry-nodejs.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ 'opacity': .8 }} />
                            <div style={{ fontSize: '18px', color: 'white' }}>HL Open Journal</div>
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
                                <div className="d-block text-success">{this.props.role}</div>
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
                                        <li className="nav-item">
                                            <NavLink to="/dashboard/new-submission" className="nav-link">
                                                <i className="nav-icon fas fa-edit"></i>
                                                <p>Submit bài bào</p>
                                            </NavLink>
                                        </li>
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
        role: state.auth.role.name,
        avatar: state.auth.avatar
    };
};

export default connect(mapStateToProps, null)(Sidebar);