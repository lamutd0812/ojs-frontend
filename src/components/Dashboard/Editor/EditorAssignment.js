import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SubmissionLogs from '../Submission/SubmissionLogs';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import EditorSubmissionDetail from './EditorSubmission/EditorSubmisisonDetail';
import CreateEditorSubmission from './EditorSubmission/CreateEditorSubmisison';
import EditEditorSubmission from './EditorSubmission/EditEditorSubmission';
import { getSubmissionDetail, getEditorDecisions } from '../../../store/actions/submissionActions';
import {
    getEditorAssignmentBySubmission,
    createEditorSubmission,
    resetCreateEditorSubmissionState,
    editEditorSubmission,
    resetEditEditorSubmissionState,
    requestAuthorRevision,
    resetRequestAuthorRevisionState,
    getAuthorAssignmentBySubmission
} from '../../../store/actions/reviewActions';
import { Doughnut } from 'react-chartjs-2';
import AssignmentInfor from './AssigmentInfor/AssignmentInfor';
import { checkDueDate, getDeadlineDate, getDoughnutData, updateObject } from '../../../utils/utility';
import ReviewerSubmissions from './ReviewerSubmissions/ReviewerSubmissions';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';
import { createReviewInputControls, editReviewInputControls } from '../../../utils/input-controls';
import { createReviewInputChangeHandler, editReviewInnputChangeHandler } from '../../../utils/input-change';
import RequestRevision from './RequestAuthorRevision/RequestRevision';
import AuthorAssignment from './RequestAuthorRevision/AuthorAssignment';
import SubmissionProcess from '../Submission/SubmissionProcess/SubmissionProcess';
class EditorAssignment extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        controls: createReviewInputControls,
        controls_edit: editReviewInputControls,
        formIsValid: false,
        formIsValid_edit: true,
        canEdit: false,
        // request author revision
        canRequestAuthorRevision: false,
        dueDate: getDeadlineDate(7),
        messageToAuthor: 'Nội dung lời nhắn',
        emailToAuthor: 'Nội dung email',
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getEditorDecisions();
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
        }
    }

    componentDidUpdate() {
        if (this.props.isEditorSubmissionEdited) {
            window.scrollTo(0, 0);
            this.props.resetEditEditorSubmissionState();
            this.setState(updateObject(this.state, { canEdit: false }));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetCreateEditorSubmissionState();
            this.props.resetEditEditorSubmissionState();
            this.props.resetRequestAuthorRevisionState();
        }
        if (nextProps.isEditorSubmissionCreated && !nextProps.error) {
            this.props.resetCreateEditorSubmissionState();
            toast.success("Gửi ý kiến thẩm định thành công!");
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
        }
        if (nextProps.isEditorSubmissionEdited && !nextProps.error) {
            this.props.resetEditEditorSubmissionState();
            toast.success("Chỉnh sửa ý kiến thẩm định thành công!");
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
        }
        if (nextProps.isRequestAuthorRevisionCreated && !nextProps.error) {
            this.props.resetRequestAuthorRevisionState();
            toast.success("Yêu cầu tác giả chỉnh sửa bài báo thành công!");
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getEditorDecisions();
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
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
            step3Active: false,
            canRequestAuthorRevision: false
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
            step3Active: false,
            canRequestAuthorRevision: false
        });
        this.setState(newState);
    }

    step3ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: false,
            step3Active: true,
            canRequestAuthorRevision: true
        });
        this.setState(newState);
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        const { updatedControls, formIsValid } = createReviewInputChangeHandler(event, this.state);
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    inputChangeHandler_edit = (event) => {
        event.preventDefault();
        const { updatedControls, formIsValid } = editReviewInnputChangeHandler(event, this.state);
        this.setState({
            controls_edit: updatedControls,
            formIsValid: formIsValid
        });
    };

    // Edit Review
    openEditReviewPageHandler = (event, editorSubmission) => {
        event.preventDefault();
        // Init Control Edit Values
        const updatedControls = updateObject(this.state.controls_edit, {
            decisionId: updateObject(this.state.controls_edit.decisionId, {
                value: editorSubmission.editorDecisionId._id,
                decisionName: editorSubmission.editorDecisionId.decisionName
            }),
            content: updateObject(this.state.controls_edit.content, { value: editorSubmission.content }),
            attachment: updateObject(this.state.controls_edit.attachment, { filename: 'nhanxet.pdf' })
        });
        this.setState(updateObject(this.state, {
            canEdit: true,
            controls_edit: updatedControls
        }));
    }

    blockEditReviewPageHandler = () => {
        this.setState(updateObject(this.state, {
            canEdit: false
        }));
    }

    confirmSubmitHandler = () => {
        const submissionId = this.props.submission._id;
        if (this.state.canRequestAuthorRevision) {
            if (this.props.editorAssignment.editorSubmissionId) {
                toast.error('Bạn đã nộp quyết định cho tổng biên tập trước đó!');
            } else {
                // request author revision
                const reqBody = {
                    dueDate: this.state.dueDate,
                    message: this.state.messageToAuthor
                }
                this.props.requestAuthorRevision(submissionId, reqBody);
            }
        }
        else if (!this.state.canEdit) {
            if (this.props.authorAssignment && !this.props.authorAssignment.authorRevisionId) {
                toast.error('Tác giả chưa nộp bản chỉnh sửa bài báo!');
            } else {
                // create editor submission
                const reqBody = {
                    content: this.state.controls.content.value,
                    editorDecisionId: this.state.controls.decisionId.value
                }
                this.props.createEditorSubmission(submissionId, reqBody);
            }
        }
        else {
            // edit editor submission
            const reqBody = {
                content: this.state.controls_edit.content.value,
                editorDecisionId: this.state.controls_edit.decisionId.value
            }
            this.props.editEditorSubmission(submissionId, reqBody);
        }
    }

    // Tab3: Request Author Revision
    setDueDateHandler = (date) => {
        this.setState(updateObject(this.state, { dueDate: date }));
    }

    setMessageToAuthorHandler = (event) => {
        event.preventDefault();
        this.setState(updateObject(this.state, { messageToReviewer: event.target.value }));
    }

    setEmailToAuthorHandler = (event) => {
        event.preventDefault();
        this.setState(updateObject(this.state, { emailToReviewer: event.target.value }));
    }

    render() {
        const contentWrapper = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Xử lý yêu cầu thẩm định">
                        <li className="breadcrumb-item active">Submission Detail</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card card-primary card-outline card-tabs">
                            <div className="card-header">
                                {this.props.submission ? <h3 className="card-title">{this.props.submission.title}</h3> : null}
                                <div className="float-right mr-5">
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
                                            <div className={this.state.step1Active ? 'text-orange' : 'text-secondary'}><b>Chi tiết yêu cầu</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step2ActiveHandler}>
                                            <div className={this.state.step2Active ? 'text-orange' : 'text-secondary'}><b>Nộp ý kiến thẩm định</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step3ActiveHandler}>
                                            <div className={this.state.step3Active ? 'text-orange' : 'text-secondary'}><b>Yêu cầu tác giả chỉnh sửa</b></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {this.props.submission && this.props.editorAssignment ? (
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        {/* ------------------Tab 1----------------- */}
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* Row */}
                                            <div className="row">
                                                <div className="p-2 col-lg-12 border rounded">
                                                    <EditorialBoard
                                                        submission={this.props.submission}
                                                        editorAssignment={this.props.editorAssignment}
                                                        reviewerAssignments={this.props.editorAssignment.reviewerAssignmentId} />
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row border rounded mt-2" style={{ minHeight: '200px' }}>
                                                {/* Column */}
                                                <div className="p-2 col-lg-8">
                                                    <ReviewerSubmissions reviewerAssignments={this.props.editorAssignment.reviewerAssignmentId} />
                                                </div>
                                                {/* Column */}
                                                {this.props.editorAssignment.reviewerAssignmentId.length > 0 ? (
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
                                                            {this.props.editorAssignment.reviewerAssignmentId.length < 3 ? (
                                                                <Aux>
                                                                    <div className="form-group">
                                                                        <h6><i className="fas fa-user"></i> CHỈ ĐỊNH THẨM ĐỊNH VIÊN</h6>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <Link to={`/dashboard/editor/assign-reviewer?submissionId=${this.props.submission._id}`}>
                                                                            <button className="btn btn-outline-primary btn-block">
                                                                                <i className="fas fa-user"></i>{" "}Chỉ định thẩm định viên
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                </Aux>
                                                            ) : null}
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
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
                                                    <SubmissionProcess
                                                        submission={this.props.submission} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* ------------------Tab 2----------------- */}
                                        <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* Row */}
                                            <div className="row">
                                                <div className="p-2 col-lg-12 border rounded">
                                                    <EditorialBoard
                                                        submission={this.props.submission}
                                                        editorAssignment={this.props.editorAssignment}
                                                        reviewerAssignments={this.props.editorAssignment.reviewerAssignmentId} />
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row pt-2">
                                                {/* Column */}
                                                <div className="p-2 col-lg-8 border rounded">
                                                    {!checkDueDate(this.props.editorAssignment.dueDate) ? (
                                                        <Aux>
                                                            <div className="form-group ml-1 text-danger font-weight-bold">
                                                                <i className="fas fa-times-circle"></i> Bài báo đã hết thời hạn thẩm định!
                                                            </div>
                                                            <h6><i className="fas fa-comment"></i> Ý KIẾN THẨM ĐỊNH CỦA BẠN</h6>
                                                            <EditorSubmissionDetail editorSubmission={this.props.editorAssignment.editorSubmissionId} />
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                {this.props.editorAssignment.editorSubmissionId ? (
                                                                    <Aux>
                                                                        {this.state.canEdit ? (
                                                                            <EditEditorSubmission
                                                                                editorSubmission={this.props.editorAssignment.editorSubmissionId}
                                                                                editorDecisions={this.props.editorDecisions}
                                                                                inputChangeHandler={this.inputChangeHandler_edit}
                                                                                controls={this.state.controls_edit}
                                                                                formIsValid={this.state.formIsValid_edit}
                                                                                cancelEdit={this.blockEditReviewPageHandler} />
                                                                        ) : (
                                                                                <Aux>
                                                                                    <h6><i className="fas fa-comment"></i> Ý KIẾN THẨM ĐỊNH CỦA BẠN</h6>
                                                                                    <EditorSubmissionDetail editorSubmission={this.props.editorAssignment.editorSubmissionId} />
                                                                                </Aux>
                                                                            )}
                                                                    </Aux>
                                                                ) : (
                                                                        <CreateEditorSubmission
                                                                            editorDecisions={this.props.editorDecisions}
                                                                            inputChangeHandler={this.inputChangeHandler}
                                                                            controls={this.state.controls}
                                                                            formIsValid={this.state.formIsValid} />
                                                                    )}
                                                            </Aux>
                                                        )}
                                                </div>
                                                {/* Column */}
                                                <div className="p-2 col-lg-4 border rounded">
                                                    <h6><i className="fas fa-stream"></i> TRẠNG THÁI</h6>
                                                    {this.props.editorAssignment.editorSubmissionId ? (
                                                        <Aux>
                                                            <div className="form-group text-center">
                                                                <div className="badge-ol badge-ol-success badge-outlined p-2 pr-5 pl-5" style={{ fontSize:'16px' }}>
                                                                    <i className="fas fa-check"></i> Đã nộp ý kiến thẩm định
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                {checkDueDate(this.props.editorAssignment.dueDate) ? (
                                                                    <Aux>
                                                                        {!this.state.canEdit ? (
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-outline-primary btn-block"
                                                                                onClick={(event) => this.openEditReviewPageHandler(event, this.props.editorAssignment.editorSubmissionId)}>
                                                                                <i className="fas fa-edit"></i> Chỉnh sửa ý kiến
                                                                            </button>
                                                                        ) : null}
                                                                    </Aux>
                                                                ) : (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-primary btn-block"
                                                                            onClick={() => toast.error('Bài báo đã hết hạn xử lý!')}>
                                                                            <i className="fas fa-edit"></i> Chỉnh sửa ý kiến
                                                                        </button>
                                                                    )}
                                                            </div>
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                <div className="form-group text-center">
                                                                    <div className="badge-ol badge-ol-danger badge-outlined p-2 pr-5 pl-5" style={{ fontSize:'16px' }}>
                                                                        <i className="fas fa-close"></i> Chưa nộp ý kiến thẩm định
                                                                    </div>
                                                                </div>
                                                            </Aux>
                                                        )}

                                                    <SubmissionProcess
                                                        submission={this.props.submission} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* ------------------Tab 3----------------- */}
                                        <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* Row */}
                                            <div className="row">
                                                <div className="p-2 col-lg-12 border rounded">
                                                    <EditorialBoard
                                                        submission={this.props.submission}
                                                        editorAssignment={this.props.editorAssignment}
                                                        reviewerAssignments={this.props.editorAssignment.reviewerAssignmentId} />
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row pt-2">
                                                {/* Column */}
                                                <div className="p-2 col-lg-8 border rounded">
                                                    {!checkDueDate(this.props.editorAssignment.dueDate) ? (
                                                        <Aux>
                                                            <div className="form-group ml-1 text-danger font-weight-bold">
                                                                <i className="fas fa-times-circle"></i> Bài báo đã hết thời hạn thẩm định!
                                                            </div>
                                                            <h6><i className="fas fa-comment"></i> CHI TIẾT YÊU CẦU TÁC GIẢ CHỈNH SỬA</h6>
                                                            {this.props.authorAssignment ? (
                                                                <AuthorAssignment authorAssignment={this.props.authorAssignment} />
                                                            ) : (
                                                                    <div className="form-group ml-3">
                                                                        <p className="ml-4">Bạn chưa gửi yêu cầu chỉnh sửa bài báo cho tác giả.</p>
                                                                    </div>
                                                                )}
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                {this.props.authorAssignment ? (
                                                                    <Aux>
                                                                        <h6><i className="fas fa-edit"></i> CHI TIẾT YÊU CẦU TÁC GIẢ CHỈNH SỬA</h6>
                                                                        <AuthorAssignment authorAssignment={this.props.authorAssignment} />
                                                                    </Aux>
                                                                ) : (
                                                                        <RequestRevision
                                                                            dueDate={this.state.dueDate}
                                                                            emailToAuthor={this.state.emailToAuthor}
                                                                            messageToAuthor={this.state.messageToAuthor}
                                                                            setDueDate={this.setDueDateHandler}
                                                                            setMessage={this.setMessageToAuthorHandler}
                                                                            setEmail={this.setEmailToAuthorHandler} />
                                                                    )}
                                                            </Aux>
                                                        )}
                                                </div>
                                                {/* Column */}
                                                <div className="p-2 col-lg-4 border rounded">
                                                    <h6><i className="fas fa-stream"></i> TRẠNG THÁI</h6>

                                                    {this.props.authorAssignment ? (
                                                        <Aux>
                                                            {!this.props.authorAssignment.authorRevisionId ? (
                                                                <div className="form-group text-center">
                                                                    <div className="badge-ol badge-ol-primary badge-outlined p-2 pr-5 pl-5" style={{ fontSize:'16px' }}>
                                                                        <i className="fas fa-check"></i> Đã gửi yêu cầu đến tác giả
                                                                    </div>
                                                                </div>
                                                            ): (
                                                                <div className="form-group text-center">
                                                                    <div className="badge-ol badge-ol-success badge-outlined p-2 pr-4 pl-4" style={{ fontSize:'16px' }}>
                                                                        <i className="fas fa-check"></i> Tác giả đã nộp bản chỉnh sửa
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                <div className="form-group text-center">
                                                                    <div className="badge-ol badge-ol-danger badge-outlined p-2 pr-5 pl-5" style={{ fontSize:'16px' }}>
                                                                        <i className="fas fa-close"></i> Chưa gửi yêu cầu đến tác giả
                                                                    </div>
                                                                </div>
                                                            </Aux>
                                                        )}

                                                    <SubmissionProcess
                                                        submission={this.props.submission} />                                                           
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

        return (
            <Aux>
                {contentWrapper}
                <ConfirmDialog
                    title="Xác nhận"
                    message="Gửi ý kiến thẩm định bài báo cho tổng biên tập?"
                    confirm={this.confirmSubmitHandler} />
                {this.props.error ? toast.error('Error: ' + this.props.error) : null}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission.submission,
        loading: state.submission.loading,
        editorAssignment: state.review.editorAssignment,
        editorDecisions: state.submission.editorDecisions,
        fileUploading: state.review.fileUploading,
        isEditorSubmissionCreated: state.review.isEditorSubmissionCreated,
        isEditorSubmissionEdited: state.review.isEditorSubmissionEdited,
        isRequestAuthorRevisionCreated: state.review.isRequestAuthorRevisionCreated,
        authorAssignment: state.review.authorAssignment,
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getEditorAssignmentBySubmission,
    getEditorDecisions,
    createEditorSubmission,
    resetCreateEditorSubmissionState,
    editEditorSubmission,
    resetEditEditorSubmissionState,
    requestAuthorRevision,
    resetRequestAuthorRevisionState,
    getAuthorAssignmentBySubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorAssignment);