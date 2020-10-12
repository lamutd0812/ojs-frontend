import React, { Component } from 'react';
import Navigation from '../../components/Dashboard/Navigation';
import Sidebar from '../../components/Dashboard/Sidebar';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Sidebar />
            </div>
        );
    }
}

export default Dashboard;