import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../Shared/ContentHeader';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject, getDeadlineDate } from '../../../utils/utility';
import { connect } from 'react-redux';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getAllReviewers, assignReviewer, resetReviewerAssignmentState } from '../../../store/actions/reviewActions';
import "react-datepicker/dist/react-datepicker.css";
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { stateToHTML } from 'draft-js-export-html';
import { assignReviewerTemplate } from '../../../utils/email-template';

class AssignReviewer extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        submissionId: '',
        selectedReviewerId: '',
        selectedReviewerName: '',
        selectedReviewerEmail: '',
        dueDate: getDeadlineDate(7),
        messageToReviewer: 'Nội dung lời nhắn',
        editorState: null
    };

    componentDidMount() {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const submissionId = query.get('submissionId');
            this.props.getAllReviewers(submissionId);

            this.setState(updateObject(this.state, { submissionId: submissionId }));

            if (!this.props.submission) {
                this.props.getSubmissionDetail(submissionId);
            }
        }
    }

    step1ActiveHandler = () => {
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetReviewerAssignmentState();
        }
        if (nextProps.isReviewerAssigned && !nextProps.error) {
            this.props.resetReviewerAssignmentState();
            toast.success("Chỉ định thẩm định viên thành công!");
            this.setState(updateObject(this.state, {
                step1Active: false, step2Active: false, step3Active: true
            }));
        }
    }

    reviewerSelectedHandler = (event) => {
        // Text Editor
        const contentBlock = htmlToDraft(assignReviewerTemplate(this.props.submission.title,
            this.props.editorFullname, event.target.id));
        let editorState = null;
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);

        }
        const nameAndEmail = event.target.id;
        const fileds = nameAndEmail.split("|");
        const fullname = fileds[0];
        const email = fileds[1];

        this.setState(updateObject(this.state, {
            editorState: editorState,
            selectedReviewerId: event.target.value,
            selectedReviewerName: fullname,
            selectedReviewerEmail: email,
        }));
    }

    setDueDateHandler = (date) => {
        this.setState(updateObject(this.state, { dueDate: date }));
    }

    setMessageToReviewerHandler = (event) => {
        this.setState(updateObject(this.state, { messageToReviewer: event.target.value }));
    }

    confirmSubmitHandler = () => {
        const htmlContent = stateToHTML(this.state.editorState.getCurrentContent());
        const reqBody = {
            submissionId: this.state.submissionId,
            reviewerId: this.state.selectedReviewerId,
            dueDate: this.state.dueDate,
            message: this.state.messageToReviewer,
            reviewerEmail: this.state.selectedReviewerEmail,
            htmlContent: htmlContent
        };
        this.props.assignReviewer(reqBody);
    }

    onEditorStateChange = (editorState) => {
        this.setState(updateObject(this.state, { editorState: editorState }));
    };

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <section className="content-header">
                        <ContentHeader title="Chỉ định thẩm định viên">
                            <li className="breadcrumb-item active">Chỉ định thẩm định viên</li>
                        </ContentHeader>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="col-md-12">
                                <div className="card card-dark card-tabs">
                                    <div className="card-header p-0 pt-1">
                                        <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                            <li className="nav-item">
                                                <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}>
                                                    1. Lựa chọn thẩm định viên
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}>
                                                    2. Chi tiết yêu cầu
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <div className={this.state.step3Active ? 'nav-link active' : 'nav-link'}>
                                                    3. Hoàn thành
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content" id="custom-tabs-one-tabContent">
                                            <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <div className="input-group input-group-sm mb-2" style={{ width: '300px' }}>
                                                    <input type="text" className="form-control" placeholder="Tìm kiếm" />
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default btn-flat">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                {this.props.reviewers.length > 0 ? (
                                                    <div className="card-body table-responsive p-0" style={{ height: '300px' }}>
                                                        <table className="table table-head-fixed text-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>Chọn</th>
                                                                    <th>Thẩm định viên</th>
                                                                    <th className="text-center">Đã xử lý</th>
                                                                    <th className="text-center">Đang xử lý</th>
                                                                    <th>Lĩnh vực yêu thích</th>
                                                                    <th className="text-center">Độ phù hợp</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.props.reviewers.map(reviewer => (
                                                                    <tr key={reviewer._id}>
                                                                        <td>
                                                                            <div className="radio" onChange={this.reviewerSelectedHandler}>
                                                                                <label>
                                                                                    <input
                                                                                        value={reviewer._id}
                                                                                        type="radio"
                                                                                        id={reviewer.lastname + " " + reviewer.firstname + "|" + reviewer.email}
                                                                                        name="reviewer" />
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <Link className="text-primary" to="#">{reviewer.lastname} {reviewer.firstname}</Link>
                                                                        </td>
                                                                        <td className="text-center">{reviewer.handled}</td>
                                                                        <td className="text-center">{reviewer.handling}</td>
                                                                        <td>
                                                                            {reviewer.preferenceCategories.map((val, idx) => {
                                                                                const el = <div key={idx} className="text-danger">
                                                                                    {val}
                                                                                </div>
                                                                                return el;
                                                                            })}
                                                                        </td>
                                                                        <td className="project_progress">
                                                                            <div className="progress progress-sm">
                                                                                <div className="progress-bar bg-red" role="progressbar"
                                                                                    aria-valuenow={reviewer.appropriateRate} aria-valuemin="0"
                                                                                    aria-valuemax="10" style={{ width: `${reviewer.appropriateRate * 10}%` }}></div>
                                                                            </div>
                                                                            <small style={{ fontSize: '13.5px' }}>
                                                                                {reviewer.appropriateRate}/10
                                                                            </small>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : <Spinner />}
                                                <button
                                                    className="btn btn-outline-primary btn-flat mt-3"
                                                    disabled={this.state.selectedReviewerId === ''}
                                                    onClick={this.step2ActiveHandler}>Lựa chọn</button>
                                                {this.props.submission && (
                                                    <Link to={`/dashboard/editor/assignment/${this.props.submission._id}`}>
                                                        <button className="btn btn-outline-danger btn-flat mt-3 ml-2">Hủy</button>
                                                    </Link>
                                                )}
                                            </div>
                                            <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <div className="form-group">
                                                    <h6>Thời hạn xử lý*</h6>
                                                    <DatePicker className="form-control"
                                                        showTimeSelect
                                                        minDate={getDeadlineDate(7)}
                                                        selected={this.state.dueDate}
                                                        onChange={date => this.setDueDateHandler(date)}
                                                        dateFormat="dd/MM/yyyy" />
                                                </div>
                                                <div className="form-group">
                                                    <h6>Gửi Email tới thẩm định viên*</h6>
                                                    <p><span className="text-dark">Địa chỉ email:</span> {this.state.selectedReviewerEmail}</p>
                                                    <Editor
                                                        editorState={this.state.editorState}
                                                        wrapperClassName="wrapper-class"
                                                        editorClassName="form-control"
                                                        toolbarClassName="toolbar-class"
                                                        onEditorStateChange={this.onEditorStateChange} />
                                                    {/* <textarea
                                                        type="text"
                                                        name="noti_and_email"
                                                        className="form-control"
                                                        defaultValue={this.state.emailToReviewer}
                                                        onChange={this.setEmailToReviewerHandler} /> */}
                                                </div>
                                                <div className="form-group">
                                                    <h6>Lời nhắn</h6>
                                                    <textarea
                                                        type="text"
                                                        name="message"
                                                        className="form-control"
                                                        defaultValue={this.state.messageToReviewer}
                                                        onChange={this.setMessageToReviewerHandler} />
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary btn-flat"
                                                        data-toggle="modal"
                                                        data-target="#confirmDialogModal">Xác nhận</button>
                                                    <button
                                                        className="btn btn-outline-danger btn-flat ml-2"
                                                        onClick={this.step1ActiveHandler}>Quay lại</button>
                                                </div>
                                            </div>
                                            <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <h4>Chỉ định biên tập viên thành công.</h4>
                                                {this.props.submission ? (
                                                    <div className="ml-2">Bạn đã chỉ định thẩm định viên <Link to="#" className="text-primary">{this.state.selectedReviewerName}</Link>
                                                        {" "}thẩm định bài báo <b>{this.props.submission.title}</b> của tác giả <Link to="" className="text-primary">{this.props.submission.authorId.firstname} {this.props.submission.authorId.lastname}.</Link></div>
                                                ) : null}
                                                <h4 className="mt-3">Bây giờ, bạn có thể:</h4>
                                                {this.props.submission ? (
                                                    <div className="ml-2">
                                                        <i className="fa fa-eye"></i>
                                                        {" "}<Link to={`/dashboard/editor/assignment/${this.props.submission._id}`} className="text-primary">
                                                            Theo dõi quá trình thẩm định.
                                                    </Link>.
                                                    </div>
                                                ) : null}
                                                <div className="ml-2">
                                                    <i className="fa fa-home"></i>
                                                    {" "} <Link to="/dashboard/editor" className="text-primary">Xử lý bài báo khác.</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <ConfirmDialog
                    title="Xác nhận"
                    message="Chỉ định thẩm định viên cho bài báo?"
                    confirm={this.confirmSubmitHandler} />
                {this.props.error ? toast.error('Error: ' + this.props.error) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editorFullname: state.auth.fullname,
        submission: state.submission.submission,
        reviewers: state.review.reviewers,
        isReviewerAssigned: state.review.isReviewerAssigned,
        message: state.review.message,
        error: state.review.error
    };
};

const mapDispatchToProps = {
    getAllReviewers,
    getSubmissionDetail,
    assignReviewer,
    resetReviewerAssignmentState
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignReviewer);
