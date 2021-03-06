import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, resetRegisterState } from '../../store/actions/authActions';
import { getPreferenceCategories } from '../../store/actions/userActions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Breadcumb from '../../components/Breadcrumb/Breadcrumb';
import { updateObject } from '../../utils/utility';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerInputControls } from '../../utils/input-controls';
import { registerInputChangeHandler } from '../../utils/input-change';
import Select from 'react-select';
class Register extends Component {

    state = {
        controls: registerInputControls,
        toBeReviewer: false,
        formIsValid: false,
        preferenceCategories: null
    }

    componentDidMount() {
        this.props.getPreferenceCategories();
        this.props.onResetRegisterState();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.onResetRegisterState();
        }
        if (nextProps.isSignedUp && !nextProps.error) {
            this.props.history.push('/login');
        }
    }

    checkboxChangeHandler = (event) => {
        const updatedState = updateObject(this.state, {
            toBeReviewer: event.target.checked
        });
        this.setState(updatedState);
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        const { updatedControls, eq } = registerInputChangeHandler(event, this.state);
        this.setState({
            controls: updatedControls,
            formIsValid: eq
        });
    };

    preferenceChangeHandler = (selectedOption) => {
        this.setState({ preferenceCategories: selectedOption });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const body = {
            username: this.state.controls.username.value,
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            firstname: this.state.controls.firstname.value,
            lastname: this.state.controls.lastname.value,
            affiliation: this.state.controls.affiliation.value,
            biography: this.state.controls.biography.value,
            toBeReviewer: this.state.toBeReviewer,
            preferenceCategoryId: this.state.preferenceCategories ? this.state.preferenceCategories.map(c => c.value) : null
        };
        this.props.onRegister(body);
    };

    render() {
        return (
            <Aux>
                <Navigation history={this.props.history} />
                <Breadcumb
                    title="Đăng ký tài khoản"
                    imageUrl={`url(${require("../../resources/imgs/40.jpg")})`} />
                <div className="mag-login-area py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-6">
                                <div className="login-content bg-white p-30 box-shadow">
                                    <div className="section-heading">
                                        <h5>Tạo tài khoản mới tại OJS</h5>
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="username"
                                            className={!this.state.controls.username.valid && this.state.controls.username.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.username.elementConfig.placeholder}
                                            defaultValue={this.state.controls.username.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.username.valid && this.state.controls.username.touched ?
                                            <p className="form-control-error-msg">Tên đăng nhập không hợp lệ!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            className={!this.state.controls.email.valid && this.state.controls.email.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.email.elementConfig.placeholder}
                                            defaultValue={this.state.controls.email.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.email.valid && this.state.controls.email.touched ?
                                            <p className="form-control-error-msg">Địa chỉ email không hợp lệ!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            name="password"
                                            className={!this.state.controls.password.valid && this.state.controls.password.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.password.elementConfig.placeholder}
                                            defaultValue={this.state.controls.password.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.password.valid && this.state.controls.password.touched ?
                                            <p className="form-control-error-msg">Mật khẩu không hợp lệ!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            className={!this.state.controls.confirm_password.valid && this.state.controls.confirm_password.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.confirm_password.elementConfig.placeholder}
                                            defaultValue={this.state.controls.confirm_password.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.confirm_password.valid && this.state.controls.confirm_password.touched ?
                                            <p className="form-control-error-msg">Mật khẩu không hợp lệ!</p> : null}
                                        {this.state.controls.password.value !== this.state.controls.confirm_password.value
                                            && this.state.controls.confirm_password.touched ?
                                            <p className="form-control-error-msg">Mật khẩu không khớp!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="firstname"
                                            className={!this.state.controls.firstname.valid && this.state.controls.firstname.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.firstname.elementConfig.placeholder}
                                            defaultValue={this.state.controls.firstname.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.firstname.valid && this.state.controls.firstname.touched ?
                                            <p className="form-control-error-msg">Tên không hợp lệ!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="lastname"
                                            className={!this.state.controls.lastname.valid && this.state.controls.lastname.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.lastname.elementConfig.placeholder}
                                            defaultValue={this.state.controls.lastname.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.lastname.valid && this.state.controls.lastname.touched ?
                                            <p className="form-control-error-msg">Họ không hợp lệ!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="affiliation"
                                            className={!this.state.controls.affiliation.valid && this.state.controls.affiliation.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.affiliation.elementConfig.placeholder}
                                            defaultValue={this.state.controls.affiliation.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.affiliation.valid && this.state.controls.affiliation.touched ?
                                            <p className="form-control-error-msg">Địa chỉ công tác tối đa 255 ký tự!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="biography"
                                            className={!this.state.controls.biography.valid && this.state.controls.biography.touched ? "form-control-error" : "form-control"}
                                            placeholder={this.state.controls.biography.elementConfig.placeholder}
                                            defaultValue={this.state.controls.biography.value}
                                            onChange={this.inputChangeHandler} />
                                        {!this.state.controls.biography.valid && this.state.controls.biography.touched ?
                                            <p className="form-control-error-msg">Giới thiệu bản thân tối đa 10000 ký tự!</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <Select
                                            styles={{
                                                menu: (provided, state) => ({
                                                    ...provided,
                                                    zIndex: 9999,
                                                    padding: 10,
                                                }),
                                                input: (provided) => ({
                                                    ...provided,
                                                    height: 35
                                                }),
                                                placeholder: (provided) => ({
                                                    ...provided,
                                                    paddingLeft: 20
                                                }),
                                            }}
                                            // defaultValue={this.props.user.preferenceCategoryId}
                                            isMulti
                                            name="preference-categories"
                                            options={this.props.categories}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Chọn lĩnh vực nghiên cứu của bạn"
                                            onChange={this.preferenceChangeHandler} />
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customControlAutosizing"
                                                checked={this.state.toBeReviewer}
                                                name="toBeReviewer"
                                                onChange={this.checkboxChangeHandler}
                                            />
                                            <label className="custom-control-label" htmlFor="customControlAutosizing"></label> Tôi muốn trở thành nhà thẩm định (Reviewer)
                                            </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn mag-btn mt-10"
                                        onClick={this.formSubmitHandler}
                                        disabled={!this.state.formIsValid}>Đăng ký</button>
                                    <div className="mt-20">
                                        Đã có tài khoản? Đăng nhập <Link to="/login"> tại đây.</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <ToastContainer autoClose={2000} />
                {this.props.error ? toast.error(this.props.error) : null}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isSignedUp: state.auth.isSignedUp,
        categories: state.user.categories
    };
};

const mapDispatchToProps = {
    onRegister: register,
    onResetRegisterState: resetRegisterState,
    getPreferenceCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);