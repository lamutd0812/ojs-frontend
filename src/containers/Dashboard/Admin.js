import React, { Component } from 'react';

class Admin extends Component {
    render() {
        return (
            <div>
                {/* <!-- Navbar --> */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* <!-- Left navbar links --> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="idndex.html" role="button"><i className="fas fa-bars"></i></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="index3.html" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="idndex.html" className="nav-link">Contact</a>
                        </li>
                    </ul>

                    {/* <!-- SEARCH FORM --> */}
                    <form className="form-inline ml-3">
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-navbar" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* <!-- Right navbar links --> */}
                    <ul className="navbar-nav ml-auto">
                        {/* <!-- Messages Dropdown Menu --> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="idndex.html">
                                <i className="far fa-comments"></i>
                                <span className="badge badge-danger navbar-badge">3</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <a href="idndex.html" className="dropdown-item">
                                    {/* <!-- Message Start --> */}
                                    <div className="media">
                                        <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Brad Diesel
                  <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">Call me whenever you can...</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                    {/* <!-- Message End --> */}
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="idndex.html" className="dropdown-item">
                                    {/* <!-- Message Start --> */}
                                    <div className="media">
                                        <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                John Pierce
                  <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">I got your message bro</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                    {/* <!-- Message End --> */}
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="idndex.html" className="dropdown-item">
                                    {/* <!-- Message Start --> */}
                                    <div className="media">
                                        <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Nora Silvester
                  <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">The subject goes here</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                    {/* <!-- Message End --> */}
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="idndex.html" className="dropdown-item dropdown-footer">See All Messages</a>
                            </div>
                        </li>
                        {/* <!-- Notifications Dropdown Menu --> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="idndex.html">
                                <i className="far fa-bell"></i>
                                <span className="badge badge-warning navbar-badge">15</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <span className="dropdown-header">15 Notifications</span>
                                <div className="dropdown-divider"></div>
                                <a href="idndex.html" className="dropdown-item">
                                    <i className="fas fa-envelope mr-2"></i> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="idndex.html" className="dropdown-item">
                                    <i className="fas fa-users mr-2"></i> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="idndex.html" className="dropdown-item">
                                    <i className="fas fa-file mr-2"></i> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="idndex.html" className="dropdown-item dropdown-footer">See All Notifications</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-widget="fullscreen" href="idndex.html" role="button">
                                <i className="fas fa-expand-arrows-alt"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="idndex.html" role="button">
                                <i className="fas fa-th-large"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* <!-- /.navbar --> */}

                {/* <!-- Main Sidebar Container --> */}
                <aside class="main-sidebar sidebar-dark-primary elevation-4">
                    {/* <!-- Brand Logo --> */}
                    <a href="index3.html" class="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{ 'opacity': .8 }} />
                        <span class="brand-text font-weight-light">AdminLTE 3</span>
                    </a>

                    {/* <!-- Sidebar --> */}
                    <div class="sidebar">
                        {/* <!-- Sidebar user panel (optional) --> */}
                        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div class="image">
                                <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="UserImage" />
                            </div>
                            <div class="info">
                                <a href="index.html" class="d-block">Alexander Pierce</a>
                            </div>
                        </div>

                        {/* <!-- SidebarSearch Form --> */}
                        <div class="form-inline">
                            <div class="input-group" data-widget="sidebar-search">
                                <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div class="input-group-append">
                                    <button class="btn btn-sidebar">
                                        <i class="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Sidebar Menu --> */}
                        <nav class="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
                                <li class="nav-item menu-open">
                                    <a href="index.html" class="nav-link active">
                                        <i class="nav-icon fas fa-tachometer-alt"></i>
                                        <p>
                                            Starter Pages
                <i class="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <a href="index.html" class="nav-link active">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Active Page</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="index.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>Inactive Page</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a href="index.html" class="nav-link">
                                        <i class="nav-icon fas fa-th"></i>
                                        <p>
                                            Simple Link
                <span class="right badge badge-danger">New</span>
                                        </p>
                                    </a>
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

export default Admin;