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
import { getMyNotifications } from '../../../store/actions/authActions';
import { getSubmissionDetail, getEditorDecisions } from '../../../store/actions/submissionActions';
import {
    getEditorAssignmentBySubmission,
    createEditorSubmission,
    resetCreateEditorSubmissionState,
    editEditorSubmission,
    resetEditEditorSubmissionState,
    requestAuthorRevision,
    resetRequestAuthorRevisionState,
    getAuthorAssignmentBySubmission,
    getChiefEditorSubmission
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
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { requestRevisionTemplate } from '../../../utils/email-template';
import CESubmissionDetail from '../ChiefEditor/EditorialBoardSubmissions/CESubmisisonDetail';
class EditorAssignment extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        step4Active: false,
        controls: createReviewInputControls,
        controls_edit: editReviewInputControls,
        formIsValid: false,
        formIsValid_edit: true,
        canEdit: false,
        // request author revision
        canRequestAuthorRevision: false,
        dueDate: getDeadlineDate(7),
        messageToAuthor: 'Nội dung lời nhắn',
        // emailToAuthor: 'Nội dung email',
        editorState: null

    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getEditorDecisions();
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
        }
        // Text Editor
        const contentBlock = htmlToDraft(requestRevisionTemplate('Test Article 2020', '/dashboard', 'Nguyễn Hải Hà', 'Nguyễn Lâm'));
        let editorState = null;
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);

        }
        this.setState(updateObject(this.state, {
            editorState: editorState
        }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.submissionId !== prevProps.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
        }
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
            // this.props.getEditorDecisions();
            this.props.getAuthorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getMyNotifications();
            this.props.getChiefEditorSubmission(this.props.match.params.submissionId);
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
            step4Active: false,
            canRequestAuthorRevision: false
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
            step3Active: false,
            step4Active: false,
            canRequestAuthorRevision: false
        });
        this.setState(newState);
    }

    step3ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: false,
            step3Active: true,
            step4Active: false,
            canRequestAuthorRevision: false
        });
        this.setState(newState);
    }

    step4ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: false,
            step3Active: false,
            step4Active: true,
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
        const filename = editorSubmission.attachmentFile ? editorSubmission.attachmentFile : "Chọn File";
        const updatedControls = updateObject(this.state.controls_edit, {
            decisionId: updateObject(this.state.controls_edit.decisionId, {
                value: editorSubmission.editorDecisionId._id,
                decisionName: editorSubmission.editorDecisionId.decisionName
            }),
            content: updateObject(this.state.controls_edit.content, { value: editorSubmission.content }),
            attachment: updateObject(this.state.controls_edit.attachment, { filename: filename })
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
                const formData = new FormData();
                formData.append('editorDecisionId', this.state.controls.decisionId.value);
                formData.append('content', this.state.controls.content.value);
                formData.append('attachment', this.state.controls.attachment.file);
                this.props.createEditorSubmission(submissionId, formData);
            }
        }
        else {
            // edit editor submission
            const formData = new FormData();
            formData.append('editorDecisionId', this.state.controls_edit.decisionId.value);
            formData.append('content', this.state.controls_edit.content.value);
            formData.append('attachment', this.state.controls_edit.attachment.file);
            this.props.editEditorSubmission(submissionId, formData);
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

    // Email Editor
    onEditorStateChange = (editorState) => {
        this.setState(updateObject(this.state, { editorState: editorState }));
    };

    render() {
        const contentWrapper = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Thẩm định bài báo">
                        <li className="breadcrumb-item active">Thẩm định bài báo</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card card-primary card-outline card-tabs">
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
                                            <div className={this.state.step1Active ? 'text-custom' : 'text-secondary'}><b>Chi tiết yêu cầu</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step2ActiveHandler}>
                                            <div className={this.state.step2Active ? 'text-custom' : 'text-secondary'}><b>Thông tin thẩm định</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step3Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step3ActiveHandler}>
                                            <div className={this.state.step3Active ? 'text-custom' : 'text-secondary'}><b>Nộp ý kiến thẩm định</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step4Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step4ActiveHandler}>
                                            <div className={this.state.step4Active ? 'text-custom' : 'text-secondary'}><b>Yêu cầu tác giả chỉnh sửa</b></div>
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
                                            <div className="row pt-2">
                                                {/* Column */}
                                                <div className="p-2 col-lg-8 border rounded">
                                                    {this.props.authorAssignment ? (
                                                        <SubmissionInfor
                                                            submission={this.props.submission}
                                                            hasAuthorRevision={this.props.authorAssignment.authorRevisionId ? true : false} />
                                                    ) : (
                                                            <SubmissionInfor submission={this.props.submission} />
                                                        )}
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
                                                                            <button className="btn btn-outline-dark btn-block">
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
                                        {/* ------------------Tab 3----------------- */}
                                        <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
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
                                                                                cancelEdit={this.blockEditReviewPageHandler}
                                                                                fileUploading={this.props.fileUploading} />
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
                                                                            formIsValid={this.state.formIsValid}
                                                                            fileUploading={this.props.fileUploading} />
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
                                                                <div className="badge-ol badge-ol-success badge-outlined p-2 pr-5 pl-5" style={{ fontSize: '16px' }}>
                                                                    <i className="fas fa-check"></i> Đã nộp ý kiến thẩm định
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                {checkDueDate(this.props.editorAssignment.dueDate) ? (
                                                                    <Aux>
                                                                        {!this.state.canEdit ? (
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-outline-dark btn-block"
                                                                                onClick={(event) => this.openEditReviewPageHandler(event, this.props.editorAssignment.editorSubmissionId)}>
                                                                                <i className="fas fa-edit"></i> Chỉnh sửa ý kiến
                                                                            </button>
                                                                        ) : null}
                                                                    </Aux>
                                                                ) : (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-dark btn-block"
                                                                            onClick={() => toast.error('Bài báo đã hết hạn xử lý!')}>
                                                                            <i className="fas fa-edit"></i> Chỉnh sửa ý kiến
                                                                        </button>
                                                                    )}
                                                            </div>
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                <div className="form-group text-center">
                                                                    <div className="badge-ol badge-ol-danger badge-outlined p-2 pr-4 pl-4" style={{ fontSize: '16px' }}>
                                                                        <i className="fas fa-close"></i> Chưa nộp ý kiến thẩm định
                                                                </div>
                                                                </div>
                                                            </Aux>
                                                        )}

                                                    <SubmissionProcess submission={this.props.submission} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* ------------------Tab 4----------------- */}
                                        <div className={this.state.step4Active ? 'tab-pane show active' : 'tab-pane'}>
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
                                                                <AuthorAssignment
                                                                    step1ActiveHandler={this.step1ActiveHandler}
                                                                    authorAssignment={this.props.authorAssignment} />
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
                                                                        <AuthorAssignment
                                                                            step1ActiveHandler={this.step1ActiveHandler}
                                                                            authorAssignment={this.props.authorAssignment} />
                                                                    </Aux>
                                                                ) : (
                                                                        <RequestRevision
                                                                            dueDate={this.state.dueDate}
                                                                            editorState={this.state.editorState}
                                                                            onEditorStateChange={this.onEditorStateChange}
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
                                                                    <div className="badge-ol badge-ol-primary badge-outlined p-2 pr-5 pl-5" style={{ fontSize: '16px' }}>
                                                                        <i className="fas fa-check"></i> Đã gửi yêu cầu đến tác giả
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                    <div className="form-group text-center">
                                                                        <div className="badge-ol badge-ol-success badge-outlined p-2 pr-4 pl-4" style={{ fontSize: '16px' }}>
                                                                            <i className="fas fa-check"></i> Tác giả đã nộp bản chỉnh sửa
                                                                    </div>
                                                                    </div>
                                                                )}
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                <div className="form-group text-center">
                                                                    <div className="badge-ol badge-ol-danger badge-outlined p-2 pr-4 pl-4" style={{ fontSize: '16px' }}>
                                                                        <i className="fas fa-close"></i> Chưa gửi yêu cầu đến tác giả
                                                                </div>
                                                                </div>
                                                            </Aux>
                                                        )}

                                                    <SubmissionProcess submission={this.props.submission} />
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
                {this.state.step3Active ? (
                    <ConfirmDialog
                        title="Xác nhận"
                        message="Gửi ý kiến thẩm định bài báo cho tổng biên tập?"
                        confirm={this.confirmSubmitHandler} />
                ) : (
                        <ConfirmDialog
                            title="Xác nhận"
                            message="Gửi yêu cầu chỉnh sửa bài báo tới tác giả?"
                            confirm={this.confirmSubmitHandler} />
                    )}
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
        chiefEditorSubmission: state.review.chiefEditorSubmission,
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
    getAuthorAssignmentBySubmission,
    getMyNotifications,
    getChiefEditorSubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorAssignment);