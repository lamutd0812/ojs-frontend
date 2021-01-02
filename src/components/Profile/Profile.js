import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormattedDate, updateObject } from '../../utils/utility';
import ContentHeader from '../Dashboard/Shared/ContentHeader';
import {
    getMyUserInfor, updateUserInfor, resetUpdateUserInforState,
    changePassword, resetChangePasswordState,
    changeAvatar, resetChangeAvatarState, getPreferenceCategories
} from '../../store/actions/userActions';
import Spinner from '../UI/Spinner/Spinner';
import { updateUserInforInputControls, changePasswordInputControls } from '../../utils/input-controls';
import { updateUserInforInputChangeHandler, changePasswordInputChangeHandler } from '../../utils/input-change';
import { toast } from 'react-toastify';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ConfirmDialog from '../UI/ConfirmDialog/ConfirmDialog';
import Select from 'react-select';
class Profile extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: updateUserInforInputControls,
        controls_change_pwd: changePasswordInputControls,
        formIsValid: true,
        formIsValid_change_pwd: false,
        avatar: null,
        preferenceCategories: null
    }

    componentDidMount() {
        this.props.getPreferenceCategories();
        this.props.getMyUserInfor();
    }

    initControlValues = (user) => {
        const updatedControls = updateObject(this.state.controls, {
            username: updateObject(this.state.controls.username, { value: user.username }),
            email: updateObject(this.state.controls.email, { value: user.email }),
            firstname: updateObject(this.state.controls.firstname, { value: user.firstname }),
            lastname: updateObject(this.state.controls.lastname, { value: user.lastname }),
            affiliation: updateObject(this.state.controls.affiliation, { value: user.affiliation }),
            biography: updateObject(this.state.controls.biography, { value: user.biography }),
        });
        const preferences = user.preferenceCategoryId.map(c => c.value);
        this.setState(updateObject(this.state, {
            controls: updatedControls,
            preferenceCategories: preferences
        }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetUpdateUserInforState();
            this.props.resetChangePasswordState();
            this.props.resetChangeAvatarState();
        }
        if (nextProps.user && nextProps.user !== this.props.user) {
            this.initControlValues(nextProps.user);
        }
        if (nextProps.isUserInforUpdated && !nextProps.error) {
            this.props.resetUpdateUserInforState();
            toast.success("Cập nhật thông tin cá nhân thành công!");
        }
        if (nextProps.isPasswordChanged && !nextProps.error) {
            this.props.resetChangePasswordState();
            toast.success("Thay đổi mật khẩu thành công!");
        }
        if (nextProps.isAvatarChanged && !nextProps.error) {
            this.props.resetChangeAvatarState();
            toast.success("Cập nhật ảnh đại diện thành công!");
        }
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        const { updatedControls, formIsValid } = updateUserInforInputChangeHandler(event, this.state);
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    inputChangeHandler_CPWD = (event) => {
        event.preventDefault();
        const { updatedControls, eq } = changePasswordInputChangeHandler(event, this.state);
        this.setState({
            controls_change_pwd: updatedControls,
            formIsValid_change_pwd: eq
        });
    };

    step1ActiveHandler = (event) => {
        event.preventDefault();
        let newState = updateObject(this.state, {
            step1Active: true,
            step2Active: false,
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
        });
        this.setState(newState);
    }

    confirmSubmitHandler = () => {
        if (this.state.step1Active) {
            if (this.state.avatar) {
                const formData = new FormData();
                formData.append('avatar', this.state.avatar);
                this.props.changeAvatar(formData);
            } else {
                const body = {
                    email: this.state.controls.email.value,
                    firstname: this.state.controls.firstname.value,
                    lastname: this.state.controls.lastname.value,
                    affiliation: this.state.controls.affiliation.value,
                    biography: this.state.controls.biography.value,
                    preferenceCategoryId: this.state.preferenceCategories
                }
                this.props.updateUserInfor(body);
            }
        } else {
            const body = {
                oldPassword: this.state.controls_change_pwd.old_password.value,
                newPassword: this.state.controls_change_pwd.new_password.value
            }
            this.props.changePassword(body);
        }
    }

    onAvatarChangeHandler = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        this.setState({ avatar: file });
    }

    preferenceChangeHandler = (selectedOption) => {
        const preference = selectedOption.map(c => c.value);
        this.setState({ preferenceCategories: preference });
        console.log(this.state);
    }

    render() {

        const profile = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Trang cá nhân">
                        <li className="breadcrumb-item active">Trang cá nhân</li>
                    </ContentHeader>
                </section>
                <section className="content">
                    {!this.props.loading && this.props.user ? (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3">
                                    {/* Card */}
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h3 className="card-title" style={{ fontSize: '16px' }}>Ảnh đại diện</h3>
                                        </div>
                                        <div className="card-body box-profile">
                                            <div className="text-center">
                                                {!this.state.avatar ? (
                                                    <img className="profile-user-img img-fluid img-circle"
                                                        src={this.props.user.avatar}
                                                        alt="User profile" />
                                                ) : (
                                                        <img className="profile-user-img img-fluid img-circle"
                                                            src={URL.createObjectURL(this.state.avatar)}
                                                            alt="User profile" />
                                                    )}
                                            </div>

                                            <input type="file"
                                                ref={(ref) => this.upload = ref}
                                                style={{ display: 'none' }}
                                                onChange={this.onAvatarChangeHandler} />
                                            <div className="text-danger text-center font-weight-bold pt-1"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => { this.upload.click() }}>
                                                <u>Chọn ảnh đại diện</u>
                                            </div>

                                            <h3 className="profile-username text-center">{this.props.user.lastname} {this.props.user.firstname}</h3>
                                            <p className="text-muted text-center">{this.props.user.role.name}</p>
                                            <div className="text-center">
                                                <button
                                                    className="btn btn-outline-dark btn-flat"
                                                    data-toggle="modal"
                                                    data-target="#confirmDialogModal"
                                                    disabled={!this.state.avatar}>Cập nhật ảnh đại diện</button>
                                            </div>
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

                                <div className="col-md-9">
                                    <div className="card">
                                        <div className="card-header p-2">
                                            <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                                <li className="nav-item">
                                                    <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}
                                                        onClick={this.step1ActiveHandler}>
                                                        <div className={this.state.step1Active ? 'text-custom' : 'text-secondary'}><b>Cập nhật thông tin cá nhân</b></div>
                                                    </div>
                                                </li>
                                                <li className="nav-item">
                                                    <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                                        onClick={this.step2ActiveHandler}>
                                                        <div className={this.state.step2Active ? 'text-custom' : 'text-secondary'}><b>Thay đổi mật khẩu</b></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <div className="tab-content" id="custom-tabs-one-tabContent">
                                                {/* ------------------Tab 1----------------- */}
                                                <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Tên đăng nhập*</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                className="form-control"
                                                                disabled
                                                                style={{ cursor: 'not-allowed' }}
                                                                defaultValue={this.state.controls.username.value} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Email*</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                className={!this.state.controls.email.valid && this.state.controls.email.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls.email.value}
                                                                onChange={this.inputChangeHandler} />
                                                            {!this.state.controls.email.valid && this.state.controls.email.touched ?
                                                                <p className="form-control-error-msg">Email không hợp lệ!</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Họ đệm*</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                name="firstname"
                                                                className={!this.state.controls.firstname.valid && this.state.controls.firstname.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls.firstname.value}
                                                                onChange={this.inputChangeHandler} />
                                                            {!this.state.controls.firstname.valid && this.state.controls.firstname.touched ?
                                                                <p className="form-control-error-msg">Giá trị không hợp lệ!</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Tên*</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                name="lastname"
                                                                className={!this.state.controls.lastname.valid && this.state.controls.lastname.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls.lastname.value}
                                                                onChange={this.inputChangeHandler} />
                                                            {!this.state.controls.lastname.valid && this.state.controls.lastname.touched ?
                                                                <p className="form-control-error-msg">Giá trị không hợp lệ!</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Tổ chức</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                name="affiliation"
                                                                className={!this.state.controls.affiliation.valid && this.state.controls.affiliation.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls.affiliation.value}
                                                                onChange={this.inputChangeHandler} />
                                                            {!this.state.controls.affiliation.valid && this.state.controls.affiliation.touched ?
                                                                <p className="form-control-error-msg">Giá trị không hợp lệ!</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Giới thiệu</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                name="biography"
                                                                className={!this.state.controls.biography.valid && this.state.controls.biography.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls.biography.value}
                                                                onChange={this.inputChangeHandler} />
                                                            {!this.state.controls.biography.valid && this.state.controls.biography.touched ?
                                                                <p className="form-control-error-msg">Giá trị không hợp lệ!</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Lĩnh vực yêu thích</label>
                                                        <div className="col-sm-10">
                                                            <Select
                                                                styles={{
                                                                    menu: (provided, state) => ({
                                                                        ...provided,
                                                                        padding: 10,
                                                                    }),
                                                                    input: (provided) => ({
                                                                        ...provided,
                                                                        height: 35,
                                                                    }),
                                                                    placeholder: (provided) => ({
                                                                        ...provided,
                                                                        paddingLeft: 20
                                                                    })
                                                                }}
                                                                defaultValue={this.props.user.preferenceCategoryId}
                                                                isMulti
                                                                name="preference-categories"
                                                                options={this.props.categories}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Chọn lĩnh vực yêu thích của bạn"
                                                                onChange={this.preferenceChangeHandler}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-dark btn-flat"
                                                                data-toggle="modal"
                                                                data-target="#confirmDialogModal"
                                                                disabled={!this.state.formIsValid}>Cập nhật</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* ------------------Tab 2----------------- */}
                                                <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Mật khẩu cũ*</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="password"
                                                                name="old_password"
                                                                className={!this.state.controls_change_pwd.old_password.valid && this.state.controls_change_pwd.old_password.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls_change_pwd.old_password.value}
                                                                onChange={this.inputChangeHandler_CPWD} />
                                                            {!this.state.controls_change_pwd.old_password.valid && this.state.controls_change_pwd.old_password.touched ?
                                                                <p className="form-control-error-msg">Mật khẩu cũ không hợp lệ!</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Mật khẩu mới*</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="password"
                                                                name="new_password"
                                                                className={!this.state.controls_change_pwd.new_password.valid && this.state.controls_change_pwd.new_password.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls_change_pwd.new_password.value}
                                                                onChange={this.inputChangeHandler_CPWD} />
                                                            {!this.state.controls_change_pwd.new_password.valid && this.state.controls_change_pwd.new_password.touched ?
                                                                <p className="form-control-error-msg">Mật khẩu mới không hợp lệ!</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Xác nhận mật khẩu*</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="password"
                                                                name="confirm_password"
                                                                className={!this.state.controls_change_pwd.confirm_password.valid && this.state.controls_change_pwd.confirm_password.touched ? "form-control-error" : "form-control"}
                                                                defaultValue={this.state.controls_change_pwd.confirm_password.value}
                                                                onChange={this.inputChangeHandler_CPWD} />
                                                            {/* {!this.state.controls_change_pwd.confirm_password.valid && this.state.controls_change_pwd.confirm_password.touched ?
                                                                <p className="form-control-error-msg">Mật khẩu mới không hợp lệ!</p> : null} */}
                                                            {this.state.controls_change_pwd.new_password.value !== this.state.controls_change_pwd.confirm_password.value
                                                                && this.state.controls_change_pwd.confirm_password.touched ?
                                                                <p className="form-control-error-msg">Mật khẩu mới và xác nhận mật khẩu không khớp!</p> : null}
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-dark btn-flat"
                                                                data-toggle="modal"
                                                                data-target="#confirmDialogModal"
                                                                disabled={!this.state.formIsValid_change_pwd}>Thay đổi mật khẩu</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <Spinner />}
                </section>
            </div>
        );

        return (
            <Aux>
                {profile}
                {this.state.step1Active ? (
                    <ConfirmDialog
                        title="Xác nhận"
                        message={this.state.avatar ? "Cập nhật ảnh đại diện?" : "Cập nhật thông tin cá nhân?"}
                        confirm={this.confirmSubmitHandler} />
                ) : (
                        <ConfirmDialog
                            title="Xác nhận"
                            message="Thay đổi mật khẩu?"
                            confirm={this.confirmSubmitHandler} />
                    )}
                {this.props.error ? toast.error('Error: ' + this.props.error) : null}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loading: state.user.loading,
        error: state.user.error,
        isUserInforUpdated: state.user.isUserInforUpdated,
        isPasswordChanged: state.user.isPasswordChanged,
        isAvatarChanged: state.user.isAvatarChanged,
        categories: state.user.categories
    }
};

const mapDispatchToProps = {
    getMyUserInfor,
    updateUserInfor,
    resetUpdateUserInforState,
    changePassword,
    resetChangePasswordState,
    changeAvatar,
    resetChangeAvatarState,
    getPreferenceCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
