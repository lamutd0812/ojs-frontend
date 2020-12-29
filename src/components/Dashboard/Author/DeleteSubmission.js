import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const DeleteSubmission = (props) => {
    return (
        <Aux>
            <div className="modal fade" id="deleteSubmissionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Gỡ bài báo khỏi hệ thống</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-2">
                                Bài báo của bạn sẽ được xóa khỏi hệ thống và không thể khôi phục. Hãy chắc chắn rằng bạn thực sự
                                muốn gỡ bỏ bài báo.
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input pr-1"
                                    type="checkbox"
                                    checked={props.checked}
                                    onChange={(event) => props.confirmDelete(event)} />
                                <label className="form-check-label"> Tôi đã hiểu và đồng ý.</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-outline-primary btn-flat"
                                data-dismiss="modal"
                                disabled={!props.deletionConfirmed}
                                onClick={props.deleteSubmission}>Xóa bài báo</button>
                            <button
                             type="button"
                              className="btn btn-outline-danger btn-flat" 
                              data-dismiss="modal"
                              onClick={props.uncheckedHandler}>Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default DeleteSubmission;