import React from 'react';
import DatePicker from 'react-datepicker';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDeadlineDate } from '../../../../utils/utility';
import { Editor } from 'react-draft-wysiwyg';

const RequestRevision = (props) => {
    return (
        <Aux>
            <h6><i className="fas fa-paper-plane"></i> YÊU CẦU TÁC GIẢ CHỈNH SỬA BÀI BÁO</h6>
            <div className="card-body">
                <div className="form-group">
                    <label>Thời hạn xử lý*</label> <br />
                    <DatePicker className="form-control"
                        showTimeSelect
                        minDate={getDeadlineDate(7)}
                        selected={props.dueDate}
                        onChange={date => props.setDueDate(date)}
                        dateFormat="dd/MM/yyyy" />
                </div>
                <div className="form-group">
                    <label>Gửi Email tới tác giả*</label>
                    <p><span className="text-dark">Địa chỉ email:</span> {props.authorEmail}</p>
                    <Editor
                        editorState={props.editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="form-control"
                        toolbarClassName="toolbar-class"
                        onEditorStateChange={props.onEditorStateChange} />
                </div>
                <div className="form-group">
                    <label>Lời nhắn</label>
                    <textarea
                        type="text"
                        name="message"
                        className="form-control"
                        defaultValue={props.messageToAuthor}
                        onChange={props.setMessage} />
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-flat"
                        data-toggle="modal"
                        data-target="#confirmDialogModal">Gửi yêu cầu</button>
                </div>
            </div>
        </Aux>
    );
};

export default RequestRevision;