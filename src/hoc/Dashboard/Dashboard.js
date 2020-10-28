import React, { Component } from 'react';
import AuthorHome from '../../components/Dashboard/Author/Home';
import ChiefEditorHome from '../../components/Dashboard/ChiefEditor/Home';
import Navigation from '../../components/Dashboard/Shared/Navigation';
import Sidebar from '../../components/Dashboard/Shared/Sidebar';
import SubmitArticle from '../../components/Dashboard/Author/SubmitArticle';
import SubmissionDetail from '../../components/Dashboard/Author/SubmissionDetail';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../utils/constant';

class Dashboard extends Component {
    render() {

        let routes = (
            <Switch>
                <Route path="/dashboard/new-submission" component={SubmitArticle} />
                <Route path="/dashboard/submission/:submissionId" component={SubmissionDetail} />
                <Route exact path="/dashboard" component={AuthorHome} />
            </Switch>
        );

        if (this.props.permissionLevel === USER_ROLES.CHIEF_EDITOR.permissionLevel) {
            routes = (
                <Switch>
                    <Route path="/dashboard/new-submission" component={SubmitArticle} />
                    <Route path="/dashboard/submission/:submissionId" component={SubmissionDetail} />
                    <Route exact path="/dashboard" component={ChiefEditorHome} />
                </Switch>
            );
        }

        return (
            <div className="hold-transition sidebar-mini layout-fixed">
                <Navigation />
                <main>
                    {routes}
                    {this.props.children}
                </main>
                <Sidebar />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissionLevel: state.auth.role.permissionLevel
    };
};

export default connect(mapStateToProps, null)(Dashboard);