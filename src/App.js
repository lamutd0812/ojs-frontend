import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './hoc/Dashboard/Dashboard';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Logout from './containers/Auth/Logout';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { connect } from 'react-redux';
import { keepAuthState, getMyNotifications } from './store/actions/authActions';
import Articles from './containers/Articles/Articles';
import Article from './containers/Articles/Article/Article';
import { ToastContainer, toast } from 'react-toastify';
import openSocket from 'socket.io-client';
class App extends Component {

    componentDidMount() {
        // keep auth state
        this.props.keepAuthState();

        const socket = openSocket('http://localhost:5000');
        socket.on('noti', data => {
            if (this.props.isAuth && data.action === 'push-noti') {
                console.log(data);
                if (this.props.userId === data.noti.receiverId) {
                    toast.success(data.noti.content);
                }
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.isAuth && this.props.isAuth) {
            this.props.getMyNotifications();
        }
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/articles" component={Articles} />
                <Route path="/single-article/:id" component={Article} />
                <Route exact path="/" component={Layout} />
                <Redirect to="/login" />
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/logout" component={Logout} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/articles" component={Articles} />
                    <Route path="/single-article/:id" component={Article} />
                    <Route exact path="/" component={Layout} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                {routes}
                <ToastContainer autoClose={2000} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = {
    keepAuthState,
    getMyNotifications
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));