import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import SubmissionLogs from '../Submission/SubmissionLogs';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import { getMyNotifications } from '../../../store/actions/authActions';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getEditorAssignmentBySubmission, getChiefEditorSubmission } from '../../../store/actions/reviewActions';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import SubmissionFutherInfor from '../Submission/SubmissionInfor/SubmissionFutherInfor';
import { getDecisionBadgeClassname, getDoughnutData, updateObject } from '../../../utils/utility';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ReviewerSubmissions from '../Editor/ReviewerSubmissions/ReviewerSubmissions';
import { Doughnut } from 'react-chartjs-2';
import EditorSubmissionDetail from './EditorialBoardSubmissions/EditorSubmissionDetail';
import CESubmissionDetail from './EditorialBoardSubmissions/CESubmisisonDetail';
class SubmissionDetail extends Component {

    state = {
        step1Active: true,
        step2Active: false,
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.submissionId !== prevProps.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
            this.props.getMyNotifications();
        }
    }

    fetchDoughnutData = (reviewerAssignments) => {
        const data = getDoughnutData(reviewerAssignments);
        return data;
    }

    step1ActiveHandler = (event) => {
        event.preventDefault();
        let newState = updateObject(this.state, {
            step1Active: true,
            step2Active: false,
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
        });
        this.setState(newState);
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Thông tin chi tiết bào báo">
                        <li className="breadcrumb-item active">Thông tin chi tiết bào báo</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                {this.props.submission ? <h3 className="card-title">{this.props.submission.title}</h3> : null}
                                <div className="float-right">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-header p-0">
                                <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li className="nav-item">
                                        <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step1ActiveHandler}>
                                            <div className={this.state.step1Active ? 'text-custom' : 'text-secondary'}><b>Thông tin bài báo</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step2ActiveHandler}>
                                            <div className={this.state.step2Active ? 'text-custom' : 'text-secondary'}><b>Thông tin thẩm định</b></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {this.props.submission ? (
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        {/* ------------------Tab 1----------------- */}
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* Row */}
                                            <div className="row">
                                                <div className="p-2 col-lg-12 border rounded">
                                                    {this.props.editorAssignment ? (
                                                        <EditorialBoard
                                                            submission={this.props.submission}
                                                            editorAssignment={this.props.editorAssignment}
                                                            reviewerAssignments={this.props.editorAssignment.reviewerAssignmentId} />
                                                    ) : (
                                                            <EditorialBoard
                                                                submission={this.props.submission}
                                                                editorAssignment={this.props.editorAssignment} />
                                                        )}
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row pt-2">
                                                <div className="p-2 col-lg-8 border rounded">
                                                    <SubmissionInfor submission={this.props.submission} />
                                                </div>
                                                <div className="p-2 col-lg-4 border rounded">
                                                    <h6><i className="fas fa-user"></i> Chỉ định biên tập viên</h6>
                                                    {!this.props.editorAssignment ? (
                                                        <div className="form-group">
                                                            <Link to={`/dashboard/chief-editor/assign-editor?submissionId=${this.props.submission._id}`}>
                                                                <button className="btn btn-outline-dark btn-block">
                                                                    <i className="fas fa-user"></i> {" "}
                                                                    Chỉ định biên tập viên
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                    <h6><i className="fas fa-gavel"></i> QUYẾT ĐỊNH XUẤT BẢN</h6>
                                                    {this.props.chiefEditorSubmission ? (
                                                        <div className="form-group ml-3">
                                                            <span className={getDecisionBadgeClassname(this.props.chiefEditorSubmission.chiefEditorDecisionId.value)}>
                                                                <i className="fas fa-check"></i> {" "}
                                                                {this.props.chiefEditorSubmission.chiefEditorDecisionId.decisionName}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                            <Aux>
                                                                <div className="form-group">
                                                                    <Link to={`/dashboard/chief-editor/accept-submission/${this.props.submission._id}`}>
                                                                        <button className="btn btn-outline-primary btn-block">
                                                                            <i className="fas fa-check"></i> {" "}
                                                                        Chấp nhận xuất bản
                                                                    </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="form-group">
                                                                    <Link to={`/dashboard/chief-editor/decline-submission/${this.props.submission._id}`}>
                                                                        <button className="btn btn-outline-danger btn-block">
                                                                            <i className="fas fa-times"></i>{" "}
                                                                        Từ chối bài báo
                                                                    </button>
                                                                    </Link>
                                                                </div>
                                                            </Aux>
                                                        )}
                                                    <SubmissionFutherInfor submission={this.props.submission} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* ------------------Tab 2----------------- */}
                                        <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {this.props.editorAssignment ? (
                                                // Row
                                                <div className="row border rounded mt-2" style={this.props.editorAssignment.reviewerAssignmentId.length > 0 ? { minHeight: '200px' } : null}>
                                                    {/* Column */}
                                                    <div className="p-2 col-lg-8">
                                                        <ReviewerSubmissions reviewerAssignments={this.props.editorAssignment.reviewerAssignmentId} />
                                                    </div>
                                                    {/* Column */}
                                                    {this.props.editorAssignment.reviewerAssignmentId.length > 0 && (
                                                        <div className="p-2 col-lg-4">
                                                            <Doughnut
                                                                data={this.fetchDoughnutData(this.props.editorAssignment.reviewerAssignmentId)}
                                                                options={{
                                                                    responsive: true,
                                                                    maintainAspectRatio: false,
                                                                    legend: {
                                                                        labels: {
                                                                            fontSize: 12,
                                                                            fontFamily: 'Roboto Slab'
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                    <div className="row border rounded mt-2">
                                                        <div className="p-2 col-lg-8">
                                                            <h6><i className="fas fa-comments"></i> Ý KIẾN CỦA THẨM ĐỊNH VIÊN</h6>
                                                            <div>Chưa có thông tin thẩm định của thẩm định viên.</div>
                                                        </div>
                                                    </div>
                                                )}
                                            {/* Row */}
                                            <div className="row border rounded mt-2">
                                                <div className="p-2 col-lg-10">
                                                    <h6><i className="fas fa-comment"></i> Ý KIẾN CỦA BIÊN TẬP VIÊN</h6>
                                                    {this.props.editorAssignment && this.props.editorAssignment.editorSubmissionId ? (
                                                        <EditorSubmissionDetail
                                                            editorAssignment={this.props.editorAssignment}
                                                            editorSubmission={this.props.editorAssignment.editorSubmissionId} />
                                                    ) : (
                                                            <div>Chưa có thông tin thẩm định của biên tập viên.</div>
                                                        )}
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row border rounded mt-2">
                                                <div className="p-2 col-lg-10">
                                                    <h6><i className="fas fa-gavel"></i> QUYẾT ĐỊNH CỦA TỔNG BIÊN TẬP</h6>
                                                    {this.props.chiefEditorSubmission ? (
                                                        <CESubmissionDetail chiefEditorSubmission={this.props.chiefEditorSubmission} />
                                                    ) : (
                                                            <div>Tổng biên tập chưa đưa ra quyết định.</div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : <Spinner />}
                </section>
                {this.props.submission && <SubmissionLogs logs={this.props.submission.submissionLogs} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        roleId: state.auth.role._id,
        submission: state.submission.submission,
        loading: state.submission.loading,
        isSubmissionDeleted: state.submission.isSubmissionDeleted,
        editors: state.review.editors,
        editorAssignment: state.review.editorAssignment,
        reviewers: state.review.reviewers,
        chiefEditorSubmission: state.review.chiefEditorSubmission
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getEditorAssignmentBySubmission,
    getChiefEditorSubmission,
    getMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDetail);