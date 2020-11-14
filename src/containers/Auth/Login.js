import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { auth, resetRegisterState } from '../../store/actions/authActions';
import { updateObject, checkValidity } from '../../utils/utility';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    state = {
        controls: {
            username: {
                elementConfig: {
                    type: 'username',
                    placeholder: 'Tên đăng nhập*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Mật khẩu*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    componentDidUpdate() {
        if(this.props.isSignedUp) {
            this.props.resetRegisterState();
            toast.success("Đăng ký tài khoản thành công!");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetRegisterState();
        }
    }

    inputChangeHandler = (event) => {
        let controlName = event.target.name;
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.username.value,
            this.state.controls.password.value);
    };

    render() {
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to="/" />
        }

        return (
            <Aux>
                {authRedirect}
                <Navigation />
                <Breadcrumb
                    title="Trang Đăng Nhập"
                    imageUrl={`url(${require("../../resources/imgs/40.jpg")})`} />
                <div className="mag-login-area py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-6">
                                <div className="login-content bg-white p-30 box-shadow">
                                    <div className="section-heading">
                                        <h5>Chào mừng bạn quay trở lại!</h5>
                                    </div>
                                    <form onSubmit={this.formSubmitHandler}>
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
                                            <div>Quên mật khẩu?</div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn mag-btn mt-10"
                                            disabled={!this.state.formIsValid}>Đăng nhập</button>
                                    </form>
                                    <div className="mt-20">
                                        Hoặc tạo tài khoản mới <Link to="/register"> tại đây.</Link>
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
        isAuth: state.auth.token !== null,
        isSignedUp: state.auth.isSignedUp
    };
};

const mapDispatchToProps = {
    auth,
    resetRegisterState
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);