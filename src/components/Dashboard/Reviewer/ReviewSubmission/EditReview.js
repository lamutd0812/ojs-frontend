import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const Edit = (props) => {
    return (
        <Aux>
            <h6><i className="fas fa-edit"></i> CHỈNH SỬA Ý KIẾN THẨM ĐỊNH</h6>
            <div className="card-body">
                {props.reviewerDecisions ? (
                    <div className="form-group">
                        <label>Quyết định*</label>
                        <select
                            name="decisionId"
                            className="custom-select form-control"
                            onChange={props.inputChangeHandler}
                        >
                            <option value="" hidden>{props.controls.decisionId.decisionName}</option>
                            {props.reviewerDecisions.map(decision => (
                                <option key={decision._id} value={decision._id}>
                                    {decision.decisionName}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : null}
                <div className="form-group">
                    <label>Ý kiến*</label>
                    <textarea
                        type="text"
                        name="content"
                        className={!props.controls.content.valid && props.controls.content.touched ? "form-control-error" : "form-control"}
                        placeholder={props.controls.content.elementConfig.placeholder}
                        defaultValue={props.controls.content.value}
                        onChange={props.inputChangeHandler} />
                    {!props.controls.content.valid && props.controls.content.touched ?
                        <p className="form-control-error-msg">Nhận xét không hợp lệ!</p> : null}
                </div>
                <div className="form-group">
                    <label>File đính kèm</label>
                    <div className="input-group">
                        <div className="custom-file">
                            <input
                                type="file"
                                name="attachment"
                                className="custom-file-input"
                                onChange={props.inputChangeHandler} />
                            {!props.controls.attachment.valid && props.controls.attachment.touched ?
                                <p className="form-control-error-msg">File tải lên không hợp lệ!</p> : null}
                            <label className="custom-file-label" htmlFor="coverImage">{props.controls.attachment.filename}</label>
                        </div>
                    </div>
                    {props.fileUploading ? (
                        <div className="input-group">
                            <div className="spinner-border text-primary mt-2" role="status" style={{ width: '25px', height: '25px' }}>
                            </div>
                            <div className="mt-2 ml-2 text-secondary" style={{ fontStyle: 'italic' }}>Đang tải lên...</div>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="card-footer">
                <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#confirmDialogModal"
                    disabled={!props.formIsValid}> Chỉnh sửa ý kiến</button>
                <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={props.cancelEdit}>Hủy</button>
            </div>
        </Aux>
    );
};

export default Edit;