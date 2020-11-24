import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../Shared/ContentHeader';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import Spinner from '../../UI/Spinner/Spinner';
import SubmissionLogs from '../Submission/SubmissionLogs';
import { checkDueDate, updateObject } from '../../../utils/utility';
import { getSubmissionDetail, getReviewerDecisions } from '../../../store/actions/submissionActions';
import {
    getMyReviewerAssignmentDetail,
    createReviewSubmission,
    resetCreateReviewSubmissionState,
    editReviewSubmission,
    resetEditReviewSubmissionState
} from '../../../store/actions/reviewActions';
import { connect } from 'react-redux';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import AssignmentInfor from './AssignmentInfor/AssignmentInfor';
import CreateReview from './ReviewSubmission/CreateReview';
import EditReview from './ReviewSubmission/EditReview';
import ReviewDetail from './ReviewSubmission/ReviewDetail';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import { createReviewInputControls, editReviewInputControls } from '../../../utils/input-controls';
import { createReviewInputChangeHandler, editReviewInnputChangeHandler } from '../../../utils/input-change';
class ReviewerAssignment extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: createReviewInputControls,
        controls_edit: editReviewInputControls,
        formIsValid: false,
        formIsValid_edit: true,
        canEdit: false
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getMyReviewerAssignmentDetail(this.props.match.params.submissionId);
            this.props.getReviewerDecisions();
        }
    }

    componentDidUpdate() {
        if (this.props.isReviewSubmissionEdited) {
            window.scrollTo(0, 0);
            this.props.resetEditReviewSubmissionState();
            this.setState(updateObject(this.state, { canEdit: false }));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetCreateReviewSubmissionState();
            this.props.resetEditReviewSubmissionState();
        }
        if (nextProps.isReviewSubmissionCreated && !nextProps.error) {
            this.props.resetCreateReviewSubmissionState();
            toast.success("Gửi ý kiến thẩm định thành công!");
            this.props.getMyReviewerAssignmentDetail(this.props.match.params.submissionId);
        }
        if (nextProps.isReviewSubmissionEdited && !nextProps.error) {
            this.props.resetEditReviewSubmissionState();
            toast.success("Chỉnh sửa ý kiến thẩm định thành công!");
            this.props.getMyReviewerAssignmentDetail(this.props.match.params.submissionId);
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getMyReviewerAssignmentDetail(this.props.match.params.submissionId);
            this.props.getReviewerDecisions();
        }
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
    openEditReviewPageHandler = (event, reviewSubmission) => {
        event.preventDefault();
        // Init Control Edit Values
        const updatedControls = updateObject(this.state.controls_edit, {
            decisionId: updateObject(this.state.controls_edit.decisionId, {
                value: reviewSubmission.reviewerDecisionId._id,
                decisionName: reviewSubmission.reviewerDecisionId.decisionName
            }),
            content: updateObject(this.state.controls_edit.content, { value: reviewSubmission.content }),
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
        if (!this.state.canEdit) {
            // create review
            const reqBody = {
                content: this.state.controls.content.value,
                reviewerDecisionId: this.state.controls.decisionId.value
            }
            this.props.createReviewSubmission(submissionId, reqBody);
        }
        else {
            // edit review
            const reqBody = {
                content: this.state.controls_edit.content.value,
                reviewerDecisionId: this.state.controls_edit.decisionId.value
            }
            this.props.editReviewSubmission(submissionId, reqBody);
        }
        // const formData = new FormData();
        // formData.append('reviewerDecisionId', this.state.controls.decisionId.value);
        // formData.append('content', this.state.controls.content.value);
        // formData.append('attachment', this.state.controls.attachment.file);
        // console.log(formData);
        // this.props.createReviewSubmission(submissionId, formData);
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
                                            <div className={this.state.step2Active ? 'text-orange' : 'text-secondary'}><b>Ý kiến thẩm định của bạn</b></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {this.props.submission && this.props.reviewerAssignment ? (
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        {/* ------------------Tab 1----------------- */}
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* Row */}
                                            <div className="row">
                                                {/* Column */}
                                                <div className="p-2 col-lg-12 border rounded">
                                                    <EditorialBoard
                                                        submission={this.props.submission}
                                                        reviewerAssignment={this.props.reviewerAssignment} />
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row mt-2">
                                                {/* Colum */}
                                                <div className="p-2 col-lg-8 border rounded">
                                                    <SubmissionInfor
                                                        submission={this.props.submission} />
                                                </div>
                                                {/* Column */}
                                                <div className="p-2 col-lg-4 border rounded">
                                                    <AssignmentInfor
                                                        submission={this.props.submission}
                                                        reviewerAssignment={this.props.reviewerAssignment} />
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
                                                        reviewerAssignment={this.props.reviewerAssignment} />
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row mt-2">
                                                {/* Column */}
                                                <div className="p-2 col-lg-8 border rounded">
                                                    {!checkDueDate(this.props.reviewerAssignment.dueDate) ? (
                                                        <Aux>
                                                            <div className="form-group ml-1 text-danger font-weight-bold">
                                                                <i className="fas fa-times-circle"></i> Bài báo đã hết thời hạn thẩm định!
                                                            </div>
                                                            <h6><i className="fas fa-comment"></i> Ý KIẾN THẨM ĐỊNH CỦA BẠN</h6>
                                                            <ReviewDetail reviewerSubmission={this.props.reviewerAssignment.reviewerSubmissionId} />
                                                        </Aux>
                                                    ) : (
                                                        <Aux>
                                                            {this.props.reviewerAssignment.reviewerSubmissionId ? (
                                                                <Aux>
                                                                    {this.state.canEdit ? (
                                                                        <EditReview
                                                                            reviewSubmission={this.props.reviewerAssignment.reviewerSubmissionId}
                                                                            reviewerDecisions={this.props.reviewerDecisions}
                                                                            inputChangeHandler={this.inputChangeHandler_edit}
                                                                            controls={this.state.controls_edit}
                                                                            formIsValid={this.state.formIsValid_edit}
                                                                            cancelEdit={this.blockEditReviewPageHandler} />
                                                                    ) : (
                                                                        <Aux>
                                                                            <h6><i className="fas fa-comment"></i> Ý KIẾN THẨM ĐỊNH CỦA BẠN</h6>
                                                                             <ReviewDetail reviewerSubmission={this.props.reviewerAssignment.reviewerSubmissionId} />
                                                                        </Aux>
                                                                    )}
                                                                </Aux>
                                                            ) : (
                                                                <CreateReview
                                                                    reviewerDecisions={this.props.reviewerDecisions}
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
                                                    {this.props.reviewerAssignment.reviewerSubmissionId ? (
                                                        <Aux>
                                                            <div className="form-group">
                                                                <div className="btn btn-success btn-block">
                                                                    <i className="fas fa-check"></i> Đã nộp ý kiến thẩm định
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                {checkDueDate(this.props.reviewerAssignment.dueDate) ? (
                                                                    <Aux>
                                                                        {!this.state.canEdit ? (
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-outline-primary btn-block"
                                                                                onClick={(event) => this.openEditReviewPageHandler(event, this.props.reviewerAssignment.reviewerSubmissionId)}>
                                                                                <i className="fas fa-edit"></i> Chỉnh sửa ý kiến
                                                                            </button>
                                                                        ) : null}
                                                                    </Aux>
                                                                ) : (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-primary btn-block"
                                                                        onClick={()=> toast.error('Bài báo đã hết hạn xử lý!')}>
                                                                        <i className="fas fa-edit"></i> Chỉnh sửa ý kiến
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </Aux>
                                                    ) : (
                                                        <Aux>
                                                            <div className="form-group">
                                                                <div className="btn btn-danger btn-block">
                                                                    <i className="fas fa-close"></i> Chưa nộp ý kiến thẩm định
                                                                </div>
                                                            </div>
                                                        </Aux>
                                                    )}
                                                    <AssignmentInfor
                                                        submission={this.props.submission}
                                                        reviewerAssignment={this.props.reviewerAssignment} />
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
                    message="Gửi ý kiến thẩm định bài báo cho biên tập viên?"
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
        reviewerAssignment: state.review.reviewerAssignment,
        reviewerDecisions: state.submission.reviewerDecisions,
        fileUploading: state.review.fileUploading,
        isReviewSubmissionCreated: state.review.isReviewSubmissionCreated,
        isReviewSubmissionEdited: state.review.isReviewSubmissionEdited,
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getMyReviewerAssignmentDetail,
    getReviewerDecisions,
    createReviewSubmission,
    resetCreateReviewSubmissionState,
    editReviewSubmission,
    resetEditReviewSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewerAssignment);
