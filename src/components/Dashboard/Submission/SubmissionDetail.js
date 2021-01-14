import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SubmissionInfor from './SubmissionInfor/SubmissionInfor';
import SubmissionLogs from './SubmissionLogs';
import DeleteSubmission from '../Author/DeleteSubmission';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import { checkDueDate, getDoughnutData, updateObject } from '../../../utils/utility';
import { getMyNotifications } from '../../../store/actions/authActions';
import {
    getSubmissionDetail,
    deleteSubmission,
    resetDeleteSubmissionState
} from '../../../store/actions/submissionActions';
import {
    getEditorAssignmentBySubmission,
    getAuthorAssignmentBySubmission,
    getChiefEditorSubmission
} from '../../../store/actions/reviewActions';
import { toast } from 'react-toastify';
import EditorialBoard from './SubmissionInfor/EditorialBoard';
import SubmissionFutherInfor from './SubmissionInfor/SubmissionFutherInfor';
import SubmissionActions from './SubmissionActions/SubmissionActions';
import AssignmentInfor from '../Author/AuthorAssignment/AssignmentInfor';
import RevisionDetail from '../Author/AuthorAssignment/RevisionDetail/RevisionDetail';
import SubmissionProcess from './SubmissionProcess/SubmissionProcess';
import { SUBMISSION_TYPES } from '../../../utils/constant';
import ReviewProcessInfor from '../ReviewProcess/ReviewProcessInfor';
class SubmissionDetail extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        deletionConfirmed: false
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.submissionId !== prevProps.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isSubmissionDeleted) {
            this.props.resetDeleteSubmissionState();
            setTimeout(() => {
                toast.success("Xóa bài báo khỏi hệ thống thành công!");
                this.props.history.push('/dashboard');
            }, 500)
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
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
            step1Active: true, step2Active: false, step3Active: false
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false, step2Active: true, step3Active: false
        });
        this.setState(newState);
    }

    step3ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false, step2Active: false, step3Active: true
        });
        this.setState(newState);
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
                        <li className="breadcrumb-item active">Thông tin chi tiết bài báo</li>
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
                                    {this.props.submission && this.props.submission.typeId.name === SUBMISSION_TYPES.PEER_REVIEW_RESEARCH.name && (
                                        <li className="nav-item">
                                            <div className={this.state.step3Active ? 'nav-link active' : 'nav-link'}
                                                onClick={this.step3ActiveHandler}>
                                                {this.props.authorAssignment ? (
                                                    <div className={this.state.step3Active ? 'text-custom' : 'text-secondary'}><b>Yêu cầu chỉnh sửa (1)</b></div>
                                                ) : (
                                                        <div className={this.state.step3Active ? 'text-custom' : 'text-secondary'}><b>Yêu cầu chỉnh sửa (0)</b></div>
                                                    )}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {this.props.submission ? (
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        {/* ------------------Tab 1----------------- */}
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* Row */}
                                            <div className="row pt-2 border rounded">
                                                <div className="p-2 col-lg-12">
                                                    {this.props.editorAssignment ? (
                                                        <EditorialBoard
                                                            submission={this.props.submission}
                                                            editorAssignment={this.props.editorAssignment}
                                                            reviewerAssignments={this.props.editorAssignment.reviewerAssignmentId} />
                                                    ) : (
                                                            <EditorialBoard submission={this.props.submission} />
                                                        )}
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row pt-2">
                                                <div className="p-2 col-lg-8 border rounded">
                                                    {this.props.authorAssignment ? (
                                                        <SubmissionInfor
                                                            submission={this.props.submission}
                                                            hasAuthorRevision={this.props.authorAssignment.authorRevisionId ? true : false} />
                                                    ) : (
                                                            <SubmissionInfor submission={this.props.submission} />
                                                        )}
                                                </div>
                                                <div className="p-2 col-lg-4 border rounded">
                                                    <SubmissionFutherInfor submission={this.props.submission} />
                                                    <SubmissionActions
                                                        userId={this.props.userId}
                                                        submission={this.props.submission}
                                                        authorAssignment={this.props.authorAssignment} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* ------------------Tab 2----------------- */}
                                        <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                            <ReviewProcessInfor
                                                submission={this.props.submission}
                                                editorAssignment={this.props.editorAssignment}
                                                chiefEditorSubmission={this.props.chiefEditorSubmission}
                                                fetchDoughnutData={this.fetchDoughnutData} />
                                        </div>
                                        {/* ------------------Tab 3----------------- */}
                                        <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {this.props.editorAssignment && this.props.authorAssignment ? (
                                                <Aux>
                                                    {/* Row */}
                                                    <div className="row mt-2">
                                                        {/* Column */}
                                                        <div className="p-2 col-lg-8 border rounded">
                                                            {!checkDueDate(this.props.authorAssignment.dueDate) ? (
                                                                <div className="form-group ml-1 text-danger font-weight-bold">
                                                                    <i className="fas fa-times-circle"></i> Yêu cầu chỉnh sửa bài báo đã hết hạn!
                                                                </div>
                                                            ) : null}
                                                            <h6><i className="fas fa-info-circle"></i> THÔNG TIN BẢN CHỈNH SỬA BÀI BÁO</h6>
                                                            {this.props.authorAssignment.authorRevisionId ? (
                                                                <RevisionDetail
                                                                    authorRevision={this.props.authorAssignment.authorRevisionId}
                                                                    step1Active={this.step1ActiveHandler} />
                                                            ) : (
                                                                    <div className="form-group ml-3">
                                                                        <div>Bạn chưa nộp bản chỉnh sửa bài báo.</div>
                                                                    </div>
                                                                )}
                                                        </div>
                                                        {/* Column */}
                                                        <div className="p-2 col-lg-4 border rounded">
                                                            <h6><i className="fas fa-stream"></i> TRẠNG THÁI</h6>
                                                            {!this.props.authorAssignment.authorRevisionId ? (
                                                                <Aux>
                                                                    <div className="form-group text-center">
                                                                        <div className="badge-ol badge-ol-danger badge-outlined p-2 pr-4 pl-4" style={{ fontSize: '16px' }}>
                                                                            <i className="fas fa-close"></i> Chưa nộp bản chỉnh sửa bài báo
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        {checkDueDate(this.props.authorAssignment.dueDate) ? (
                                                                            <Aux>
                                                                                <Link to={`/dashboard/revise-submission/${this.props.submission._id}`}>
                                                                                    <div className="btn btn-outline-primary btn-block btn-flat">
                                                                                        <i className="fas fa-edit"></i> Nộp bản chỉnh sửa bài báo
                                                                                    </div>
                                                                                </Link>
                                                                            </Aux>
                                                                        ) : (
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-outline-primary btn-block btn-flat"
                                                                                    onClick={() => toast.error('Đã hết thời hạn nộp bản chỉnh sửa bài báo!')}>
                                                                                    <i className="fas fa-edit"></i> Nộp bản chỉnh sửa bài báo
                                                                                </button>
                                                                            )}
                                                                    </div>
                                                                </Aux>
                                                            ) : (
                                                                    <Aux>
                                                                        <div className="form-group text-center">
                                                                            <div className="badge-ol badge-ol-success badge-outlined p-2 pr-4 pl-4" style={{ fontSize: '16px' }}>
                                                                                <i className="fas fa-check"></i> Đã nộp bản chỉnh sửa bài báo
                                                                        </div>
                                                                        </div>
                                                                    </Aux>
                                                                )}

                                                            <AssignmentInfor
                                                                submission={this.props.submission}
                                                                authorAssignment={this.props.authorAssignment} />
                                                            <SubmissionProcess
                                                                submission={this.props.submission} />
                                                        </div>
                                                    </div>
                                                </Aux>
                                            ) : (
                                                    <div>Chưa có yêu cầu chỉnh sửa bài báo từ biên tập viên.</div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : <Spinner />}
                </section>
                { this.props.submission && <SubmissionLogs logs={this.props.submission.submissionLogs} />}
                <DeleteSubmission
                    confirmDelete={this.confirmDeleteHandler}
                    deletionConfirmed={this.state.deletionConfirmed}
                    deleteSubmission={this.deleteSubmissionHandler} />
            </div >
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
        authorAssignment: state.review.authorAssignment,
        chiefEditorSubmission: state.review.chiefEditorSubmission
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    deleteSubmission,
    resetDeleteSubmissionState,
    getEditorAssignmentBySubmission,
    getAuthorAssignmentBySubmission,
    getChiefEditorSubmission,
    getMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDetail);