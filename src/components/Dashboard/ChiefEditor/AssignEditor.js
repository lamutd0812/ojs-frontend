import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject } from '../../../utils/utility';
import { connect } from 'react-redux';
import { assignEditor, resetEditorAssignmentState } from '../../../store/actions/reviewActions';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';


class AssignEditor extends Component {

    state = {
        selectedEditorId: '',
        isModalOpen: false
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isEditorAssigned) {
            this.setState(updateObject(this.state, { isModalOpen: true }));
        }
    }

    editorSelectedHandler = (event) => {
        this.setState(updateObject(this.state, { selectedEditorId: event.target.value }));
    }

    assignEditorHandler = () => {
        this.props.assignEditor(this.props.submission._id, this.state.selectedEditorId);
    }

    closeModalHandler = () => {
        this.setState(updateObject(this.state, { isModalOpen: false }));
        this.props.resetEditorAssignmentState();
        this.props.getSubmissionDetail(this.props.submission._id);
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="modalAssignEditor" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold text-danger">Chỉ định biên tập viên</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <div className="md-form mb-5">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title text-danger"><b>1. Lựa chọn biên tập viên</b></h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm" style={{ width: '150px' }}>
                                                    <input type="text" className="form-control float-right" placeholder="Tìm kiếm" />
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </div>
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
                                                                                id='editor'
                                                                                name="editor" />
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td className="text-primary">
                                                                    <Link to="#">{editor.lastname} {editor.firstname}</Link>
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

                                        <div className="border-top p-3 ml-2">
                                            <div className="form-check">
                                                <input type="checkbox" defaultChecked className="form-check-input" id="checkboxSendNoti" />
                                                <label className="form-check-label" htmlFor="checkboxSendNoti">Gửi thông báo đến biên tập viên.</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="checkboxSendEmail" />
                                                <label className="form-check-label" htmlFor="checkboxSendEmail">Gửi email đến biên tập viên.</label>
                                            </div>
                                        </div>
                                        <div className="modal-footer d-flex justify-content-center">
                                            <button onClick={this.assignEditorHandler} className="btn btn-primary">Gửi yêu cầu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    assignEditor,
    resetEditorAssignmentState,
    getSubmissionDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignEditor);