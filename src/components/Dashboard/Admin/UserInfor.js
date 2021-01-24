import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { getUserInfor, getAllRoles, changeUserRole, resetchangeUserRoleState } from '../../../store/actions/userActions';
import { getFormattedDate, updateObject } from '../../../utils/utility';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import ContentHeader from '../Shared/ContentHeader';
import { toast } from 'react-toastify';

class UserInfor extends Component {

    state = {
        roleId: '',
        touched: false
    }

    componentDidMount() {
        this.props.getAllRoles();
        if (this.props.match.params.userId) {
            this.props.getUserInfor(this.props.match.params.userId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.props.getUserInfor(this.props.match.params.userId);
        }
    }

    initControlValues = (user) => {
        this.setState(updateObject(this.state, {
            roleId: user.role._id,
        }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetchangeUserRoleState();
        }
        if (nextProps.user && nextProps.user !== this.props.user) {
            this.initControlValues(nextProps.user);
        }
        if (nextProps.isUserRoleChanged && !nextProps.error) {
            this.props.resetchangeUserRoleState();
            toast.success("Phân quyền người dùng thành công!");
        }
    }

    roleSelectedChangeHandler = (event) => {
        event.preventDefault();
        this.setState(updateObject(this.state, {
            roleId: event.target.value,
            touched: true
        }));
    }

    confirmSubmitHandler = () => {
        this.props.changeUserRole(this.props.user._id, this.state.roleId);
    }

    render() {

        const profile = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Thông tin người dùng">
                        <li className="breadcrumb-item active">Thông tin người dùng</li>
                    </ContentHeader>
                </section>
                <section className="content">
                    {!this.props.loading && this.props.user ? (
                        <div className="container-fluid">
                            {/* Row */}
                            <div className="row">
                                {/* Col */}
                                <div className="col-md-3">
                                    {/* Card */}
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h3 className="card-title" style={{ fontSize: '16px' }}>Ảnh đại diện</h3>
                                        </div>
                                        <div className="card-body box-profile">
                                            <div className="text-center">
                                                <img className="profile-user-img img-fluid img-circle"
                                                    src={this.props.user.avatar}
                                                    alt="User profile" />
                                            </div>

                                            <h3 className="profile-username text-center">{this.props.user.lastname} {this.props.user.firstname}</h3>
                                            <p className="text-muted text-center">{this.props.user.role.name}</p>
                                        </div>
                                    </div>
                                    {/* Card */}
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h3 className="card-title" style={{ fontSize: '16px' }}>Thông tin cá nhân</h3>
                                        </div>
                                        <div className="card-body">
                                            <strong><i className="fas fa-calendar mr-1"></i> Ngày tham gia</strong>
                                            <p className="text-muted ml-3">{getFormattedDate(this.props.user.createdAt)}</p>

                                            <strong><i className="fas fa-map mr-1"></i> Tổ chức</strong>
                                            <p className="text-muted ml-3">{this.props.user.affiliation}</p>

                                            <strong><i className="fas fa-map mr-1"></i> Mô tả bản thân</strong>
                                            <p className="text-muted ml-3">{this.props.user.biography}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Col */}
                                <div className="col-md-9">
                                    <div className="card card-primary card-outline">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Tên đăng nhập:</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        disabled
                                                        style={{ cursor: 'not-allowed' }}
                                                        defaultValue={this.props.user.username} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Địa chỉ email:</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        className="form-control"
                                                        disabled
                                                        style={{ cursor: 'not-allowed' }}
                                                        defaultValue={this.props.user.email} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Họ tên:</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        name="fullname"
                                                        className="form-control"
                                                        disabled
                                                        style={{ cursor: 'not-allowed' }}
                                                        defaultValue={`${this.props.user.lastname} ${this.props.user.firstname}`} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Đơn vị công tác:</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        name="affiliation"
                                                        className="form-control"
                                                        disabled
                                                        style={{ cursor: 'not-allowed' }}
                                                        defaultValue={this.props.user.affiliation} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Tiểu sử:</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        name="biography"
                                                        className="form-control"
                                                        disabled
                                                        style={{ cursor: 'not-allowed' }}
                                                        defaultValue={this.props.user.biography} />
                                                </div>
                                            </div>
                                            {this.props.roles.length > 0 && (
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Vai trò:</label>
                                                    <div className="col-sm-10">
                                                        <select
                                                            name="roleId"
                                                            defaultValue={this.value}
                                                            className="custom-select form-control"
                                                            onChange={this.roleSelectedChangeHandler}
                                                        >
                                                            <option value={this.props.user.role._id} hidden>{this.props.user.role.name}</option>
                                                            {this.props.roles.map(role => (
                                                                <option key={role._id} value={role._id}>
                                                                    {role.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>
                                            )}

                                            <div className="form-group row">
                                                <div className="offset-sm-2 col-sm-10">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-dark btn-flat"
                                                        data-toggle="modal"
                                                        data-target="#confirmDialogModal"
                                                        disabled={!this.state.touched}>Phân quyền người dùng</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </section>
            </div>
        );

        return (
            <Aux>
                {profile}
                <ConfirmDialog
                    title="Xác nhận"
                    message="Thay đổi vai trò người dùng?"
                    confirm={this.confirmSubmitHandler} />
                {this.props.error ? toast.error('Error: ' + this.props.error) : null}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user_infor,
        loading: state.user.loading,
        error: state.user.error,
        roles: state.user.roles,
        isUserRoleChanged: state.user.isUserRoleChanged
    }
};

const mapDispatchToProps = {
    getUserInfor,
    getAllRoles,
    changeUserRole,
    resetchangeUserRoleState
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfor);
