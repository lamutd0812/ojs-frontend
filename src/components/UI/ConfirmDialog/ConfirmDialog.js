import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const ConfirmDialog = (props) => {
    return (
        <Aux>
            <div className="modal fade" id="confirmDialogModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-2">
                                {props.message}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={props.confirm}>Đồng ý</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default ConfirmDialog;