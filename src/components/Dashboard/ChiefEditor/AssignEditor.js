import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject } from '../../../utils/utility';
import { connect } from 'react-redux';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getAllEditors, assignEditor, resetEditorAssignmentState } from '../../../store/actions/reviewActions';
import ContentHeader from '../Shared/ContentHeader';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AssignEditor extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        dueDate: new Date(),
        submissionId: '',
        selectedEditorId: '',
        selectedEditorName: '',
        notiToEditor: 'Nội dung thông báo',
        messageToEditor: 'Nội dung lời nhắn',
        isModalOpen: false
    };

    componentDidMount() {
        this.props.getAllEditors();
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const submissionId = query.get('submissionId');
            this.setState(updateObject(this.state, {
                submissionId: submissionId
            }));
            if (!this.props.submission) {
                this.props.getSubmissionDetail(submissionId);
            }
        }
    }

    step1ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: true,
            step2Active: false,
            step3Active: false
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
            step3Active: false
        });
        this.setState(newState);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isEditorAssigned) {
            this.setState(updateObject(this.state, { isModalOpen: true }));
        }
    }

    setDueDateHandler = (date) => {
        this.setState(updateObject(this.state, { dueDate: date }));
    }

    editorSelectedHandler = (event) => {
        this.setState(updateObject(this.state, {
            selectedEditorId: event.target.value,
            selectedEditorName: event.target.id
        }));
    }

    assignEditorHandler = () => {
        this.props.assignEditor(this.state.submissionId, this.state.selectedEditorId);
    }

    closeModalHandler = () => {
        this.setState(updateObject(this.state, {
            isModalOpen: false,
            step1Active: false,
            step2Active: false,
            step3Active: true
        }));
        this.props.resetEditorAssignmentState();
    }

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <section className="content-header">
                        <ContentHeader title="Chỉ định biên tập viên">
                            <li className="breadcrumb-item active">Assign Editor</li>
                        </ContentHeader>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="col-md-12">
                                <div className="card card-primary card-tabs">
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
                                                <div className="input-group input-group-sm mb-2" style={{ width: '150px' }}>
                                                    <input type="text" className="form-control" placeholder="Tìm kiếm" />
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default">
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
                                                                    <th>Editor</th>
                                                                    <th className="text-center">Đã xử lý</th>
                                                                    <th className="text-center">Đang xử lý</th>
                                                                    <th className="text-center">Ghi chú</th>
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
                                                                                        id={editor.lastname + " " + editor.firstname}
                                                                                        name="editor" />
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <Link className="text-primary" to="#">{editor.lastname} {editor.firstname}</Link>
                                                                        </td>
                                                                        <td className="text-center">5</td>
                                                                        <td className="text-center">1</td>
                                                                        <td className="text-center">Available</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : <Spinner />}
                                                <button
                                                    className="btn btn-primary"
                                                    disabled={this.state.selectedEditorId === ''}
                                                    onClick={this.step2ActiveHandler}>Lựa chọn</button>
                                            </div>
                                            <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <div className="form-group">
                                                    <h6>Thời hạn xử lý*</h6>
                                                    <DatePicker className="form-control"
                                                        showTimeSelect
                                                        minDate={new Date()}
                                                        selected={this.state.dueDate}
                                                        onChange={date => this.setDueDateHandler(date)}
                                                        dateFormat="dd/MM/yyyy" />
                                                </div>
                                                <div className="form-group">
                                                    <h6>Gửi thông báo và email tới biên tập viên*</h6>
                                                    <textarea
                                                        type="text"
                                                        name="noti_and_email"
                                                        className="form-control"
                                                        defaultValue={this.state.notiToEditor} />
                                                </div>
                                                <div className="form-group">
                                                    <h6>Lời nhắn</h6>
                                                    <textarea
                                                        type="text"
                                                        name="noti_and_email"
                                                        className="form-control"
                                                        defaultValue={this.state.messageToEditor} />
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={this.assignEditorHandler}>Hoàn thành</button>
                                                    <button
                                                        className="btn btn-primary ml-2"
                                                        onClick={this.step1ActiveHandler}>Quay lại</button>
                                                </div>
                                            </div>
                                            <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <h4>Chỉ định biên tập viên thành công.</h4>
                                                {this.props.submission ? (
                                                    <div className="ml-2">Bạn đã chỉ định biên tập viên <Link to="#" className="text-primary">{this.state.selectedEditorName}</Link> chủ trì quá trình
                                                    thẩm định bài báo <b>{this.props.submission.title}</b> của tác giả <Link to="" className="text-primary">{this.props.submission.authorId.firstname} {this.props.submission.authorId.lastname}</Link></div>
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
                <Modal
                    show={this.state.isModalOpen}
                    message="Chỉ định biên tập viên thành công!"
                    modalClosed={this.closeModalHandler}>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission.submission,
        editors: state.review.editors,
        isEditorAssigned: state.review.isEditorAssigned,
        message: state.review.message
    };
};

const mapDispatchToProps = {
    getAllEditors,
    getSubmissionDetail,
    assignEditor,
    resetEditorAssignmentState
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignEditor);