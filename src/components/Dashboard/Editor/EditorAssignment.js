import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubmissionLogs from '../Submission/SubmissionLogs';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getEditorAssignmentBySubmission, getReviewerAssignmentsBySubmission } from '../../../store/actions/reviewActions';
import { Doughnut } from 'react-chartjs-2';
import AssignmentInfor from './AssigmentInfor/AssignmentInfor';
import { getDoughnutData, updateObject } from '../../../utils/utility';
import ReviewerSubmissions from './ReviewerSubmissions/ReviewerSubmissions';

class EditorAssignment extends Component {

    state = {
        data: {
            labels: ['Chấp nhận bài báo', 'Yêu cầu chỉnh sửa', 'Chưa nộp ý kiến'],
            datasets: [
                {
                    data: [0, 0, 3],
                    backgroundColor: [
                        '#28a745',
                        '#dc3545',
                        '#17a2b8'
                    ]
                },
            ],
        }
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getReviewerAssignmentsBySubmission(this.props.match.params.submissionId);
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.reviewerAssignments.length > 0 && this.props.reviewerAssignments.length !== prevProps.reviewerAssignments.length) {
            this.fetchDoughnutData(this.props.reviewerAssignments);
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getReviewerAssignmentsBySubmission(this.props.match.params.submissionId);
        }
    }

    fetchDoughnutData = (reviewerAssignments) => {
        const data = getDoughnutData(reviewerAssignments);
        this.setState(updateObject(this.state, {
            data: data
        }));
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Xử lý yêu cầu thẩm định">
                        <li className="breadcrumb-item active">Submission Detail</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                {this.props.submission ? <h3 className="card-title">{this.props.submission.title}</h3> : null}
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>

                            {this.props.submission && this.props.editorAssignment && this.props.reviewerAssignments ? (
                                <div className="card-body">
                                    {/* Row */}
                                    <div className="row">
                                        <div className="p-2 col-lg-12 border rounded">
                                            <EditorialBoard
                                                submission={this.props.submission}
                                                editorAssignment={this.props.editorAssignment}
                                                reviewerAssignments={this.props.reviewerAssignments} />
                                        </div>
                                    </div>
                                    {/* Row */}
                                    <div className="row border rounded mt-2">
                                        {/* Column */}
                                        <div className="p-2 col-lg-8">
                                            <ReviewerSubmissions reviewerAssignments={this.props.reviewerAssignments} />
                                        </div>
                                        {/* Column */}
                                        {this.props.reviewerAssignments.length > 0 ? (
                                            <div className="p-2 col-lg-4">
                                                <Doughnut
                                                    data={this.state.data}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: true,
                                                        legend: {
                                                            labels: {
                                                                fontFamily: 'Roboto Slab'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                    {/* Row */}
                                    <div className="row pt-2">
                                        {/* Column */}
                                        <div className="p-2 col-lg-8 border rounded">
                                            <SubmissionInfor
                                                submission={this.props.submission} />
                                        </div>
                                        {/* Column */}
                                        <div className="p-2 col-lg-4 border rounded">
                                            <div className="form-group">
                                                <h6><i className="fas fa-paper-plane"></i> GỬI QUYẾT ĐỊNH</h6>
                                            </div>
                                            {this.props.reviewerAssignments.length < 3 ? (
                                                <div className="form-group">
                                                    <Link to={`/dashboard/editor/assign-reviewer?submissionId=${this.props.submission._id}`}>
                                                        <button className="btn btn-outline-primary btn-block">
                                                            <i className="fas fa-user"></i>{" "}
                                                                Chỉ định thẩm định viên
                                                        </button>
                                                    </Link>
                                                </div>
                                            ) : null}
                                            <div className="form-group">
                                                <button className="btn btn-outline-success btn-block">
                                                    <i className="fas fa-check"></i> {" "}
                                                    Chấp nhận bài báo
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-outline-danger btn-block">
                                                    <i className="fas fa-edit"></i> {" "}
                                                    Yêu cầu chỉnh sửa
                                                </button>
                                            </div>

                                            <AssignmentInfor
                                                submission={this.props.submission}
                                                editorAssignment={this.props.editorAssignment} />
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
        token: state.auth.token,
        submission: state.submission.submission,
        loading: state.submission.loading,
        editorAssignment: state.review.editorAssignment,
        reviewerAssignments: state.review.reviewerAssignments
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getEditorAssignmentBySubmission,
    getReviewerAssignmentsBySubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorAssignment);