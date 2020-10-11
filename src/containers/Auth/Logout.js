import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <div>
                <Redirect to="/" />
            </div>
        );
    }
}

const mapDispatchToProps = {
    onLogout: logout
};


export default connect(null, mapDispatchToProps)(Logout);