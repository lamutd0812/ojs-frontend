import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../store/actions/userActions';
import { getMyNotifications } from '../../../store/actions/authActions';
import ContentHeader from '../Shared/ContentHeader';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';

class Home extends Component {

    componentDidMount() {
        this.props.getAllUsers();
    }

    refreshHandler = () => {
        this.props.getAllUsers();
        this.props.getAllRoles();
        this.props.getMyNotifications();
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Quản lý người dùng">
                        <li className="breadcrumb-item">Quản lý người dùng</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Thông tin người dùng</h3>
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body p-0">
                                {this.props.users.length > 0 ? (
                                    <Aux>
                                        <table className="table table-hover projects">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '1%' }}> #</th>
                                                    <th style={{ width: '29%' }}> Họ tên </th>
                                                    <th style={{ width: '15%' }}> Username</th>
                                                    <th style={{ width: '20%' }}> Email</th>
                                                    <th style={{ width: '15%' }}> Vai trò</th>
                                                    <th style={{ width: '20%' }} className="text-center"> Xem chi tiết</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.users.map(user => (
                                                    <Aux key={user._id}>
                                                        <tr data-toggle="collapse" data-target={`#aaa${user._id}`} className="accordion-toggle" aria-expanded="true" aria-controls="collapseOne">
                                                            <td style={{ cursor: 'pointer' }}><i className="fas fa-caret-down"></i></td>
                                                            <td><b>{user.lastname} {user.firstname}</b></td>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.role.name}</td>
                                                            <td className="project-actions text-center">
                                                                <Link to={`/dashboard/users/${user._id}`} className="btn btn-outline-dark btn-sm mr-1 btn-flat">
                                                                    <i className="fas fa-eye"></i> Xem chi tiết
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                        {/* sub tab */}
                                                        <tr>
                                                            <td colSpan="8" className="hiddenRow">
                                                                <div id={`aaa${user._id}`} className="accordian-body collapse">
                                                                    <div className="col-lg-12">
                                                                        <div className="row pl-5">
                                                                            <div className="col-lg-4 pt-2">

                                                                            </div>
                                                                            <div className="col-lg-4 border rounded pt-2">

                                                                            </div>
                                                                            <div className="col-lg-4 border rounded pt-2 pb-2">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </Aux>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Aux>
                                ) : <div>Không tìm thấy thông tin người dùng.</div>}
                            </div>
                        </div>
                    ) : <Spinner />}
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        roles: state.user.roles,
        loading: state.user.loading,
        error: state.user.error,
    };
};

const mapDispatchToProps = {
    getAllUsers,
    getMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);