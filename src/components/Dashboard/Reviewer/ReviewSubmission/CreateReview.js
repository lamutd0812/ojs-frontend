import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';


const CreateReview = () => {
    return (
        <Aux>
            <div className="card-body">
                <div className="form-group">
                    <label>Quyết định*</label>
                    <select className="custom-select form-control">
                        <option>Chấp nhận bài báo</option>
                        <option>Yêu cầu chỉnh sửa</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Nhận xét*</label>
                    <textarea
                        type="text-area"
                        name="content"
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>File đính kèm</label>
                    <div className="input-group">
                        <div className="custom-file">
                            <input
                                type="file"
                                name="attachment"
                                className="custom-file-input" />
                            <label className="custom-file-label" htmlFor="coverImage">Filename</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#confirmDialogModal">Gửi ý kiến</button>
            </div>
        </Aux>
    );
};

export default CreateReview;