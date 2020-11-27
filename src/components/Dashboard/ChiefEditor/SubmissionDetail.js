import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import SubmissionLogs from '../Submission/SubmissionLogs';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getEditorAssignmentBySubmission } from '../../../store/actions/reviewActions';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import SubmissionFutherInfor from '../Submission/SubmissionInfor/SubmissionFutherInfor';
class SubmissionDetail extends Component {

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Thông tin chi tiết bài báo">
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
                            {this.props.submission ? (
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
                                    <div className="row pt-2">
                                        <div className="p-2 col-lg-8 border rounded">
                                            <SubmissionInfor submission={this.props.submission} />
                                        </div>
                                        <div className="p-2 col-lg-4 border rounded">
                                            {!this.props.editorAssignment ? (
                                                <div className="form-group">
                                                    <Link to={`/dashboard/chief-editor/assign-editor?submissionId=${this.props.submission._id}`}>
                                                        <button className="btn btn-outline-primary btn-block">
                                                            <i className="fas fa-user"></i> {" "}
                                                            Chỉ định biên tập viên
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
                                                    <i className="fas fa-times"></i>{" "}
                                                    Từ chối bài báo
                                                </button>
                                            </div>
                                            <SubmissionFutherInfor submission={this.props.submission} />
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
        reviewerAssignments: state.review.reviewerAssignments
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getEditorAssignmentBySubmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDetail);