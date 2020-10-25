import React, { Component } from 'react';
import Home from '../../components/Dashboard/Home';
import Navigation from '../../components/Dashboard/Shared/Navigation';
import Sidebar from '../../components/Dashboard/Shared/Sidebar';
import SubmitArticle from '../../components/Dashboard/Author/SubmitArticle';
import SubmissionDetail from '../../components/Dashboard/Author/SubmissionDetail';
import { Route, Switch } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <div className="hold-transition sidebar-mini layout-fixed">
                <Navigation />
                <main>
                    <Switch>
                        <Route path="/dashboard/new-submission" component={SubmitArticle} />
                        <Route path="/dashboard/submission-detail" component={SubmissionDetail} />
                        <Route exact path="/dashboard" component={Home} />
                    </Switch>
                    {this.props.children}
                </main>
                <Sidebar />
            </div>
        );
    }
}

export default Dashboard;