import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SubmissionInfor from './SubmissionInfor/SubmissionInfor';
import SubmissionLogs from './SubmissionLogs';
import DeleteSubmission from '../Author/DeleteSubmission';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import { USER_ROLES, STAGE } from '../../../utils/constant';
import { getFormattedDate, getStageBadgeClassname, updateObject } from '../../../utils/utility';
import { getSubmissionDetail, deleteSubmission, resetDeleteSubmissionState } from '../../../store/actions/submissionActions';
import { getEditorAssignmentBySubmission, getReviewerAssignmentsBySubmission } from '../../../store/actions/reviewActions';
class SubmissionDetail extends Component {

    state = {
        deletionConfirmed: false
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getReviewerAssignmentsBySubmission(this.props.match.params.submissionId);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isSubmissionDeleted) {
            this.props.resetDeleteSubmissionState();
            this.props.history.push('/dashboard');
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
        }
    }

    confirmDeleteHandler = (event) => {
        if (event.target.checked) {
            this.setState(updateObject(this.state, { deletionConfirmed: true }));
        } else {
            this.setState(updateObject(this.state, { deletionConfirmed: false }));
        }
    }

    deleteSubmissionHandler = (event) => {
        event.preventDefault();
        this.props.deleteSubmission(this.props.submission._id);
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
                                            <h6><i className="fas fa-users"></i> THÔNG TIN BAN BIÊN TẬP</h6>
                                            <div className="row ml-2">
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Tác giả (Author)</label>
                                                        <Link to="#">
                                                            <p className="text-primary ml-4">
                                                                <i className="fas fa-user text-dark"></i> {" "}
                                                                {this.props.submission.authorId.lastname} {this.props.submission.authorId.firstname}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Biên tập viên (Editor)</label>
                                                        {this.props.editorAssignment ? (
                                                            <Link to="#">
                                                                <p className="text-primary ml-4">
                                                                    <i className="fas fa-user text-dark"></i> {" "}
                                                                    {this.props.editorAssignment.editorId.lastname} {this.props.editorAssignment.editorId.firstname}
                                                                </p>
                                                            </Link>
                                                        ) : <div className="ml-4 text-secondary">Chưa được chỉ định</div>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Thẩm định viên ({this.props.reviewerAssignments.length}/3)</label>
                                                        {this.props.reviewerAssignments.length > 0 ? (
                                                            <div className="ml-4">
                                                                {this.props.reviewerAssignments.map(ra => (
                                                                    <Link to="#" key={ra._id}>
                                                                        <div className="text-primary"><i className="fas fa-user text-dark"></i> {" "}
                                                                            {ra.reviewerId.lastname} {ra.reviewerId.firstname}
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                                <div className="ml-4 text-secondary">
                                                                    <div>Chưa được chỉ định</div>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Row */}
                                    <div className="row pt-2">
                                        <div className="p-2 col-lg-8 border rounded">
                                            <SubmissionInfor submission={this.props.submission} />
                                        </div>
                                        <div className="p-2 col-lg-4 border rounded">
                                            {this.props.roleId === USER_ROLES.CHIEF_EDITOR.roleId ? (
                                                <Aux>
                                                    {!this.props.editorAssignment ? (
                                                        <div className="form-group">
                                                            <Link to={`/dashboard/chief-editor/assign-editor?submissionId=${this.props.submission._id}`}>
                                                                <button className="btn btn-outline-primary btn-block">
                                                                    <i class="fas fa-user"></i> {" "}
                                                                    Chỉ định biên tập viên
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                    <div className="form-group">
                                                        <button className="btn btn-outline-success btn-block">
                                                            <i class="fas fa-check"></i> {" "}
                                                            Chấp nhận bài báo
                                                        </button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-outline-danger btn-block">
                                                            <i class="fas fa-times"></i>{" "}
                                                            Từ chối bài báo
                                                        </button>
                                                    </div>
                                                </Aux>
                                            ) : null}
                                            <div className="form-group mt-4">
                                                <label>Ngày đăng:</label>
                                                <p className="ml-4">
                                                    {getFormattedDate(this.props.submission.createdAt)}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label>Cập nhật lần cuối:</label>
                                                <p className="ml-4">
                                                    {getFormattedDate(this.props.submission.updatedAt)}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label>Nhật ký hoạt động</label><br />
                                                <Link to="#" className="ml-3 text-primary" data-toggle="modal" data-target="#submissionLogsModal"><u>Xem chi tiết</u></Link>
                                            </div>
                                            <div className="form-group">
                                                <label>Pha</label><br />
                                                <div className={"badge " + getStageBadgeClassname(this.props.submission.submissionStatus.stageId.value) + " ml-3"}>
                                                    {this.props.submission.submissionStatus.stageId.name}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Trạng thái</label><br />
                                                <p className="ml-3">
                                                    {this.props.submission.submissionStatus.status}
                                                </p>
                                            </div>

                                            {this.props.userId === this.props.submission.authorId._id ? (
                                                <div className="form-group">
                                                    <label>Chỉnh sửa</label><br />
                                                    {this.props.submission.submissionStatus.stageId.value === STAGE.SUBMISSION.value ? (
                                                        <Aux>
                                                            <Link to={`/dashboard/edit-submission/${this.props.submission._id}`} className="btn btn-outline-secondary btn-sm mr-1">
                                                                <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                                                            </Link>
                                                            <button className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deleteSubmissionModal">
                                                                <i className="fas fa-trash"></i> Xóa bài báo
                                                            </button>
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                <button className="btn btn-outline-secondary btn-sm mr-1 disabled">
                                                                    <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                                                                </button>
                                                                <button className="btn btn-outline-danger btn-sm disabled">
                                                                    <i className="fas fa-trash"></i> Xóa bài báo
                                                                </button>
                                                            </Aux>
                                                        )}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : <Spinner />}
                </section>
                {this.props.submission && <SubmissionLogs logs={this.props.submission.submissionLogs} />}
                <DeleteSubmission
                    confirmDelete={this.confirmDeleteHandler}
                    deletionConfirmed={this.state.deletionConfirmed}
                    deleteSubmission={this.deleteSubmissionHandler} />
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
    getReviewerAssignmentsBySubmission,
    deleteSubmission,
    resetDeleteSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDetail);