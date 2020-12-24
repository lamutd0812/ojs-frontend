import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const NotiDialog = (props) => {
    return (
        <Aux>
            <div className="modal fade" id="notiDialogModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
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
                        <div className="modal-footer justify-content-center">
                            <div className="text-center">
                                <button type="button"
                                    className="btn btn-outline-success"
                                    data-dismiss="modal"
                                    onClick={props.confirm}>Tiếp tục</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default NotiDialog;