import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const AddContributor = (props) => {
    return (
        <Aux>
            <div className="modal fade" id="addContributorModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Họ tên*</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    className="form-control"
                                    value={props.fullname}
                                    onChange={props.inputChange} />
                                <label>Đơn vị công tác*</label>
                                <input
                                    type="text"
                                    name="affiliation"
                                    className="form-control"
                                    value={props.affiliation}
                                    onChange={props.inputChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-outline-primary"
                                data-dismiss="modal"
                                onClick={props.confirm}>Thêm mới</button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                data-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default AddContributor;