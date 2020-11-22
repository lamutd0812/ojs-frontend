import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SubmissionLogs from '../Submission/SubmissionLogs';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getEditorAssignmentBySubmission, getReviewerAssignmentsBySubmission } from '../../../store/actions/reviewActions';
import { Doughnut } from 'react-chartjs-2';
import AssignmentInfor from './AssigmentInfor/AssignmentInfor';
import { checkDueDate, getDoughnutData } from '../../../utils/utility';
import ReviewerSubmissions from './ReviewerSubmissions/ReviewerSubmissions';

class EditorAssignment extends Component {

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getReviewerAssignmentsBySubmission(this.props.match.params.submissionId);
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
        return data;
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
                        <div className="card card-primary card-outline">
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
                                    <div className="row border rounded mt-2" style={{ minHeight: '200px' }}>
                                        {/* Column */}
                                        <div className="p-2 col-lg-8">
                                            <ReviewerSubmissions reviewerAssignments={this.props.reviewerAssignments} />
                                        </div>
                                        {/* Column */}
                                        {this.props.reviewerAssignments.length > 0 ? (
                                            <div className="p-2 col-lg-4">
                                                <Doughnut
                                                    data={this.fetchDoughnutData(this.props.reviewerAssignments)}
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
                                            {checkDueDate(this.props.editorAssignment.dueDate) ? (
                                                <Aux>
                                                    {this.props.reviewerAssignments.length < 3 ? (
                                                        <Aux>
                                                            <div className="form-group">
                                                                <h6><i className="fas fa-user"></i> CHỈ ĐỊNH THẨM ĐỊNH VIÊN</h6>
                                                            </div>
                                                            <div className="form-group">
                                                                <Link to={`/dashboard/editor/assign-reviewer?submissionId=${this.props.submission._id}`}>
                                                                    <button className="btn btn-outline-primary btn-block">
                                                                        <i className="fas fa-user"></i>{" "}
                                                                        Chỉ định thẩm định viên
                                                                </button>
                                                                </Link>
                                                            </div>
                                                        </Aux>
                                                    ) : null}
                                                    <div className="form-group">
                                                        <h6><i className="fas fa-comments"></i> Ý KIẾN THẨM ĐỊNH CỦA BẠN</h6>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-outline-primary btn-block">
                                                            <i className="fas fa-paper-plane"></i> {" "}
                                                            Gửi ý kiến cho tổng biên tập
                                                        </button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-outline-danger btn-block">
                                                            <i className="fas fa-edit"></i> {" "}
                                                            Yêu cầu tác giả chỉnh sửa
                                                        </button>
                                                    </div>
                                                </Aux>
                                            ) : (
                                                    <Aux>
                                                        <div className="form-group">
                                                            <h6><i className="fas fa-comments"></i> Ý KIẾN THẨM ĐỊNH CỦA BẠN</h6>
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="btn btn-danger btn-block">
                                                                <i className="fas fa-ban"></i> {" "}
                                                            Bài báo đã hết hạn xử lý
                                                        </button>
                                                        </div>
                                                    </Aux>
                                                )}

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