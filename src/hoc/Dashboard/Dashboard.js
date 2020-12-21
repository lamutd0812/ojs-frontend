import React, { Component } from 'react';
import AuthorHome from '../../components/Dashboard/Author/Home';
import ReviewerHome from '../../components/Dashboard/Reviewer/Home';
import EditorHome from '../../components/Dashboard/Editor/Home';
import ChiefEditorHome from '../../components/Dashboard/ChiefEditor/Home';
import Navigation from '../../components/Dashboard/Shared/Navigation';
import Sidebar from '../../components/Dashboard/Shared/Sidebar';
import SubmitArticle from '../../components/Dashboard/Author/SubmitArticle';
import EditSubmission from '../../components/Dashboard/Author/EditSubmission';
import SubmissionDetail from '../../components/Dashboard/Submission/SubmissionDetail';
import SubmissionDetailEditor from '../../components/Dashboard/ChiefEditor/SubmissionDetail';
import AssignEditor from '../../components/Dashboard/ChiefEditor/AssignEditor';
import EditorAssignment from '../../components/Dashboard/Editor/EditorAssignment';
import AssignReviewer from '../../components/Dashboard/Editor/AssignReviewer';
import ReviewerAssignment from '../../components/Dashboard/Reviewer/ReviewerAssignment';
import ReviseSubmission from '../../components/Dashboard/Author/AuthorAssignment/ReviseSubmission';
import AcceptSubmission from '../../components/Dashboard/ChiefEditor/AcceptSubmission/AcceptSubmission';
import DeclineSubmission from '../../components/Dashboard/ChiefEditor/DeclineSubmission/DeclineSubmission';
import VastStats from '../../components/Dashboard/VAST/VastStats';
import Notifications from '../../components/Notifications/Notifications';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../utils/constant';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
    render() {
        let routes = null;
        switch (this.props.roleId) {
            case USER_ROLES.AUTHOR.roleId:
                routes = (
                    <Switch>
                        <Route path="/dashboard/notifications" component={Notifications} />
                        <Route path="/dashboard/new-submission" component={SubmitArticle} />
                        <Route path="/dashboard/submission/:submissionId" component={SubmissionDetail} />
                        <Route path="/dashboard/edit-submission/:submissionId" component={EditSubmission} />
                        <Route path="/dashboard/revise-submission/:submissionId" component={ReviseSubmission} />
                        <Route path="/dashboard/author" component={AuthorHome} />
                        <Route exact path="/dashboard" component={AuthorHome} />
                        <Redirect to="/dashboard" />
                    </Switch>
                );
                break;
            case USER_ROLES.REVIEWER.roleId:
                routes = (
                    <Switch>
                        <Route path="/dashboard/notifications" component={Notifications} />
                        <Route path="/dashboard/new-submission" component={SubmitArticle} />
                        <Route path="/dashboard/submission/:submissionId" component={SubmissionDetail} />
                        <Route path="/dashboard/edit-submission/:submissionId" component={EditSubmission} />
                        <Route path="/dashboard/reviewer/assignment/:submissionId" component={ReviewerAssignment} />
                        <Route path="/dashboard/reviewer" component={ReviewerHome} />
                        <Route path="/dashboard/author" component={AuthorHome} />
                        <Route exact path="/dashboard" component={AuthorHome} />
                        <Redirect to="/dashboard" />
                    </Switch>
                );
                break;
            case USER_ROLES.EDITOR.roleId:
                routes = (
                    <Switch>
                        <Route path="/dashboard/notifications" component={Notifications} />
                        <Route path="/dashboard/new-submission" component={SubmitArticle} />
                        <Route path="/dashboard/submission/:submissionId" component={SubmissionDetail} />
                        <Route path="/dashboard/edit-submission/:submissionId" component={EditSubmission} />
                        <Route path="/dashboard/editor/assign-reviewer" component={AssignReviewer} />
                        <Route path="/dashboard/editor/assignment/:submissionId" component={EditorAssignment} />
                        <Route path="/dashboard/editor" component={EditorHome} />
                        <Route path="/dashboard/author" component={AuthorHome} />
                        <Route exact path="/dashboard" component={AuthorHome} />
                        <Redirect to="/dashboard" />
                    </Switch>
                );
                break;
            case USER_ROLES.CHIEF_EDITOR.roleId:
                routes = (
                    <Switch>
                        <Route path="/dashboard/notifications" component={Notifications} />
                        <Route path="/dashboard/new-submission" component={SubmitArticle} />
                        <Route path="/dashboard/submission/:submissionId" component={SubmissionDetailEditor} />
                        <Route path="/dashboard/chief-editor/assign-editor" component={AssignEditor} />
                        <Route path="/dashboard/chief-editor/accept-submission/:submissionId" component={AcceptSubmission} />
                        <Route path="/dashboard/chief-editor/decline-submission/:submissionId" component={DeclineSubmission} />
                        <Route path="/dashboard/vast/statistics" component={VastStats} />
                        <Route path="/dashboard/chief-editor" component={ChiefEditorHome} />
                        <Route exact path="/dashboard" component={ChiefEditorHome} />
                    </Switch>
                );
                break;
            default: routes = null;
        }

        return (
            <div className="hold-transition sidebar-mini layout-fixed">
                <Navigation />
                <main>
                    {routes}
                    {this.props.children}
                </main>
                <Sidebar />
                <ToastContainer autoClose={2000} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        roleId: state.auth.role._id,
    };
};

export default connect(mapStateToProps, null)(Dashboard);