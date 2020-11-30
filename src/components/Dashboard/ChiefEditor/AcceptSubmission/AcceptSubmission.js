import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { updateObject } from '../../../../utils/utility';
import ContentHeader from '../../Shared/ContentHeader';
import { acceptSubmissionInputControls } from '../../../../utils/input-controls';
import { acceptSubmissionInputChangeHandler } from '../../../../utils/input-change';
import { Link } from 'react-router-dom';
import {
    getSubmissionDetail,
} from '../../../../store/actions/submissionActions';
import {
    acceptSubmisison,
    resetAcceptSubmissionState
} from '../../../../store/actions/reviewActions'
import { connect } from 'react-redux';
import ConfirmDialog from '../../../UI/ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';

class AcceptSubmission extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: acceptSubmissionInputControls,
        formIsValid: false
    };

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
        }
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        const { updatedControls, formIsValid } = acceptSubmissionInputChangeHandler(event, this.state);
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetAcceptSubmissionState();
        }
        if (nextProps.isSubmissionAccepted && !nextProps.error) {
            this.props.resetAcceptSubmissionState();
            toast.success("Chấp nhận xuất bản bài báo trên hệ thống thành công!");
            this.setState(updateObject(this.state, {
                step1Active: false,
                step2Active: true
            }));
        }
    }

    step1ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: true,
            step2Active: false
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

    confirmSubmitHandler = () => {
        const submissionId = this.props.submission._id;
        const content = this.state.controls.content.value;
        // const emailToAuthor = this.state.controls.emailToAuthor.value;
        this.props.acceptSubmisison(submissionId, content);
    }

    render() {
        const contentWrapper = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Chấp nhận bài báo">
                        <li className="breadcrumb-item active">Accept Submission</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            {this.props.submission ? <h3 className="card-title">{this.props.submission.title}</h3> : null}
                        </div>

                        <div className="card-header p-0">
                            <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                <li className="nav-item">
                                    <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}>
                                        <div className={this.state.step1Active ? 'text-orange' : 'text-secondary'}><b>1. Thông tin tới tác giả</b></div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}>
                                        <div className={this.state.step2Active ? 'text-orange' : 'text-secondary'}><b>2. Hoàn thành</b></div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-one-tabContent">
                                {/* ------------------Tab 1----------------- */}
                                <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                    <div className="card-body">
                                        <div className="form-group pb-2">
                                            <label>Kết luận của ban biên tập</label><br />
                                            <span className={"decision-success ml-2 pl-2 pr-2"}>
                                                <i className="fas fa-check"></i> {" "}
                                                    Chấp nhận xuất bản bài báo
                                                </span>
                                        </div>
                                        <div className="form-group">
                                            <label>Nhận xét của ban biên tập*</label>
                                            <textarea
                                                type="text"
                                                name="content"
                                                className={!this.state.controls.content.valid && this.state.controls.content.touched ? "form-control-error" : "form-control"}
                                                placeholder={this.state.controls.content.elementConfig.placeholder}
                                                defaultValue={this.state.controls.content.value}
                                                onChange={this.inputChangeHandler} />
                                            {!this.state.controls.content.valid && this.state.controls.content.touched ?
                                                <p className="form-control-error-msg">Nhận xét không hợp lệ!</p> : null}
                                        </div>
                                        <div className="form-group">
                                            <label>Gửi Email đến tác giả*</label>
                                            <textarea
                                                type="text"
                                                name="emailToAuthor"
                                                className={!this.state.controls.emailToAuthor.valid && this.state.controls.emailToAuthor.touched ? "form-control-error" : "form-control"}
                                                placeholder={this.state.controls.emailToAuthor.elementConfig.placeholder}
                                                defaultValue={this.state.controls.emailToAuthor.value}
                                                onChange={this.inputChangeHandler} />
                                            {!this.state.controls.emailToAuthor.valid && this.state.controls.emailToAuthor.touched ?
                                                <p className="form-control-error-msg">Email không hợp lệ!</p> : null}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target="#confirmDialogModal"
                                            disabled={!this.state.formIsValid}>Submit</button>
                                        <Link to={`/dashboard/submission/${this.props.match.params.submissionId}`}>
                                            <button className="btn btn-dark ml-2" >Hủy </button>
                                        </Link>
                                    </div>
                                </div>
                                {/* ------------------Tab 2----------------- */}
                                <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                    <h4>Chấp nhận xuất bản bài báo lên hệ thống thành công.</h4>
                                    {this.props.submission ? (
                                        <div className="ml-2">Bài báo <b>{this.props.submission.title}</b> của tác giả {" "}
                                            <Link to="" className="text-primary">{this.props.submission.authorId.firstname} {this.props.submission.authorId.lastname}.</Link>
                                            đã được xuất bản trên hệ thống.
                                        </div>
                                    ) : null}
                                    <h4 className="mt-3">Bây giờ, bạn có thể:</h4>
                                    {this.props.submission ? (
                                        <div className="ml-2">
                                            <i className="fa fa-eye"></i> {" "}
                                            <Link to={`/dashboard/submission/${this.props.submission._id}`} className="text-primary">
                                                Xem thông tin bài báo
                                            </Link>.
                                        </div>
                                    ) : null}
                                    <div className="ml-2">
                                        <i className="fa fa-home"></i>
                                        {" "} <Link to="/dashboard" className="text-primary">Trở về trang chủ.</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );

        return (
            <Aux>
                {contentWrapper}
                <ConfirmDialog
                    title="Xác nhận"
                    message="Quyết định xuất bản bài báo trên hệ thống?"
                    confirm={this.confirmSubmitHandler} />
                {this.props.error ? toast.error('Error: ' + this.props.error) : null}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission.submission,
        isSubmissionAccepted: state.review.isSubmissionAccepted,
        error: state.review.error
    };
};

const mapDispatchToProps = {
    getSubmissionDetail,
    acceptSubmisison,
    resetAcceptSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptSubmission);
