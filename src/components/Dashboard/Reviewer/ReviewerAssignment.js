import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../Shared/ContentHeader';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import Spinner from '../../UI/Spinner/Spinner';
import SubmissionLogs from '../Submission/SubmissionLogs';
import { checkValidity, updateObject } from '../../../utils/utility';
import { getSubmissionDetail, getReviewerDecisions } from '../../../store/actions/submissionActions';
import { getMyReviewerAssignmentDetail, createReviewSubmission, resetCreateReviewSubmissionState } from '../../../store/actions/reviewActions';
import { connect } from 'react-redux';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import AssignmentInfor from './AssignmentInfor/AssignmentInfor';
import CreateReview from './ReviewSubmission/CreateReview';
import ReviewDetail from './ReviewSubmission/ReviewDetail';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
class ReviewerAssignment extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: {
            decisionId: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Quyết định'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            content: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ý kiến nhận xét của bạn'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            attachment: {
                elementConfig: {
                    type: 'file',
                    placeholder: 'Chọn File'
                },
                filename: 'Chọn File',
                file: null,
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getMyReviewerAssignmentDetail(this.props.match.params.submissionId);
            this.props.getReviewerDecisions();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetCreateReviewSubmissionState();
        }
        if (nextProps.isReviewSubmissionCreated && !nextProps.error) {
            this.props.resetCreateReviewSubmissionState();
            toast.success("Gửi ý kiến thẩm định thành công!");
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

    confirmSubmitHandler = () => {
        const submissionId = this.props.submission._id;
        const reqBody = {
            content: this.state.controls.content.value,
            reviewerDecisionId: this.state.controls.decisionId.value
        }
        this.props.createReviewSubmission(submissionId, reqBody);
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
                        <div className="card card-primary card-outline card-outline-tabs">
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
                                            <div className={this.state.step1Active ? 'text-primary' : 'text-dark'}><b>1. Chi tiết yêu cầu</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step2ActiveHandler}>
                                            <div className={this.state.step2Active ? 'text-primary' : 'text-dark'}><b>2. Ý kiến thẩm định</b></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {this.props.submission && this.props.reviewerAssignment ? (
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        {/* Tab 1 */}
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
                                        {/* Tab2 */}
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
                                                    <h6><i className="fas fa-paper-plane"></i> Ý KIẾN CỦA BẠN</h6>
                                                    {this.props.reviewerAssignment.reviewerSubmissionId ? (
                                                        <ReviewDetail
                                                            reviewerSubmission={this.props.reviewerAssignment.reviewerSubmissionId} />
                                                    ) : (
                                                            <CreateReview
                                                                reviewerDecisions={this.props.reviewerDecisions}
                                                                inputChangeHandler={this.inputChangeHandler}
                                                                controls={this.state.controls}
                                                                formIsValid={this.state.formIsValid} />
                                                        )}
                                                </div>
                                                {/* Column */}
                                                <div className="p-2 col-lg-4 border rounded">
                                                    <h6><i className="fas fa-stream"></i> TRẠNG THÁI</h6>
                                                    {this.props.reviewerAssignment.reviewerSubmissionId ? (
                                                        <Aux>
                                                            <div className="form-group">
                                                                <div className="btn btn-success btn-block">
                                                                    Đã nộp ý kiến
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <button className="btn btn-outline-primary btn-block">
                                                                    <i className="fas fa-edit"></i> Chỉnh sửa ý kiến
                                                                    </button>
                                                            </div>
                                                        </Aux>
                                                    ) : (
                                                            <Aux>
                                                                <div className="form-group">
                                                                    <div className="btn btn-danger btn-block">
                                                                        Chưa nộp ý kiến
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
                    message="Gửi ý kiến thẩm định bài báo?"
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
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getMyReviewerAssignmentDetail,
    getReviewerDecisions,
    createReviewSubmission,
    resetCreateReviewSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewerAssignment);
