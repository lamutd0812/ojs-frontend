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
    getReviewerAssignmentsBySubmission,
    createEditorSubmission,
    resetCreateEditorSubmissionState,
    editEditorSubmission,
    resetEditEditorSubmissionState
} from '../../../store/actions/reviewActions';
import { Doughnut } from 'react-chartjs-2';
import AssignmentInfor from './AssigmentInfor/AssignmentInfor';
import { checkDueDate, checkValidity, getDoughnutData, updateObject } from '../../../utils/utility';
import ReviewerSubmissions from './ReviewerSubmissions/ReviewerSubmissions';
import { createReviewInputControls, editReviewInputControls } from '../../../utils/input-controls';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';

class EditorAssignment extends Component {

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
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getReviewerAssignmentsBySubmission(this.props.match.params.submissionId);
            this.props.getEditorDecisions();
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
        let controlName = event.target.name;
        let updatedControls = null;
        if (controlName === 'attachment') {
            updatedControls = updateObject(this.state.controls, {
                [controlName]: updateObject(this.state.controls[controlName], {
                    filename: event.target.files[0].name,
                    file: event.target.files[0],
                    valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                })
            });
        } else {
            updatedControls = updateObject(this.state.controls, {
                [controlName]: updateObject(this.state.controls[controlName], {
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                })
            });
        }

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    inputChangeHandler_edit = (event) => {
        let controlName = event.target.name;
        let updatedControls = null;
        if (controlName === 'attachment') {
            updatedControls = updateObject(this.state.controls_edit, {
                [controlName]: updateObject(this.state.controls_edit[controlName], {
                    filename: event.target.files[0].name,
                    file: event.target.files[0],
                    valid: checkValidity(event.target.value, this.state.controls_edit[controlName].validation),
                    touched: true
                })
            });
        } else {
            updatedControls = updateObject(this.state.controls_edit, {
                [controlName]: updateObject(this.state.controls_edit[controlName], {
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.controls_edit[controlName].validation),
                    touched: true
                })
            });
        }

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls_edit: updatedControls,
            formIsValid_edit: formIsValid
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
        if (!this.state.canEdit) {
            // create editor submission
            const reqBody = {
                content: this.state.controls.content.value,
                editorDecisionId: this.state.controls.decisionId.value
            }
            this.props.createEditorSubmission(submissionId, reqBody);
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
                                            <div className={this.state.step1Active ? 'text-danger' : 'text-secondary'}><b>1. Chi tiết yêu cầu</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step2ActiveHandler}>
                                            <div className={this.state.step2Active ? 'text-danger' : 'text-secondary'}><b>2. Ý kiến thẩm định của bạn</b></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {this.props.submission && this.props.editorAssignment && this.props.reviewerAssignments ? (
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
                                                        reviewerAssignments={this.props.reviewerAssignments} />
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
                                                            <div className="form-group">
                                                                <div className="btn btn-success btn-block">
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
                                                                        className="btn btn-outline-primary btn-block disabled">
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
                                                        editorAssignment={this.props.editorAssignment} />
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
        reviewerAssignments: state.review.reviewerAssignments,
        editorDecisions: state.submission.editorDecisions,
        fileUploading: state.review.fileUploading,
        isEditorSubmissionCreated: state.review.isEditorSubmissionCreated,
        isEditorSubmissionEdited: state.review.isEditorSubmissionEdited,
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getEditorAssignmentBySubmission,
    getReviewerAssignmentsBySubmission,
    getEditorDecisions,
    createEditorSubmission,
    resetCreateEditorSubmissionState,
    editEditorSubmission,
    resetEditEditorSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorAssignment);