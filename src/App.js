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
import { keepAuthState } from './store/actions/authActions';

class App extends Component {

    componentDidMount() {
        // keep auth state
        this.props.onKeepSigninState();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" exact component={Layout} />
                <Redirect to="/login" />
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/logout" component={Logout} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/" exact component={Layout} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    };
};

const mapDispatchToProps = {
    onKeepSigninState: keepAuthState
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));