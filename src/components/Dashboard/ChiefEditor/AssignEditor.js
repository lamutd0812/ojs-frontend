import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../Shared/ContentHeader';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject, getDeadlineDate } from '../../../utils/utility';
import { connect } from 'react-redux';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getAllEditors, assignEditor, resetEditorAssignmentState } from '../../../store/actions/reviewActions';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { stateToHTML } from 'draft-js-export-html';
import { assignEditorTemplate } from '../../../utils/email-template';
class AssignEditor extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        submissionId: '',
        selectedEditorId: '',
        selectedEditorName: '',
        selectedEditorEmail: '',
        dueDate: getDeadlineDate(7),
        messageToEditor: 'Nội dung lời nhắn',
        editorState: null
    };

    componentDidMount() {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const submissionId = query.get('submissionId');
            this.props.getAllEditors(submissionId);

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
            this.props.resetEditorAssignmentState();
        }

        if (nextProps.isEditorAssigned && !nextProps.error) {
            this.props.resetEditorAssignmentState();
            toast.success("Chỉ định biên tập viên thành công!");
            this.setState(updateObject(this.state, {
                step1Active: false, step2Active: false, step3Active: true
            }));
        }
    }

    editorSelectedHandler = (event) => {
        // Text Editor
        const contentBlock = htmlToDraft(assignEditorTemplate(this.props.submission.title,
            this.props.ceFullname, event.target.id));
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
            selectedEditorId: event.target.value,
            selectedEditorName: fullname,
            selectedEditorEmail: email
        }));
    }

    setDueDateHandler = (date) => {
        this.setState(updateObject(this.state, { dueDate: date }));
    }

    setMessageToEditorHandler = (event) => {
        this.setState(updateObject(this.state, { messageToEditor: event.target.value }));
    }

    confirmSubmitHandler = () => {
        const htmlContent = stateToHTML(this.state.editorState.getCurrentContent());
        const reqBody = {
            submissionId: this.state.submissionId,
            editorId: this.state.selectedEditorId,
            dueDate: this.state.dueDate,
            message: this.state.messageToEditor,
            editorEmail: this.state.selectedEditorEmail,
            htmlContent: htmlContent
        };
        this.props.assignEditor(reqBody);
    }

    onEditorStateChange = (editorState) => {
        this.setState(updateObject(this.state, { editorState: editorState }));
    };

    render() {
        return (
            <Aux>
                <div className="content-wrapper">
                    <section className="content-header">
                        <ContentHeader title="Chỉ định biên tập viên">
                            <li className="breadcrumb-item active">Assign Editor</li>
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
                                                    1. Lựa chọn biên tập viên
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
                                                {this.props.editors.length > 0 ? (
                                                    <div className="card-body table-responsive p-0" style={{ height: '300px' }}>
                                                        <table className="table table-head-fixed text-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>Chọn</th>
                                                                    <th>Biên tập viên</th>
                                                                    <th className="text-center">Đã xử lý</th>
                                                                    <th className="text-center">Đang xử lý</th>
                                                                    <th className="text-center">Độ phù hợp</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.props.editors.map(editor => (
                                                                    <tr key={editor._id}>
                                                                        <td>
                                                                            <div className="radio" onChange={this.editorSelectedHandler}>
                                                                                <label>
                                                                                    <input
                                                                                        value={editor._id}
                                                                                        type="radio"
                                                                                        id={editor.lastname + " " + editor.firstname + "|" + editor.email}
                                                                                        name="editor" />
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <Link className="text-primary" to="#">{editor.lastname} {editor.firstname}</Link>
                                                                        </td>
                                                                        <td className="text-center">{editor.handled}</td>
                                                                        <td className="text-center">{editor.handling}</td>
                                                                        <td className="text-center">100%</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : <Spinner />}
                                                <button
                                                    className="btn btn-outline-primary mt-3 btn-flat"
                                                    disabled={this.state.selectedEditorId === ''}
                                                    onClick={this.step2ActiveHandler}>Lựa chọn</button>
                                                {this.props.submission && (
                                                    <Link to={`/dashboard/submission/${this.props.submission._id}`}>
                                                        <button className="btn btn-outline-danger mt-3 ml-2 btn-flat">Hủy</button>
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
                                                    <h6>Gửi Email tới biên tập viên*</h6>
                                                    <p>To: {this.state.selectedEditorEmail}</p>
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
                                                        defaultValue={this.state.emailToEditor}
                                                        onChange={this.setEmailToEditorHandler} /> */}
                                                </div>
                                                <div className="form-group">
                                                    <h6>Lời nhắn</h6>
                                                    <textarea
                                                        type="text"
                                                        name="message"
                                                        className="form-control"
                                                        defaultValue={this.state.messageToEditor}
                                                        onChange={this.setMessageToEditorHandler} />
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary btn-flat"
                                                        data-toggle="modal"
                                                        data-target="#confirmDialogModal">Xác nhận</button>
                                                    <button
                                                        className="btn btn-outline-danger ml-2 btn-flat"
                                                        onClick={this.step1ActiveHandler}>Quay lại</button>
                                                </div>
                                            </div>
                                            <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <h4>Chỉ định biên tập viên thành công.</h4>
                                                {this.props.submission ? (
                                                    <div className="ml-2">Bạn đã chỉ định biên tập viên <Link to="#" className="text-primary">{this.state.selectedEditorName}</Link> chủ trì quá trình
                                                    thẩm định bài báo <b>{this.props.submission.title}</b> của tác giả <Link to="" className="text-primary">{this.props.submission.authorId.firstname} {this.props.submission.authorId.lastname}.</Link></div>
                                                ) : null}
                                                <h4 className="mt-3">Bây giờ, bạn có thể:</h4>
                                                {this.props.submission ? (
                                                    <div className="ml-2">
                                                        <i className="fa fa-eye"></i>
                                                        {" "}<Link to={`/dashboard/submission/${this.props.submission._id}`} className="text-primary">
                                                            Theo dõi quá trình thẩm định.
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
                            </div>
                        </div>
                    </section>
                </div>
                <ConfirmDialog
                    title="Xác nhận"
                    message="Chỉ định biên tập viên cho bài báo?"
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
        editors: state.review.editors,
        isEditorAssigned: state.review.isEditorAssigned,
        message: state.review.message,
        error: state.review.error
    };
};

const mapDispatchToProps = {
    getAllEditors,
    getSubmissionDetail,
    assignEditor,
    resetEditorAssignmentState
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignEditor);