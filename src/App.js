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
import Article from './containers/Article/Article';

class App extends Component {

    componentDidMount() {
        // keep auth state
        this.props.keepAuthState();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.isAuth && this.props.isAuth) {
            this.props.getMyNotifications();
        }
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/single-article" component={Article} />
                <Route exact path="/" component={Layout} />
                <Redirect to="/login" />
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/logout" component={Logout} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/single-article" component={Article} />
                    <Route exact path="/" component={Layout} />
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
    keepAuthState,
    getMyNotifications
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));