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
    declineSubmisison,
    resetDeclineSubmissionState
} from '../../../../store/actions/reviewActions'
import { connect } from 'react-redux';
import ConfirmDialog from '../../../UI/ConfirmDialog/ConfirmDialog';
import { toast } from 'react-toastify';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { declineSubmissionTemplate } from '../../../../utils/email-template';
import { stateToHTML } from 'draft-js-export-html';

class DeclineSubmission extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: acceptSubmissionInputControls,
        formIsValid: false,
        editorState: null
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
        if (nextProps.submission) {
            // Text Editor
            const url = "https://vnojs.online/dashboard/submission/" + nextProps.submission._id;
            const contentBlock = htmlToDraft(declineSubmissionTemplate(nextProps.submission.title, url,
                this.props.ceFullname, nextProps.submission.authorId.lastname + " " + nextProps.submission.authorId.firstname));
            let editorState = null;
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                editorState = EditorState.createWithContent(contentState);

            }
            this.setState(updateObject(this.state, {
                editorState: editorState
            }));
        }
        if (nextProps.error) {
            this.props.resetDeclineSubmissionState();
        }
        if (nextProps.isSubmissionDeclined && !nextProps.error) {
            this.props.resetDeclineSubmissionState();
            toast.success("Từ chối bài báo thành công!");
            this.setState(updateObject(this.state, {
                step1Active: false,
                step2Active: true
            }));
        }
    }

    step1ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: true, step2Active: false
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false, step2Active: true,
        });
        this.setState(newState);
    }

    confirmSubmitHandler = () => {
        const htmlContent = stateToHTML(this.state.editorState.getCurrentContent());
        const authorEmail = this.props.submission.authorId.email;

        const submissionId = this.props.submission._id;
        const content = this.state.controls.content.value;

        this.props.declineSubmisison(submissionId, content, authorEmail, htmlContent);
    }

    onEditorStateChange = (editorState) => {
        this.setState(updateObject(this.state, { editorState: editorState }));
    };

    render() {
        const contentWrapper = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Từ chối bài báo">
                        <li className="breadcrumb-item active">Từ chối bài báo</li>
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
                                        <div className={this.state.step1Active ? 'text-custom' : 'text-secondary'}><b>1. Thông tin tới tác giả</b></div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}>
                                        <div className={this.state.step2Active ? 'text-custom' : 'text-secondary'}><b>2. Hoàn thành</b></div>
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
                                            <span className={"decision-danger ml-2 pl-2 pr-2"}>
                                                <i className="fas fa-close"></i> {" "}
                                                    Từ chối bài báo
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
                                            <p><span className="text-dark">Địa chỉ email:</span> {this.props.submission ? this.props.submission.authorId.email : ""}</p>
                                            <Editor
                                                editorState={this.state.editorState}
                                                wrapperClassName="wrapper-class"
                                                editorClassName="form-control"
                                                toolbarClassName="toolbar-class"
                                                onEditorStateChange={this.onEditorStateChange} />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-flat"
                                            data-toggle="modal"
                                            data-target="#confirmDialogModal"
                                            disabled={!this.state.formIsValid}>Xác nhận</button>
                                        <Link to={`/dashboard/submission/${this.props.match.params.submissionId}`}>
                                            <button className="btn btn-outline-danger btn-flat ml-2" >Hủy </button>
                                        </Link>
                                    </div>
                                </div>
                                {/* ------------------Tab 2----------------- */}
                                <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                    <h4>Từ chối bài báo.</h4>
                                    {this.props.submission ? (
                                        <div className="ml-2">Bài báo <b>{this.props.submission.title}</b> của tác giả {" "}
                                            <Link to="" className="text-primary">{this.props.submission.authorId.firstname} {this.props.submission.authorId.lastname}.</Link>
                                            {" "}đã bị từ chối.
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
                    message="Bạn có chắc chắn muốn từ chối bài báo này?"
                    confirm={this.confirmSubmitHandler} />
                {this.props.error ? toast.error('Error: ' + this.props.error) : null}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ceFullname: state.auth.fullname,
        submission: state.submission.submission,
        isSubmissionDeclined: state.review.isSubmissionDeclined,
        error: state.review.error
    };
};

const mapDispatchToProps = {
    getSubmissionDetail,
    declineSubmisison,
    resetDeclineSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(DeclineSubmission);
